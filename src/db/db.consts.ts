import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export const CONNECTION = '@db/connection';

export const InjectDbConnection = () => Inject(CONNECTION);
export const getDbConnectionToken = () => CONNECTION;

export type DbConnection = NodePgDatabase;
