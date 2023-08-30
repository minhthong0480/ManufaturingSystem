import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { FilterUserDto } from '../dto/filter-user.dto';
export declare class UsersController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UsersService);
    findWithFilder(filterUserDto: FilterUserDto): Promise<import("../../../common/result-list-model").ResultListModel<import("../entities/user.entity").User>>;
    findOne(id: number): Promise<import("../../../common/result-model").ResultModel<import("../dto/user.dto").UserDto>>;
    update(id: any, user: UpdateUserDto): Promise<import("../dto/user.dto").UserDto>;
    create(user: CreateUserDto): Promise<import("../dto/user.dto").UserDto>;
    deactivate(id: any): Promise<import("../../../common/result-model").ResultModel<boolean>>;
    seedUsers(total: any): Promise<import("../../../common/result-model").ResultModel<number>>;
    deleteSeedUsers(): Promise<import("../../../common/result-model").ResultModel<string>>;
}
