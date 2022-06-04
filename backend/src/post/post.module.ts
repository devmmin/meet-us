import { Module } from '@nestjs/common';
import { PostResolver } from '@post/resolvers/post.resolver';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostResolver],
})
export class PostModule {}
