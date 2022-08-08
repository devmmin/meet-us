import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '@post/repository/post.repository';
import { Post } from '@prisma/client';

export class DeletePostCommand {
  constructor(public readonly id: string) {}
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
    const { id } = command;
    const deletedPost = await this.postRepository.deletePost(id);
    return new DeletePostResult(deletedPost);
  }
}
