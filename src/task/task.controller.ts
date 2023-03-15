import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthUser } from '../auth/auth.decorator';
import { MePayloadDto } from '../auth/dto/me-payload.dto';
import { infinityPagination, PaginationResultDto } from '../lib/pagination';
import { User } from '../user/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { ExtendBodyWithUserId } from './extend-body-with-user.interceptor';
import { TaskService } from './task.service';

@Controller('tasks')
@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseInterceptors(ExtendBodyWithUserId)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Task })
  public async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  // TODO: fix array
  @ApiExtraModels(PaginationResultDto, Task)
  @ApiOkResponse({
    description: 'Tasks pagination result',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginationResultDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Task) },
            },
          },
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  public async find(@Query() query: TaskQueryDto, @AuthUser() user: User): Promise<PaginationResultDto<Task>> {
    const { page, limit, title, status, search, orderBy } = query;
    const findOptions = { title, status, search, orderBy, userId: user.id };
    return infinityPagination(await this.taskService.findManyWithPagination(findOptions, { page, limit }), {
      page,
      limit,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Task })
  @ApiExtraModels(Task)
  public async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Task })
  public async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id') id: string): Promise<void> {
    await this.taskService.remove(id);
  }
}
