export enum JwtErrorCode {
  TokenExpired = 4000,
  TokenInvalid = 4001,
  NotBefore = 4002,
}

export enum Unauthorized {
  FailLogin = 5000,
  NotFoundUser = 5001,
  NotHasAdminRole = 5002,
}
