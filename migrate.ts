import pg from 'pg';
import * as schema from './src/db/schema.js';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const { Client } = pg;
const connectionString = 'postgres://postgres@localhost:5432/opentelemetry';
const client = new Client({ connectionString });
const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: 'drizzle' });

await client.end();
