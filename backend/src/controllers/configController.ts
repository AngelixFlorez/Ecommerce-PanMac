import type { Request, Response } from "express";
import { getEnv } from "../lib/env";

export function getConfig(_req: Request, res: Response) {
  const env = getEnv();
  res.json({
    currency: env.STORE_CURRENCY,
    minorUnits: env.STORE_CURRENCY_MINOR_UNITS,
  });
}
