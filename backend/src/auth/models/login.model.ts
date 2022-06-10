import { ApiProperty } from '@nestjs/swagger';

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
