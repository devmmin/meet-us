import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as User;
    if (roles.includes(user.role)) {
      throw new UnauthorizedException('Admin 권한이 없습니다.');
    }
    return true;
  }
}
