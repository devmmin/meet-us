import { Injectable } from '@nestjs/common';
import {
  CreatePostInput,
  OffsetPagenation,
  PostsOrder,
  UpdatePostInput,
} from '@post/models';
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
    return this.prismaService.post.findUnique({
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
      where: { id },
    });
  }
  /**
   *
   * @param pagenation
   * @param order
   * @returns
   */
  async getPosts(pagenation: OffsetPagenation, order: PostsOrder) {
    const { skip, take } = pagenation;
    const { createdAt } = order;

    const [list, totalCount] = await this.prismaService.$transaction([
      this.prismaService.post.findMany({
        take: take || undefined,
        skip: skip || undefined,
        orderBy: { createdAt: createdAt || undefined },
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
      }),
      this.prismaService.post.count(),
    ]);
    return { list, totalCount };
  }
}
