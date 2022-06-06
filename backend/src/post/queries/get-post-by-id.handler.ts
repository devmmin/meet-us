import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostRepository } from '@post/repository/post.repository';
import { Post } from '@prisma/client';

export class GetPostByIdQuery {
  constructor(public readonly id: string) {}
}

export class GetPostByIdQueryResult {
  constructor(public readonly post: Post) {}
}

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler
  implements IQueryHandler<GetPostByIdQuery, GetPostByIdQueryResult>
{
  constructor(private postRepository: PostRepository) {}
  async execute(query: GetPostByIdQuery) {
    const { id } = query;
    const post = await this.postRepository.getPostById(id);
    return new GetPostByIdQueryResult(post);
  }
}
