import {
  JwtErrorCode,
  Unauthorized,
} from '@auth/constants/error-code.constant';
import { RefreshTokenJwt } from '@auth/models';
import { AuthRepository } from '@auth/repositories';
import { createSecurityContextFactory } from '@auth/security/security-context';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class GqlJwtAuthGuard implements CanActivate {
  constructor(private authService: AuthRepository) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const gql = GqlExecutionContext.create(context);
    const ctx = gql.getContext();
    const headers = ctx.req?.headers;
    const cookies = ctx.req.cookies;
    Logger.log('Context cookies', cookies);
    Logger.log('Context headers', headers);
    const authorization = headers?.authorization || cookies['access-token'];
    if (!authorization) {
      throw new UnauthorizedException({
        code: JwtErrorCode.TokenInvalid,
        error: new Error('The token is Empty'),
      });
    }
    const token = authorization.replace('Bearer ', '');
    const payload = this.validateToken(token);
    const user$ = from(this.getCurrentUser(payload.user_id));
    return user$.pipe(
      map((user) => {
        if (!user) {
          throw new UnauthorizedException({
            code: Unauthorized.NotFoundUser,
            error: new Error('Not Found User'),
          });
        }
        const securityContext = createSecurityContextFactory(user, token);
        ctx.req.securityContext = securityContext;
        return !!securityContext;
      }),
    );
  }

  validateToken(token: string) {
    try {
      const payload: RefreshTokenJwt =
        this.authService.validateAccessToken(token);
      Logger.log('Token validateToken', payload.user_id);
      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException({
          code: JwtErrorCode.TokenExpired,
          error,
        });
      } else if (error instanceof NotBeforeError) {
        throw new UnauthorizedException({
          code: JwtErrorCode.NotBefore,
          error,
        });
      } else if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException({
          code: JwtErrorCode.TokenInvalid,
          error,
        });
      }
    }
  }

  getCurrentUser(userId: string) {
    return this.authService.getCurrentUser(userId);
  }
}
