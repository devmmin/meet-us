import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCommand, UpdateUserCommand } from '@user/commands';
import {
  CreateUserInput,
  UpdateUserInput,
  User,
} from '@user/models/user-api.model';
import {
  GetUserByIdQuery,
  GetUserByIdQueryResult,
} from '@user/queries/get-user-by-id.handler';

@Resolver()
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => User, {
    description: '신규 User를 생성한다',
  })
  async createUser(
    @Args({
      name: 'user',
      description: '신규 User 생성 Parameter',
      type: () => CreateUserInput,
    })
    user: CreateUserInput,
  ) {
    return await this.commandBus.execute(new CreateUserCommand(user));
  }

  @Mutation(() => User, {
    description: 'User 정보를 업데이트 한다.',
  })
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

  @Query(() => User, {
    description: 'User ID로 해당 유저에 대한 정보를 가져온다',
  })
  async getUserById(@Args('id', { type: () => String }) id: string) {
    const { user } = await this.queryBus.execute<
      GetUserByIdQuery,
      GetUserByIdQueryResult
    >(new GetUserByIdQuery(id));
    return user;
  }
}
