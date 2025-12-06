import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import pg from "pg";

const { Pool } = pg;

async function clearDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  console.log("🗑️  Clearing database...");

  try {
    // Drop all tables in correct order (respecting foreign keys)
    await db.execute(sql`DROP TABLE IF EXISTS test_assignees CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS tests_questions_options CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS tests_questions CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS tests CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`);

    console.log("✅ Database cleared successfully!");
    console.log("Run 'pnpm drizzle:push' to recreate tables");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
  } finally {
    await pool.end();
  }
}

clearDatabase();
