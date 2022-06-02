import { User } from '@models/user';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { RefreahTokenJwt } from './models/token.model';
import { ValidateUser } from './models/user.model';
import {
  TokenExpiredError,
  NotBeforeError,
  JsonWebTokenError,
} from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async vaildateUserPassword(user: ValidateUser) {
    return this.prismaService.user.findFirst({
      where: {
        AND: {
          user_email: user.userEmail,
          password: user.userPassword,
        },
      },
    });
  }

  public vaildateAcessToken(token: string) {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log('error', error);
      } else if (error instanceof NotBeforeError) {
        console.log('error', error);
      } else if (error instanceof JsonWebTokenError) {
        console.log('error', error);
      }
    }
  }

  public async login(payload: User) {
    const { user_id } = payload;
    const refreshToken = this.createRefreshToken(payload);
    const accessToken = this.createAccessToken(payload);

    const jwt: RefreahTokenJwt = this.jwtService.decode(refreshToken, {
      json: true,
    }) as RefreahTokenJwt;
    console.log('jwt', jwt.exp * 1000);
    const expirationDate = jwt.exp * 1000;

    await this.prismaService.refresh_token.upsert({
      create: {
        token: refreshToken,
        user_id: user_id,
        token_expiration_date: new Date(expirationDate),
      },
      update: {
        token: refreshToken,
        token_expiration_date: new Date(expirationDate),
      },
      where: {
        user_id,
      },
    });

    return {
      accessToken,
      refreshToken,
      expirationDate,
    };
  }

  public createAccessToken(payload) {
    return this.jwtService.sign(payload, {
      subject: 'access-token',
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
  }

  public createRefreshToken(payload) {
    return this.jwtService.sign(payload, {
      subject: 'refresh-token',
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
  }
}
