import { LoginCommand, LoginResult } from '@auth/commands';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { LoginInput, LoginResponse } from '@auth/models';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Authroity')
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
    @Res({ passthrough: true }) res: Response,
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

  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // this.authService.
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
