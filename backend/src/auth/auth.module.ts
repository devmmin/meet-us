import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthController } from '@auth/auth.controller';
import { AuthRepository } from '@auth/repositories';
import { LoginHandler, RefreshAccessTokenHandler } from '@auth/commands';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
import { GqlJwtAuthGuard } from './guards/gql-jwt-auth.guard';

const CommandHandlers = [LoginHandler, RefreshAccessTokenHandler];

@Module({
  imports: [JwtModule.register({}), PrismaModule, CqrsModule],
  providers: [
    AuthRepository,
    ...CommandHandlers,
    JwtStrategy,
    JwtAuthGuard,
    RoleGuard,
    GqlJwtAuthGuard,
  ],
  exports: [AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
