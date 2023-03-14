import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Title' })
  @MinLength(3)
  @IsString()
  title: string;

  @ApiProperty({ example: 'Test task description' })
  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  userId: string;
}
