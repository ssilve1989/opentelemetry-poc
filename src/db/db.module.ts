import { Global, Module } from '@nestjs/common';
import { getDbConnectionToken } from './db.consts.js';
import * as schema from './schema.js';
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

@Global()
@Module({
  providers: [
    {
      provide: getDbConnectionToken(),
      useFactory: async () => {
        const { Client } = pg;
        const connectionString =
          'postgres://postgres@localhost:5432/opentelemetry';
        const client = new Client({ connectionString });
        await client.connect();
        return drizzle(client, { schema });
      },
    },
  ],
  exports: [getDbConnectionToken()],
})
export class DbModule {}
