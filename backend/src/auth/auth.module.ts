import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthController } from '@auth/auth.controller';
import { AuthRepository } from '@auth/repositories';
import { LoginHandler } from '@auth/commands';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';

const CommandHandlers = [LoginHandler];

@Module({
  imports: [JwtModule.register({}), PrismaModule, CqrsModule],
  providers: [AuthRepository, JwtStrategy, ...CommandHandlers],
  controllers: [AuthController],
})
export class AuthModule {}
