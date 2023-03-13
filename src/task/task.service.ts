import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import flow from 'lodash/flow';
import { Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm';
import { IPaginationOptions } from '../lib/pagination';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskFindOptions } from './options';

export type EntityCondition<T> = FindOptionsWhere<T>;

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  public async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(this.taskRepository.create(createTaskDto));
  }

  public async findManyWithPagination(findOptions: TaskFindOptions, paginationOptions: IPaginationOptions): Promise<Task[]> {
    return this.taskRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: findOptions,
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
