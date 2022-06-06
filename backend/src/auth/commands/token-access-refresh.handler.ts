import { AuthRepository } from '@auth/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class RefreshAccessTokenCommand {
  constructor(public readonly refreshToken: string) {}
}
export class RefreshAccessTokenResult {
  constructor(
    public readonly accessToken: string,
    public readonly expirationDate: number,
  ) {}
}

@CommandHandler(RefreshAccessTokenCommand)
export class RefreshAccessTokenHandler
  implements
    ICommandHandler<RefreshAccessTokenCommand, RefreshAccessTokenResult>
{
  constructor(private authService: AuthRepository) {}
  async execute(
    command: RefreshAccessTokenCommand,
  ): Promise<RefreshAccessTokenResult> {
    const { refreshToken } = command;
    const { accessToken, expirationDate } =
      this.authService.refreshAccessToken(refreshToken);
    return new RefreshAccessTokenResult(accessToken, expirationDate);
  }
}
