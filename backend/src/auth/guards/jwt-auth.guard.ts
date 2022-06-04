import { AuthRepository } from '@auth/repositories';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthRepository) {
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
    try {
      const res = this.authService.vaildateAcessToken(token);
      console.log('res', res);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException({ code: -401, error });
      } else if (error instanceof NotBeforeError) {
        throw new UnauthorizedException({ code: -401, error });
      } else if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException({ code: -1, error });
      }
    }
  }
}
