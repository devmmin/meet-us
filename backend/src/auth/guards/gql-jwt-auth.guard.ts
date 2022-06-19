import { RefreshTokenJwt } from '@auth/models';
import { AuthRepository } from '@auth/repositories';
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
    const authorization = ctx.req?.headers?.authorization;
    if (!authorization) {
      throw new UnauthorizedException('The token is Empty');
    }
    const token = authorization.replace('Bearer ', '');
    const payload = this.validateToken(token);
    const user$ = from(this.getCurrentUser(payload.user_id));
    return user$.pipe(
      map((user) => {
        if (!user) {
          throw new UnauthorizedException('Not Found User');
        }
        ctx.req.user = user;
        return !!user;
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
        throw new UnauthorizedException({ code: -401, error });
      } else if (error instanceof NotBeforeError) {
        throw new UnauthorizedException({ code: -401, error });
      } else if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException({ code: -1, error });
      }
    }
  }

  getCurrentUser(userId: string) {
    return this.authService.getCurrentUser(userId);
  }
}
