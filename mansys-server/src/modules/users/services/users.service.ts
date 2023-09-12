import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, toUserDto } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ResultModel } from '../../../common/result-model';
import * as bcrypt from 'bcrypt';
import { ResultListModel } from 'src/common/result-list-model';
import * as faker from 'faker';
import { UserRole } from '../enums/user-role.enum';
import { FilterUserDto } from '../dto/filter-user.dto';
import { Roles } from '../../../common/role.decorator';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

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
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    user = await this.usersRepository.save(createUserDto);
    return toUserDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.findOne(id);
    try {
      const updatedUser = await this.usersRepository.save({
        ...user,
        ...updateUserDto,
      });
      return toUserDto(updatedUser);
    } catch (error) {
      this.logger.error('Update user by id error: ', error.message ?? error);
      throw new HttpException(
        `Update user with id ${id} failed`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ResultModel<UserDto>> {
    const user = await this.usersRepository.findOne({
      where: { id: id, isActive: true },
    });
    if (!user)
      return ResultModel.fail(null, 'User not found or no longer existing!');
    return ResultModel.success(toUserDto(user), 'Success');
  }

  async getAll(): Promise<ResultModel<User[]>> {
    const result = await this.usersRepository.find();
    return ResultModel.success(result, "Success");
}
  async findOneByUsername(username: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) return null;
    return toUserDto(user);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { username: username, isActive: true },
    });

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

  async findByPayload({ username }: any): Promise<ResultModel<UserDto>> {
    let user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) return ResultModel.fail(null, 'User not found!');

    let userDto = new UserDto();

    userDto.id = user.id;
    userDto.email = user.email;
    userDto.phone = user.phone;
    userDto.username = user.username;
    userDto.roles = [user.userRole];
    return ResultModel.success<UserDto>(userDto, 'Success');
  }

  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.usersRepository.find();
      return users.map((user) => toUserDto(user));
    } catch (error) {
      this.logger.error('Get all users error: ', error.message ?? error);
      throw new HttpException(
        `Get all users failed`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deactivate(id: number): Promise<ResultModel<boolean>> {
    var user = await this.usersRepository.findOne({ where: { id } });
    if (!user) return ResultModel.fail(false, 'User not found!');
    user.isActive = false;
    await this.usersRepository.save(user);
    return ResultModel.success(true, 'Deactive user sucess!');
  }

  async findWithFilter(filter: FilterUserDto) {
    const query = this.createQueryBuilder();
    const page = parseInt(filter.page as any) || 1;
    const limit = parseInt(filter.pageSize as any) || 10;

    if (filter.role) {
      query.where({ userRole: filter.role });
    }

    if (filter.username) {
      query.andWhere('users.username like :username', {
        username: '%' + filter.username + '%',
      });
    }

    if (filter.email) {
      query.andWhere('users.email like :email', {
        email: '%' + filter.email + '%',
      });
    }

    if (filter.phone) {
      query.andWhere('users.phone like :phone', {
        phone: '%' + filter.phone + '%',
      });
    }

    if (filter.id) {
      query.andWhere('users.id like :id', {
        id: '%' + filter.id + '%',
      });
    }

    if (filter.joinDateFrom) {
      query.andWhere('users.joinDate >= :joinDateFrom', {
        joinDateFrom: '%' + filter.joinDateFrom + '%',
      });
    }

    if (filter.joinDateTo) {
      query.andWhere('users.joinDate <= :joinDateTo', {
        joinDateTo: '%' + filter.joinDateTo + '%',
      });
    }

    if (filter.name) {
      query.andWhere('users.name like :name', {
        name: '%' + filter.name + '%',
      });
    }

    const totalRows = await query.getCount();

    const skip = (page - 1) * limit;
    query.offset(skip).limit(limit);

    const users = await query.getMany();
    return ResultListModel.success(users, totalRows, 'All filtered users');
  }

  createQueryBuilder() {
    return this.usersRepository.createQueryBuilder('users');
  }

  async seedUsers(total: number) {
    while (total > 0) {
      try {
        this.usersRepository.create({
          username: faker.internet.userName(),
          password: 'password',
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          userRole: UserRole.user,
          name: faker.internet.email()
        });
        total--;
      } catch (error) {
        console.log(error);
      }
    }
    return ResultModel.success(total, '');
  }

  async deleteAllUsers() {
    const role = UserRole.user;
    const users = await this.usersRepository.findBy({
      userRole: role,
    });

    users.forEach((user) => {
      this.usersRepository.remove(user);
    });

    return ResultModel.success('', '');
  }
}
