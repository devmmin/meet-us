import { ApiProperty } from '@nestjs/swagger';

export class LoginParam {
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
