import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  username: string;

  @IsOptional()
  passwordHash?: string;
}
