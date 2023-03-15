import { ApiProperty } from '@nestjs/swagger';

export class MePayloadDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}
