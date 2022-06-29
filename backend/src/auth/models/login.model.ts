import { JwtErrorCode } from '@auth/constants/error-code.constant';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class LoginInput {
  @ApiProperty({
    description: '유저 이메일',
    example: 'meet-us-test@gmail.com',
  })
  userEmail: string;
  @ApiProperty({
    description: '유저 패스워드',
    example: '************',
  })
  userPassword: string;
}

export class LoginResponse {
  @ApiProperty({
    description: 'access 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  accessToken: string;
  @ApiProperty({
    description: 'refresh 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  refreshToken: string;
}

export interface LoginUser {
  userEmail: string;
  userPassword: string;
}

export interface RefreshTokenJwt {
  user_id: string;
  iat: string;
  exp: number;
  sub: number;
}

export interface LoginToken {
  accessToken: string;
  refreshToken: string;
  expirationDate: number;
}

export class RefreshTokenInput {
  @ApiProperty({
    description: 'refresh 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  refreshToken: string;
}
export class RefreshTokenResponse {
  @ApiProperty({
    description: 'access 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  accessToken: string;
}

export class JsonWebTokenError extends Error {
  @ApiProperty({ type: Error })
  inner: Error;
}

export class TokenExpiredError extends JsonWebTokenError {
  @ApiProperty({ type: Date })
  expiredAt: Date;
}

/**
 * Thrown if current time is before the nbf claim.
 */
export class NotBeforeError extends JsonWebTokenError {
  @ApiProperty({ type: Date })
  date: Date;
}

@ApiExtraModels(JsonWebTokenError, TokenExpiredError, NotBeforeError)
export class RefreshTokenErrorResponse {
  @ApiProperty({
    type: Number,
    enum: [
      JwtErrorCode.TokenInvalid,
      JwtErrorCode.TokenExpired,
      JwtErrorCode.NotBefore,
    ],
    description: `TokenExpired(만료) = 4000,TokenInvalid(유효하지않은 토큰) = 4001,NotBefore(유효하지않은 토큰)= 4002`,
  })
  code: number;
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(JsonWebTokenError) },
      { $ref: getSchemaPath(TokenExpiredError) },
      { $ref: getSchemaPath(NotBeforeError) },
    ],
  })
  error: JsonWebTokenError | TokenExpiredError | NotBeforeError;
}
