import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OffsetPagination, PostsOrder, PostsWithAuthor } from '@post/models';
import { PostRepository } from '@post/repository/post.repository';

export class GetPostsQuery {
  constructor(
    public readonly pagination: OffsetPagination,
    public readonly order?: PostsOrder,
  ) {}
}

export class GetPostsQueryResult {
  constructor(public readonly posts: PostsWithAuthor) {}
}

@QueryHandler(GetPostsQuery)
export class GetPostsHandler
  implements IQueryHandler<GetPostsQuery, GetPostsQueryResult>
{
  constructor(private postRepository: PostRepository) {}
  async execute(query: GetPostsQuery) {
    const { pagination, order } = query;
    const posts = await this.postRepository.getPosts(pagination, order);
    return new GetPostsQueryResult(posts);
  }
}
