import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OffsetPagenation, PostsOrder, PostsWithAuthor } from '@post/models';
import { PostRepository } from '@post/repository/post.repository';

export class GetPostsQuery {
  constructor(
    public readonly pagenation: OffsetPagenation,
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
    const { pagenation, order } = query;
    const posts = await this.postRepository.getPosts(pagenation, order);
    return new GetPostsQueryResult(posts);
  }
}
