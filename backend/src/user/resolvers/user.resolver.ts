import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCommand, UpdateUserCommand } from '@user/commands';
import {
  CreateUserInput,
  UpdateUserInput,
  UserDto,
} from '@user/models/user.model';
import { GetUserByIdQuery } from '@user/queries/get-user-by-id.handler';

@Resolver()
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => UserDto)
  async createUser(
    @Args({
      name: 'user',
      description: '유저 생성',
      type: () => CreateUserInput,
    })
    user: CreateUserInput,
  ) {
    return await this.commandBus.execute(new CreateUserCommand(user));
  }

  @Mutation(() => UserDto)
  async updateUser(
    @Args({
      name: 'user',
      description: '유저 업데이트',
      type: () => UpdateUserInput,
    })
    user: UpdateUserInput,
  ) {
    return await this.commandBus.execute(new UpdateUserCommand(user));
  }

  @Query(() => UserDto)
  async getUserById(@Args('id', { type: () => String }) id: string) {
    return await this.queryBus.execute(new GetUserByIdQuery(id));
  }
}
