import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { toNumber } from '../../lib/helpers';
import { TaskStatus } from '../entities/task.entity';

export class PaginationQueryDto {
  @ApiProperty({ example: 1, type: Number, required: false })
  @IsOptional()
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ example: 30, type: Number, required: false })
  @IsOptional()
  @Transform(({ value }) => toNumber(value, { default: 30 }))
  @IsNumber()
  limit?: number = 30;
}

export class TaskQueryDto extends PartialType(PaginationQueryDto) {
  @ApiProperty({ example: 'Test Task', required: false, type: String })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ example: 'in_working', required: false, type: String })
  @IsOptional()
  @IsString()
  @IsEnum(TaskStatus)
  status: string;
}
