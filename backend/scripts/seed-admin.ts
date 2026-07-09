import "dotenv/config";
import { createClerkClient } from "@clerk/backend";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { users } from "../src/db/schema";
import { eq } from "drizzle-orm";

const EMAIL = "user@test.com";
const PASSWORD = "password";

async function main() {
  const clerk = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY!,
  });

  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  // Check if user already exists in local DB
  const [existingLocal] = await db
    .select()
    .from(users)
    .where(eq(users.email, EMAIL))
    .limit(1);

  if (existingLocal) {
    if (existingLocal.role === "admin") {
      console.log(`User ${EMAIL} is already an admin.`);
    } else {
      await db
        .update(users)
        .set({ role: "admin" })
        .where(eq(users.id, existingLocal.id));
      console.log(`User ${EMAIL} updated to admin in local DB.`);

      // Also update in Clerk
      await clerk.users.updateUser(existingLocal.clerkUserId, {
        privateMetadata: { role: "admin" },
      });
      console.log(`User ${EMAIL} updated to admin in Clerk.`);
    }
    await pool.end();
    return;
  }

  // Create user in Clerk
  console.log(`Creating user ${EMAIL} in Clerk...`);
  const clerkUser = await clerk.users.createUser({
    emailAddress: [EMAIL],
    password: PASSWORD,
    skipPasswordChecks: true,
    privateMetadata: { role: "admin" },
  });

  console.log(`Clerk user created: ${clerkUser.id}`);

  // Create user in local DB (the webhook would normally do this, but we do it directly)
  await db.insert(users).values({
    clerkUserId: clerkUser.id,
    email: EMAIL,
    displayName: "Admin 2",
    role: "admin",
  });

  console.log(`User ${EMAIL} inserted into local DB as admin.`);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
