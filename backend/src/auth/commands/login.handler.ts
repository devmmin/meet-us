import { Unauthorized } from '@auth/constants/error-code.constant';
import { AuthRepository } from '@auth/repositories/auth.repository';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class LoginCommand {
  constructor(
    public readonly userEmail: string,
    public readonly userPassword: string,
  ) {}
}
export class LoginResult {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly expirationDate: number,
  ) {}
}
@CommandHandler(LoginCommand)
export class LoginHandler
  implements ICommandHandler<LoginCommand, LoginResult>
{
  constructor(private authService: AuthRepository) {}
  async execute(command: LoginCommand) {
    const { userEmail, userPassword } = command;
    const user: User = await this.authService.findUserByEmailAndPassword({
      userEmail,
      userPassword,
    });
    Logger.log(user);

    if (!user) {
      throw new UnauthorizedException({
        code: Unauthorized.FailLogin,
        error: new Error('해당 정보로 로그인이 실패했습니다.'),
      });
    }
    const { accessToken, refreshToken, expirationDate } =
      await this.authService.createToken(user);
    return new LoginResult(accessToken, refreshToken, expirationDate);
  }
}
