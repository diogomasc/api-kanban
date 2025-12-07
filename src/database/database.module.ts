import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import { Global, Module, Provider } from '@nestjs/common';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

const dbProvider: Provider = {
  provide: DATABASE_CONNECTION,
  useFactory: (configService: ConfigService) => {
    const pool = new Pool({
      connectionString: configService.getOrThrow('DATABASE_URL'),
    });
    return drizzle(pool, { schema });
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
