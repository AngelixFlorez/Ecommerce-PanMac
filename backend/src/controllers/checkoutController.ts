import type { Request, Response, NextFunction } from "express";
import { getEnv } from "../lib/env";
import z from "zod";
import { getAuth } from "@clerk/express";
import { getLocalUser } from "../lib/users";
import { db } from "../db";
import { CheckoutSessionLine, checkoutSessions, products } from "../db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { polarCreateCheckout } from "../lib/polar";

const env = getEnv();

const cartSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive(),
        color: z.string().optional().nullable(),
      }),
    )
    .min(1),
});

export async function createCheckout(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!env.POLAR_ACCESS_TOKEN) {
      res.status(503).json({ error: "Payments are not configured" });
      return;
    }

    const parsed = cartSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid cart", details: parsed.error.flatten() });
      return;
    }

    const localUser = await getLocalUser(userId);
    if (!localUser) {
      res.status(503).json({ error: "Account not synced yet" });
      return;
    }

    const ids = parsed.data.items.map((i) => i.productId);

    const prodRows = await db
      .select({ id: products.id, priceCents: products.priceCents })
      .from(products)
      .where(and(inArray(products.id, ids), eq(products.active, true)));

    if (prodRows.length !== ids.length) {
      res.status(400).json({ error: "One or more products are invalid" });
      return;
    }

    const byId = new Map(prodRows.map((p) => [p.id, p]));
    let totalCents = 0;
    const lines: CheckoutSessionLine[] = [];

    for (const line of parsed.data.items) {
      const p = byId.get(line.productId)!;
      totalCents += p.priceCents * line.quantity;
      lines.push({
        productId: p.id,
        quantity: line.quantity,
        unitPriceCents: p.priceCents,
      });
    }

    if (totalCents < 10) {
      res.status(400).json({
        error: "Total below Polar minimum (e.g. COP requires at least 10 cents)",
      });
      return;
    }

    let session;
    try {
      [session] = await db
        .insert(checkoutSessions)
        .values({
          userId: localUser.id,
          lines,
          totalCents,
          currency: "COP",
        })
        .returning();
    } catch (dbErr) {
      console.error("DB insert checkout_sessions error:", dbErr);
      res.status(500).json({ error: "Failed to create checkout session" });
      return;
    }

    let checkout;
    try {
      checkout = await polarCreateCheckout(env, {
        products: [env.POLAR_CHECKOUT_PRODUCT_ID],
        prices: {
          [env.POLAR_CHECKOUT_PRODUCT_ID]: [
            {
              amount_type: "fixed",
              price_currency: "COP",
              price_amount: totalCents,
            },
          ],
        },
        success_url: `${env.FRONTEND_URL}/checkout/return?checkout_id={CHECKOUT_ID}`,
        return_url: `${env.FRONTEND_URL}/cart`,
        external_customer_id: userId,
        metadata: { checkout_session_id: session.id },
      });
    } catch (polarErr) {
      console.error("Polar create checkout error:", polarErr);
      const msg = polarErr instanceof Error ? polarErr.message : "Payment gateway error";
      res.status(500).json({ error: msg });
      return;
    }

    await db
      .update(checkoutSessions)
      .set({ polarCheckoutId: checkout.id })
      .where(eq(checkoutSessions.id, session.id));

    res.json({ checkoutUrl: checkout.url });
  } catch (e) {
    console.error("Checkout unexpected error:", e);
    next(e);
  }
}
