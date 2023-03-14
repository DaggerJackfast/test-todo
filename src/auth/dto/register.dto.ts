import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { IsNotExist } from '../../lib/validators';

export class RegisterDto {
  @ApiProperty({ example: 'test_user' })
  @IsNotEmpty()
  @IsString()
  @Validate(IsNotExist, ['User'], {
    message: 'User with the username is already exists',
  })
  @Transform(({ value }) => value.toLowerCase().trim())
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
