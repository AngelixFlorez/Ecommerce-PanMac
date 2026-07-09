import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { getLocalUser } from "../lib/users";
import { isStaff } from "../lib/roles";
import { db } from "../db";
import { supportTickets, users } from "../db/schema";
import { eq, and, desc, gt, lte, inArray } from "drizzle-orm";
import { getStreamChatServer, streamChatDisplayName, streamUserId } from "../lib/stream";
import { getEnv } from "../lib/env";

const env = getEnv();

export async function createSupportTicket(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const localUser = await getLocalUser(userId);
    if (!localUser) {
      res.status(503).json({ error: "Account not synced yet" });
      return;
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const [ticket] = await db
      .insert(supportTickets)
      .values({
        userId: localUser.id,
        status: "open",
        expiresAt,
      })
      .returning();

    res.json({ ticket });
  } catch (e) {
    next(e);
  }
}

export async function listSupportTickets(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const localUser = await getLocalUser(userId);
    if (!localUser) {
      res.status(503).json({ error: "Account not synced yet" });
      return;
    }

    const now = new Date();

    if (isStaff(localUser.role)) {
      const tickets = await db
        .select()
        .from(supportTickets)
        .where(and(eq(supportTickets.status, "open"), gt(supportTickets.expiresAt, now)))
        .orderBy(desc(supportTickets.createdAt));

      const userIds = [...new Set(tickets.map((t) => t.userId))];
      const userRows = await db
        .select({ id: users.id, email: users.email, displayName: users.displayName })
        .from(users)
        .where(inArray(users.id, userIds));

      const userMap = new Map(userRows.map((u) => [u.id, u]));

      const ticketsWithUser = tickets.map((t) => ({
        ...t,
        user: userMap.get(t.userId) ?? null,
      }));

      res.json({ tickets: ticketsWithUser });
    } else {
      const tickets = await db
        .select()
        .from(supportTickets)
        .where(and(eq(supportTickets.userId, localUser.id), eq(supportTickets.status, "open"), gt(supportTickets.expiresAt, now)))
        .orderBy(desc(supportTickets.createdAt));

      res.json({ tickets });
    }
  } catch (e) {
    next(e);
  }
}

export async function getSupportTicketChannel(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const localUser = await getLocalUser(userId);
    if (!localUser) {
      res.status(503).json({ error: "Account not synced yet" });
      return;
    }

    const [ticket] = await db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.id, req.params.id as string))
      .limit(1);

    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    const canAccess = ticket.userId === localUser.id || isStaff(localUser.role);
    if (!canAccess) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    if (new Date() > ticket.expiresAt) {
      res.status(403).json({ error: "This support ticket has expired" });
      return;
    }

    const server = getStreamChatServer(env);
    const streamChatUserId = streamUserId(userId);

    await server.upsertUser({
      id: streamChatUserId,
      name: streamChatDisplayName(localUser.role, localUser.displayName, localUser.email),
    });

    const channelId = `support-${ticket.id}`;

    let channel;
    try {
      channel = server.channel("messaging", channelId);
      await channel.query({ watch: false });
    } catch {
      channel = server.channel("messaging", channelId, {
        name: `Soporte general · ${ticket.id.slice(0, 8)}`,
        created_by_id: streamChatUserId,
      });
      await channel.create();
      await channel.addMembers([streamChatUserId]);
    }

    res.json({ channelType: "messaging", channelId, streamUserId: streamChatUserId });
  } catch (e) {
    next(e);
  }
}

export async function deleteExpiredTickets() {
  const now = new Date();
  const expired = await db
    .select()
    .from(supportTickets)
    .where(and(eq(supportTickets.status, "open"), lte(supportTickets.expiresAt, now)));

  for (const ticket of expired) {
    await db
      .update(supportTickets)
      .set({ status: "closed" })
      .where(eq(supportTickets.id, ticket.id));

    try {
      const server = getStreamChatServer(env);
      const channel = server.channel("messaging", `support-${ticket.id}`);
      await channel.delete();
    } catch {
      // channel might not exist
    }
  }

  if (expired.length > 0) {
    console.log(`Closed ${expired.length} expired support ticket(s)`);
  }
}
