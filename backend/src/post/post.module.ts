import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PostResolver } from '@post/resolvers/post.resolver';
import { PrismaModule } from '@prisma/prisma.module';
import { PostRepository } from '@post/repository/post.repository';
import {
  CreatePostHandler,
  DeletePostHandler,
  UpdatePostHandler,
} from '@post/commands';
import { GetPostsHandler, GetPostByIdHandler } from './queries';

export const CommandHandlers = [
  CreatePostHandler,
  UpdatePostHandler,
  DeletePostHandler,
];
export const QueryHandlers = [GetPostsHandler, GetPostByIdHandler];
@Module({
  imports: [PrismaModule, CqrsModule],
  providers: [
    PostResolver,
    PostRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class PostModule {}
