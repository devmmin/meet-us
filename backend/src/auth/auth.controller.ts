import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginParam, LoginResponse } from '@auth/models';
import { User } from '@user/models/user.model';
@Controller('v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}
  /**
   * 로그인 완료된 사용자는 해당 도메인에 쿠키를 저장해준다.
   * @param req
   * @param res
   */
  @ApiBody({ type: LoginParam })
  @ApiResponse({ type: LoginResponse })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = <User>req.user;
    console.log('=============', user);
    if (user) {
      const { accessToken, refreshToken, expirationDate } =
        await this.authService.login(user);
      res.cookie('access-token', accessToken, {
        secure: true,
        httpOnly: true,
        domain: this.configService.get('SERVER_DOMAIN'),
        maxAge: expirationDate,
        sameSite: 'lax',
        path: '/',
      });
      res.cookie('refresh-token', refreshToken, {
        secure: true,
        httpOnly: true,
        domain: this.configService.get('SERVER_DOMAIN'),
        maxAge: expirationDate,
        sameSite: 'lax',
        path: '/',
      });
      res.status(200).send({ accessToken, refreshToken });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
