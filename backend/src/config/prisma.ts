import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

export async function setPrisma(app: INestApplication) {
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
