import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type * as schema from '@/db/schema';

type Database = NodePgDatabase<typeof schema>;

export type { Database };
