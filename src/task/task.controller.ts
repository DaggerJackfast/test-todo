import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { infinityPagination, IPaginationResult } from '../lib/pagination';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async find(@Query() query: TaskQueryDto): Promise<IPaginationResult<Task>> {
    const { page, limit, title, status } = query;
    // TODO: change title with ilike
    // TODO: add order by field to query
    return infinityPagination(await this.taskService.findManyWithPagination({ title, status }, { page, limit }), { page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id') id: string): Promise<void> {
    await this.taskService.remove(id);
  }
}
