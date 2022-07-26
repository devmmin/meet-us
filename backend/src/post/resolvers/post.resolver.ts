import { GqlJwtAuthGuard } from '@auth/guards/gql-jwt-auth.guard';
import { OAuth2Pricipal } from '@auth/security/security-context';
import { OAuth2UserForGql } from '@auth/utils';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreatePostCommand,
  CreatePostResult,
  DeletePostCommand,
  DeletePostResult,
  UpdatePostCommand,
  UpdatePostResult,
} from '@post/commands';
import {
  CreatePostInput,
  DeletePostInput,
  OffsetPagination,
  Post,
  Posts,
  PostsOrder,
  PostWithoutAuthor,
  UpdatePostInput,
} from '@post/models';
import { GetPostsQuery, GetPostsQueryResult } from '@post/queries';
import {
  GetPostByIdQuery,
  GetPostByIdQueryResult,
} from '@post/queries/get-post-by-id.handler';

@UseGuards(GqlJwtAuthGuard)
@Resolver()
export class PostResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Mutation(() => PostWithoutAuthor, {
    description: '신규 Post를 생성한다',
  })
  public async createPost(
    @Args({
      name: 'post',
      description: '신규 Post Parameter',
      type: () => CreatePostInput,
    })
    createPostInput: CreatePostInput,
    @OAuth2UserForGql() user: OAuth2Pricipal,
  ) {
    createPostInput.authorId = user.userId;

    const { post } = await this.commandBus.execute<
      CreatePostCommand,
      CreatePostResult
    >(new CreatePostCommand(createPostInput));
    return post;
  }

  @Mutation(() => PostWithoutAuthor, {
    description: 'post 정보를 수정한다.',
  })
  public async updatePost(
    @Args({
      name: 'post',
      description: 'UpdatePost 데이터',
      type: () => UpdatePostInput,
    })
    updatePostInput: UpdatePostInput,
  ) {
    const { post } = await this.commandBus.execute<
      UpdatePostCommand,
      UpdatePostResult
    >(new UpdatePostCommand(updatePostInput));
    return post;
  }
  @Mutation(() => PostWithoutAuthor, {
    description: 'post id로 post 삭제한다',
  })
  public async deletePost(
    @Args({
      name: 'id',
      description: 'Post Id',
      type: () => DeletePostInput,
    })
    id: string,
  ) {
    const { post } = await this.commandBus.execute<
      DeletePostCommand,
      DeletePostResult
    >(new DeletePostCommand(id));
    return post;
  }

  @Query(() => Post, {
    description: 'Post Id로 Post 정보를 가져온다',
  })
  public async getPostById(
    @Args({
      name: 'id',
      description: 'Post Id',
      type: () => String,
    })
    id: string,
  ) {
    const { post } = await this.queryBus.execute<
      GetPostByIdQuery,
      GetPostByIdQueryResult
    >(new GetPostByIdQuery(id));
    return post;
  }

  @Query(() => Posts, {
    description: 'Post 리스트를 가져온다',
  })
  public async posts(
    @Args({
      name: 'pagination',
      type: () => OffsetPagination,
      description: `Offset 기반 Pagination Parameter 
      [https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination]`,
    })
    pagination: OffsetPagination,
    @Args({
      name: 'orderBy',
      nullable: true,
      type: () => PostsOrder,
      defaultValue: {
        createAt: 'desc',
      },
      description: 'Order(정렬) Parameter(기본값-생성일자-desc)',
    })
    orderBy: PostsOrder,
  ) {
    const { posts } = await this.queryBus.execute<
      GetPostsQuery,
      GetPostsQueryResult
    >(new GetPostsQuery(pagination, orderBy));
    return posts;
  }
}
