import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Pagenation, PostsOrder, PostsWithAuthor } from '@post/models';
import { PostRepository } from '@post/repository/post.repository';
import { Post, Prisma } from '@prisma/client';

export class GetPostsQuery {
  constructor(
    public readonly pagenation: Pagenation,
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
    Prisma;
    const { pagenation, order } = query;
    const posts = await this.postRepository.getPosts(pagenation, order);
    return new GetPostsQueryResult(posts);
  }
}
