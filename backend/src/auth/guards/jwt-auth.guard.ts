import { AuthService } from '@auth/auth.service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  TokenExpiredError,
  NotBeforeError,
  JsonWebTokenError,
} from 'jsonwebtoken';

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
    try {
      this.authService.vaildateAcessToken(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log('error', error);
        throw new UnauthorizedException('The access token expired');
      } else if (error instanceof NotBeforeError) {
        console.log('error', error);
      } else if (error instanceof JsonWebTokenError) {
        console.log('error', error);
      }
    }
  }
}
