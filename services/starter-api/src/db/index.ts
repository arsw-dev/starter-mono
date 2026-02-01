import type { Database } from '@/types/database';
import { drizzle } from 'drizzle-orm/node-postgres';

import { Pool } from 'pg';

import env from '@/utils/env';

import * as schema from './schemas';

let db: Database;

const connectToDB = async () => {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
  });

  try {
    const client = await pool.connect();
    // eslint-disable-next-line no-console
    console.log('Connected to Postgres Client');
    client.release();
  }
  catch (err) {
    console.error('Failed to establish connection to database:', err);
    process.exit(1);
  }

  db = drizzle(pool, {
    schema,
    casing: 'snake_case',
  });

  return db;
};

const getDB = () => {
  if (!db)
    throw new Error('Database not initialized.');

  return db;
};

export { connectToDB, getDB };
