import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

let sslMode = "require";
if (process.env.NODE_ENV === "development") {
  sslMode = "disable";
}

const pool = postgres(env.DATABASE_URL, {
  ssl: sslMode === "disable" ? false : { rejectUnauthorized: false },
});

const pg = postgres(env.DATABASE_URL);
export const db = drizzle(pg, { schema, logger: true });
