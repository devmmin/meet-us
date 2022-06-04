import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { User } from '@user/models/user.model';
import { RefreahTokenJwt } from './models/token.model';
import { ValidateUser } from './models/user.model';

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
    return this.jwtService.verify(token, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  public async login(payload: User) {
    const { id } = payload;
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
        user_id: id,
        token_expiration_date: new Date(expirationDate),
      },
      update: {
        token: refreshToken,
        token_expiration_date: new Date(expirationDate),
      },
      where: {
        user_id: id,
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
