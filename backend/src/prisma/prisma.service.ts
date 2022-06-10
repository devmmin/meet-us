import {
  INestApplication,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { format } from 'sql-formatter';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationBootstrap
{
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
      errorFormat: 'pretty',
    });
  }
  onApplicationBootstrap() {
    this.$on('query' as any, (e: Prisma.QueryEvent) => {
      Logger.log('---- SQL >>> ');
      const query = format(e.query, {
        indentStyle: 'tabularRight',
        language: 'mariadb',
        useTabs: true,
        params: eval(e.params),
      });
      Logger.log(`\n ${e.timestamp}\n` + query);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
