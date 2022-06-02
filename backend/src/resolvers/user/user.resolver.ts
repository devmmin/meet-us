import { CreateUserInput, UpdateUserInput, User } from '@models/user';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@prisma/prisma.service';

@Resolver()
export class UserResolver {
  constructor(
    @Inject(PrismaService)
    private prismaService: PrismaService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('userData') userData: CreateUserInput) {
    return this.prismaService.user.create({
      data: {
        user_email: userData.userEmail,
        user_name: userData.userName,
        password: userData.password,
        role: userData.role,
      },
    });
  }

  @Mutation(() => User)
  updateUser(@Args('userData') userData: UpdateUserInput) {
    return this.prismaService.user.update({
      data: {
        user_name: userData.userName,
        password: userData.password,
        role: userData.role,
      },
      where: {
        user_id: userData.userId,
      },
    });
  }
}
