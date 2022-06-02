import { AuthService } from '@auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(<IStrategyOptions>{
      usernameField: 'userEmail',
      passwordField: 'userPassword',
    });
  }

  async validate(userEmail: string, userPassword: string) {
    const user = await this.authService.vaildateUserPassword({
      userEmail,
      userPassword,
    });

    if (!user) {
      throw new UnauthorizedException('The login is invaild');
    }

    return user;
  }
}
