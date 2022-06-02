import { AuthService } from '@auth/auth.service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      this.vaildateToken(token);
    } else {
      throw new UnauthorizedException('The token is Empty');
    }

    return true;
  }
  vaildateToken(token: string) {
    return this.authService.vaildateAcessToken(token);
  }
}