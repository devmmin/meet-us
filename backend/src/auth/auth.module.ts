import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthController } from '@auth/auth.controller';
import { AuthRepository } from '@auth/repositories';
import { LoginHandler, RefreshAccessTokenHandler } from '@auth/commands';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const CommandHandlers = [LoginHandler, RefreshAccessTokenHandler];

@Module({
  imports: [JwtModule.register({}), PrismaModule, CqrsModule],
  providers: [AuthRepository, JwtStrategy, ...CommandHandlers, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
