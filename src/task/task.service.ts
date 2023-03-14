import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import { FindOptionsOrder, Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm';
import { buildFilterByFieldName, buildILikeFilterByFieldName, buildOrderByFieldName } from '../lib/filters';
import { objectToArray } from '../lib/helpers';
import { IPaginationOptions } from '../lib/pagination';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskFindOptions } from './options';

const buildTaskFilterParams = (options: TaskFindOptions): FindOptionsWhere<Task> => {
  const builder = flow([
    buildILikeFilterByFieldName(options, 'search', 'title'),
    buildFilterByFieldName(options, 'title', 'title'),
    buildFilterByFieldName(options, 'status', 'status'),
    buildFilterByFieldName(options, 'userId', 'userId'),
  ]);
  const filterSchema = builder({});

  if (isEmpty(filterSchema)) {
    return undefined;
  }
  return objectToArray(filterSchema);
};

const buildOrderParams = (options: TaskFindOptions): FindOptionsOrder<Task> => {
  const builder = flow([buildOrderByFieldName(options, 'orderBy')]);
  const orderSchema = builder({});

  if (isEmpty(orderSchema)) {
    return undefined;
  }
  return orderSchema;
};

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  public async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const entity = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(entity);
  }

  public async findManyWithPagination(findOptions: TaskFindOptions, paginationOptions: IPaginationOptions): Promise<Task[]> {
    const whereParams = buildTaskFilterParams(findOptions);
    const orderParams = buildOrderParams(findOptions);
    return this.taskRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: whereParams,
      order: orderParams,
    });
  }

  public async findOne(id: string): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  public async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.save(
      this.taskRepository.create({
        id,
        ...updateTaskDto,
      }),
    );
  }

  public async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
