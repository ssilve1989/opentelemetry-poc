import type { Config } from 'drizzle-kit';

const { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER } = process.env;

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: DB_HOST ?? 'localhost',
    port: Number(DB_PORT) || 5432,
    database: DB_NAME ?? 'opentelemetry',
    password: DB_PASSWORD,
    user: DB_USER ?? 'postgres',
  },
} satisfies Config;
