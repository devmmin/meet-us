import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserInput } from '@user/models/user.model';
import { UserRepository } from '@user/repository/user.repository';

export class UpdateUserCommand {
  constructor(public user: UpdateUserInput) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: UpdateUserCommand) {
    const { user } = command;
    return await this.userRepository.updateUser(user);
  }
}
