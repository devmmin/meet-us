import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostInput } from '@post/models';
import { PostRepository } from '@post/repository/post.repository';
import { Post } from '@prisma/client';

export class DeletePostCommand {
  constructor(public readonly post: DeletePostInput) {}
}

export class DeletePostResult {
  constructor(public readonly post: Post) {}
}

@CommandHandler(DeletePostCommand)
export class DeletePostHandler
  implements ICommandHandler<DeletePostCommand, DeletePostResult>
{
  constructor(private postRepository: PostRepository) {}
  async execute(command: DeletePostCommand) {
    const { post } = command;
    const deletedPost = await this.postRepository.deletePost(post.id);
    return new DeletePostResult(deletedPost);
  }
}
