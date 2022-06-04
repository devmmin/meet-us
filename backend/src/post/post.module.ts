import { Module } from '@nestjs/common';
import { PostResolver } from '@post/resolvers/post.resolver';

@Module({
  providers: [PostResolver],
})
export class PostModule {}
