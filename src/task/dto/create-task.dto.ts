import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Title' })
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Test task description' })
  @IsOptional()
  description?: string;
}
