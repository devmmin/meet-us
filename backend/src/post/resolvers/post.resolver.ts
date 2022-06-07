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
  Pagenation,
  Post,
  PostDto,
  PostsOrder,
  UpdatePostInput,
} from '@post/models';
import { GetPostsQuery, GetPostsQueryResult } from '@post/queries';
import {
  GetPostByIdQuery,
  GetPostByIdQueryResult,
} from '@post/queries/get-post-by-id.handler';

@Resolver()
export class PostResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Mutation(() => PostDto)
  public async createPost(
    @Args({
      name: 'post',
      description: 'CreatePost 데이터',
      type: () => CreatePostInput,
    })
    createPostInput: CreatePostInput,
  ) {
    const { post } = await this.commandBus.execute<
      CreatePostCommand,
      CreatePostResult
    >(new CreatePostCommand(createPostInput));
    return post;
  }

  @Mutation(() => PostDto)
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
  @Mutation(() => PostDto)
  public async deletePost(
    @Args({
      name: 'post',
      description: 'DeletePost 데이터',
      type: () => DeletePostInput,
    })
    deletePostInput: DeletePostInput,
  ) {
    const { post } = await this.commandBus.execute<
      DeletePostCommand,
      DeletePostResult
    >(new DeletePostCommand(deletePostInput));
    return post;
  }

  @Query(() => PostDto)
  public async getPostById(
    @Args({
      name: 'id',
      description: 'post id로 post 정보를 가져온다',
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

  @Query(() => [Post])
  public async posts(
    @Args({
      name: 'pagination',
      type: () => Pagenation,
    })
    pagination: Pagenation,
    @Args({
      name: 'order',
      nullable: true,
      type: () => PostsOrder,
    })
    order: PostsOrder,
  ) {
    const { posts } = await this.queryBus.execute<
      GetPostsQuery,
      GetPostsQueryResult
    >(new GetPostsQuery(pagination, order));
    return posts;
  }
}
