import { User } from '@models/user';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
        domain: 'https://meet-us.byeonggi.synology.me',
        maxAge: expirationDate,
        sameSite: 'lax',
        path: '/',
      });
      res.cookie('refresh-token', refreshToken, {
        secure: true,
        httpOnly: true,
        domain: 'https://meet-us.byeonggi.synology.me',
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
