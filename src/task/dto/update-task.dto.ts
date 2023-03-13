import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ enum: TaskStatus, isArray: false, example: TaskStatus.IN_WORKING })
  @IsOptional()
  // @IsEnum(TaskStatus)
  status?: string;
}
