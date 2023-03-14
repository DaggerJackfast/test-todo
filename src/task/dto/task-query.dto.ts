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
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ enum: TaskStatus, required: false, type: String })
  @IsOptional()
  @IsString()
  @IsEnum(TaskStatus)
  status: string;

  @ApiProperty({ required: false, type: String, description: 'Search by part of title' })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    example: '-createdAt',
    required: false,
    type: String,
    description: 'For order DESC should add "-" before fieldName, Example -createdAt',
  })
  @IsOptional()
  @IsString()
  orderBy: string;
}
