import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostInput } from '@post/models';
import { PostRepository } from '@post/repository/post.repository';
import { Post } from '@prisma/client';

export class CreatePostCommand {
  constructor(public readonly post: CreatePostInput) {}
}

export class CreatePostResult {
  constructor(public readonly post: Post) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
  implements ICommandHandler<CreatePostCommand, CreatePostResult>
{
  constructor(private postRepository: PostRepository) {}
  async execute(command: CreatePostCommand) {
    const { post } = command;
    const newPost = await this.postRepository.createPost(post);
    Logger.log(newPost, 'Post 생성');
    return new CreatePostResult(newPost);
  }
}
