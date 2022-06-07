import { Injectable } from '@nestjs/common';
import {
  CreatePostInput,
  Pagenation,
  PostsOrder,
  UpdatePostInput,
} from '@post/models';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private prismaService: PrismaService) {}
  createPost(post: CreatePostInput) {
    return this.prismaService.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: post.authorId,
      },
    });
  }
  updatePost(post: UpdatePostInput) {
    return this.prismaService.post.update({
      data: {
        title: post.title,
        content: post.content,
      },
      where: {
        id: post.id,
      },
    });
  }
  deletePost(id: string) {
    return this.prismaService.post.delete({
      where: {
        id: id,
      },
    });
  }

  getPostById(id: string) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  getPosts(pagenation: Pagenation, order: PostsOrder) {
    const { skip, take } = pagenation;
    const { orderBy } = order;
    return this.prismaService.post.findMany({
      take: take || undefined,
      skip: skip || undefined,
      orderBy: { createdAt: orderBy.createdAt || undefined },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        authorId: true,
        author: {
          select: {
            id: true,
            userName: true,
          },
        },
      },
    });
  }
}
