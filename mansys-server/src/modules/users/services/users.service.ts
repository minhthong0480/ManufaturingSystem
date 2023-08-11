import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, toUserDto } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const username = createUserDto.username;
    let user = await this.usersRepository.findOneBy({ username });
    if (user) {
      throw new HttpException(
        `Username existed. Please use another`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);

    user = await this.usersRepository.save(createUserDto)
    return toUserDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.findOne(id);
    try {
      const updatedUser = await this.usersRepository.save({
        ...user,
        ...updateUserDto,
      })
      return toUserDto(updatedUser);
    } catch (error) {
      this.logger.error('Update user by id error: ', error.message ?? error);
      throw new HttpException(
        `Update user with id ${id} failed`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<UserDto> {
    try {
      const user = await this.usersRepository.findOneByOrFail({ id })
      return toUserDto(user);
    } catch (error) {
      this.logger.error('Get user by id error: ', error.message ?? error);
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOneByUsername(username: string): Promise<UserDto> {
    try {
      const user = await this.usersRepository.findOneByOrFail({ username })
      return toUserDto(user);
    } catch (error) {
      this.logger.error('Get user by username error: ', error.message ?? error);
      throw new HttpException(
        `User with username: ${username} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // Note: compare(plain password, hashed password)
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.usersRepository.findOne({
      where: { username }
    });
  }

  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.usersRepository.find();
      return users.map(user => toUserDto(user));
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
