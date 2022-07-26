import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { SecurityContext } from '@auth/security/security-context';
import { Role } from '@prisma/client';
import { Unauthorized } from '@auth/constants/error-code.constant';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>('roles', ctx.getHandler());
    const req: Request = ctx.switchToHttp().getRequest();
    const securityContext: SecurityContext = req.securityContext;
    const authority = securityContext.authority;
    if (!authority.hasRole(roles)) {
      throw new UnauthorizedException({
        code: Unauthorized.NotHasAdminRole,
        error: new Error('Admin 권한이 없습니다.'),
      });
    }
    return true;
  }
}
