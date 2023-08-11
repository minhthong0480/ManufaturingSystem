import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const username = createUserDto.username;
    const user = await this.usersRepository.findOneBy({ username });
    if (user) {
      throw new HttpException(
        `Username existed. Please use another`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.usersRepository.save(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    try {
      return this.usersRepository.save({
        ...user,
        ...updateUserDto,
      });
    } catch (error) {
      this.logger.error('Update user by id error: ', error.message ?? error);
      throw new HttpException(
        `Update user with id ${id} failed`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      this.logger.error('Get user by id error: ', error.message ?? error);
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ username });
    } catch (error) {
      this.logger.error('Get user by username error: ', error.message ?? error);
      throw new HttpException(
        `User with username: ${username} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      this.logger.error('Get all users error: ', error.message ?? error);
      throw new HttpException(
        `Get all users failed`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<HttpStatus> {
    const user = await this.findOne(id);
    try {
      await this.usersRepository.delete(user.id);
      return HttpStatus.OK;
    } catch (error) {
      this.logger.error('Remove user by id error: ', error.message ?? error);
      throw new HttpException(
        `Remove user with id ${id} failed`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
