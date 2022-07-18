import {
  LoginCommand,
  LoginResult,
  RefreshAccessTokenCommand,
  RefreshAccessTokenResult,
} from '@auth/commands';
import {
  LoginErrorResponse,
  LoginInput,
  LoginResponse,
  RefreshTokenErrorResponse,
  RefreshTokenInput,
  RefreshTokenResponse,
} from '@auth/models';
import { Body, Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { OAuth2Pricipal } from './security/security-context';
import { AuthRole, OAuth2User } from './utils';

@ApiTags('Authority')
@Controller('v1/auth')
export class AuthController {
  private readonly LOCALHOST = 'localhost';
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
  @ApiOkResponse({
    type: LoginResponse,
    description: '로그인에 성공할 경우 토큰 생성',
  })
  @ApiUnauthorizedResponse({
    type: LoginErrorResponse,
    description: '로그인 정보가 맞지 않아 로그인에 실패한 경우',
  })
  @Post('login')
  public async login(
    @Body() loginInput: LoginInput,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response<LoginResponse>,
  ) {
    const { userEmail, userPassword } = loginInput;
    const loginResult = await this.commandBus.execute<
      LoginCommand,
      LoginResult
    >(new LoginCommand(userEmail, userPassword));
    Logger.log(loginResult, 'loginResult');
    if (loginResult) {
      const isReqLocalHost = req?.headers?.origin?.includes('localhost');
      const { accessToken, refreshToken, expirationDate } = loginResult;
      res.cookie('access-token', accessToken, {
        secure: true,
        httpOnly: true,
        domain: isReqLocalHost
          ? this.LOCALHOST
          : this.configService.get('SERVER_DOMAIN'),
        maxAge: expirationDate,
        sameSite: isReqLocalHost ? 'none' : 'lax',
        path: '/',
      });
      res.cookie('refresh-token', refreshToken, {
        secure: true,
        httpOnly: true,
        domain: isReqLocalHost
          ? this.LOCALHOST
          : this.configService.get('SERVER_DOMAIN'),
        maxAge: expirationDate,
        sameSite: isReqLocalHost ? 'none' : 'lax',
        path: '/',
      });
      res.status(200).send({ accessToken, refreshToken });
    }
  }

  @ApiBody({ type: RefreshTokenInput })
  @ApiOkResponse({
    type: RefreshTokenResponse,
    description: 'refresh 토큰을 보낸후 새로운 액세스 토큰을 얻는다',
  })
  @ApiBadRequestResponse({
    type: RefreshTokenErrorResponse,
    description:
      'Error Code: TokenExpired(만료) = 4000,TokenInvalid(유효하지않은 토큰) = 4001,NotBefore(유효하지않은 토큰)= 4002',
  })
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
    if (refreshToken) {
      const isReqLocalHost = req?.headers?.origin?.includes('localhost');
      res.cookie('access-token', refreshToken, {
        secure: true,
        httpOnly: true,
        domain: isReqLocalHost
          ? this.LOCALHOST
          : this.configService.get('SERVER_DOMAIN'),
        maxAge: expirationDate,
        sameSite: 'lax',
        path: '/',
      });
    }

    res.status(200).send({ accessToken });
  }

  @AuthRole(['ADMIN', 'USER'])
  @ApiOkResponse({ description: '백앤드 테스트용 API' })
  @Get('user')
  currentUserTest(@OAuth2User() currentUser: OAuth2Pricipal) {
    Logger.log(currentUser.userEmail, 'currentUser');
    return 'hello';
  }

  private setLocalHostCookies(req, res, loginResult) {
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
  }
}
