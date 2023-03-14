import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  public async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(this.userRepository.create(createUserDto));
  }

  public async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }
}
