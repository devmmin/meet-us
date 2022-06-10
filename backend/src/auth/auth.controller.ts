import {
  LoginCommand,
  LoginResult,
  RefreshAccessTokenCommand,
  RefreshAccessTokenResult,
} from '@auth/commands';
import {
  LoginInput,
  LoginResponse,
  RefreshTokenInput,
  RefreshTokenResponse,
} from '@auth/models';
import { Body, Controller, Logger, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Authority')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private commandBus: CommandBus,
    private configService: ConfigService,
  ) {}
  /**
   * 로그인 완료된 사용자는 해당 도메인에 쿠키를 저장해준다.
   * @param req
   * @param res
   */
  @ApiBody({ type: LoginInput })
  @ApiResponse({ type: LoginResponse })
  @Post('login')
  public async login(
    @Body() loginInput: LoginInput,
    @Res({ passthrough: true }) res: Response<LoginResponse>,
  ) {
    const { userEmail, userPassword } = loginInput;
    const loginResult = await this.commandBus.execute<
      LoginCommand,
      LoginResult
    >(new LoginCommand(userEmail, userPassword));
    Logger.log(loginResult, 'loginResult');
    if (loginResult) {
      const { accessToken, refreshToken, expirationDate } = loginResult;
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

  @ApiBody({ type: RefreshTokenInput })
  @ApiResponse({ type: RefreshTokenResponse })
  @Post('refresh')
  async refresh(
    @Body() refreshTokenInput: RefreshTokenInput,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response<RefreshTokenResponse>,
  ) {
    if (req.cookies['refresh-token']) {
      Logger.log(req.cookies['refresh-token'], '쿠키에 토큰 검사');
    }

    const { refreshToken } = refreshTokenInput;
    Logger.log(refreshToken, 'refreshToken');
    const { accessToken, expirationDate } = await this.commandBus.execute<
      RefreshAccessTokenCommand,
      RefreshAccessTokenResult
    >(new RefreshAccessTokenCommand(refreshToken));
    res.cookie('access-token', refreshToken, {
      secure: true,
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      maxAge: expirationDate,
      sameSite: 'lax',
      path: '/',
    });
    res.status(200).send({ accessToken });
  }
}
