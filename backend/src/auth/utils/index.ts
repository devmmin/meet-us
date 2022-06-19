import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import {
  createParamDecorator,
  ExecutionContext,
  applyDecorators,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const AuthUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  return req?.user;
});

export const AuthRole = (roles: string[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RoleGuard),
  );

export const AuthUserForGql = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req?.user;
  },
);
