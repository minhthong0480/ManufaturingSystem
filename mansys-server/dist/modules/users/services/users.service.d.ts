import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ResultModel } from '../../../common/result-model';
import { ResultListModel } from 'src/common/result-list-model';
import { FilterUserDto } from '../dto/filter-user.dto';
export declare class UsersService {
    private readonly usersRepository;
    private readonly logger;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<UserDto>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto>;
    findOne(id: number): Promise<ResultModel<UserDto>>;
    findOneByUsername(username: string): Promise<UserDto>;
    findByLogin({ username, password }: LoginUserDto): Promise<UserDto>;
    findByPayload({ username }: any): Promise<ResultModel<UserDto>>;
    findAll(): Promise<UserDto[]>;
    deactivate(id: number): Promise<ResultModel<boolean>>;
    findWithFilter(filter: FilterUserDto): Promise<ResultListModel<User>>;
    createQueryBuilder(): import("typeorm").SelectQueryBuilder<User>;
    seedUsers(total: number): Promise<ResultModel<number>>;
    deleteAllUsers(): Promise<ResultModel<string>>;
}
