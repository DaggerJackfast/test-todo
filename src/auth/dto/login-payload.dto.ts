import { ApiProperty } from '@nestjs/swagger';

export class LoginPayloadDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiresIn: string;

  @ApiProperty()
  username: string;
  constructor(id: string, username: string, accessToken: string, expiresIn: string) {
    this.id = id;
    this.username = username;
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
  }
}
