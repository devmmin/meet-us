import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@prisma/prisma.module';
import { CreateUserHandler } from '@user/commands';
import { UserRepository } from '@user/repository/user.repository';
import { UserResolver } from '@user/resolvers/user.resolver';
import { GetUserByIdHandler } from './queries';

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers = [GetUserByIdHandler];

@Module({
  imports: [PrismaModule, CqrsModule],
  providers: [
    UserResolver,
    UserRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class UserModule {}
