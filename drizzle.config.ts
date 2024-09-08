import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
