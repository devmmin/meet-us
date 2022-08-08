import { GqlJwtAuthGuard } from '@auth/guards/gql-jwt-auth.guard';
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
import { Role } from '@prisma/client';
import { Request } from 'express';

export const OAuth2User = createParamDecorator((_, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  return req?.securityContext?.principal;
});

export const AuthRole = (roles: Role[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RoleGuard),
  );

export const OAuth2UserForGql = createParamDecorator(
  (_, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req?.securityContext?.principal;
  },
);

export const AuthRoleForGql = (roles: Role[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(GqlJwtAuthGuard));
