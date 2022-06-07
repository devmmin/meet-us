import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostInput } from '@post/models';
import { PostRepository } from '@post/repository/post.repository';
import { Post } from '@prisma/client';

export class UpdatePostCommand {
  constructor(public readonly post: UpdatePostInput) {}
}

export class UpdatePostResult {
  constructor(public readonly post: Post) {}
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler
  implements ICommandHandler<UpdatePostCommand, UpdatePostResult>
{
  constructor(private postRepository: PostRepository) {}
  async execute(command: UpdatePostCommand) {
    const { post } = command;
    const updatedPost = await this.postRepository.updatePost(post);
    return new UpdatePostResult(updatedPost);
  }
}
