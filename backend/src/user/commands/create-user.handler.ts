import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '@user/repository/user.repository';
import { CreateUserInput } from '@user/models/user.model';
import { ConflictException } from '@nestjs/common';

export class CreateUserCommand {
  constructor(public user: CreateUserInput) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: CreateUserCommand) {
    const { user } = command;
    const isDuplicateUserEmail = await this.userRepository.findUserByUserEmail(
      user.userEmail,
    );
    if (isDuplicateUserEmail) {
      throw new ConflictException('이미 등록된 이메일입니다.');
    } else {
      return await this.userRepository.createUser(user);
    }
  }
}
