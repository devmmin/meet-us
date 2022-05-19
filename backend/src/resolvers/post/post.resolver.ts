import { Post, PostOrderByUpdatedAtInput } from '@models/post';
import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@prisma/prisma.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    @Inject(PrismaService)
    private prismaService: PrismaService,
  ) {}

  @Query(() => Post)
  postById(@Args('id') id: string) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  @Query(() => [Post])
  posts(
    @Args('skip', { nullable: true }) skip: number,
    @Args('take', { nullable: true }) take: number,
    @Args('orderBy', { nullable: true }) orderBy: PostOrderByUpdatedAtInput,
  ) {
    return this.prismaService.post.findMany({
      take: take || undefined,
      skip: skip || undefined,
      orderBy: { create_time: orderBy.createTime || undefined },
    });
  }
}
