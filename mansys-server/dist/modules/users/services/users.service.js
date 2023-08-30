"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const user_dto_1 = require("../dto/user.dto");
const result_model_1 = require("../../../common/result-model");
const bcrypt = require("bcrypt");
const result_list_model_1 = require("../../../common/result-list-model");
const faker = require("faker");
const user_role_enum_1 = require("../enums/user-role.enum");
let UsersService = exports.UsersService = UsersService_1 = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = createUserDto.username;
            let user = yield this.usersRepository.findOneBy({ username });
            if (user) {
                throw new common_1.HttpException(`Username existed. Please use another`, common_1.HttpStatus.BAD_REQUEST);
            }
            const saltOrRounds = 10;
            createUserDto.password = yield bcrypt.hash(createUserDto.password, saltOrRounds);
            user = yield this.usersRepository.save(createUserDto);
            return (0, user_entity_1.toUserDto)(user);
        });
    }
    update(id, updateUserDto) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(id);
            try {
                const updatedUser = yield this.usersRepository.save(Object.assign(Object.assign({}, user), updateUserDto));
                return (0, user_entity_1.toUserDto)(updatedUser);
            }
            catch (error) {
                this.logger.error('Update user by id error: ', (_a = error.message) !== null && _a !== void 0 ? _a : error);
                throw new common_1.HttpException(`Update user with id ${id} failed`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({
                where: { id: id, isActive: true },
            });
            if (!user)
                return result_model_1.ResultModel.fail(null, 'User not found or no longer existing!');
            return result_model_1.ResultModel.success((0, user_entity_1.toUserDto)(user), 'Success');
        });
    }
    findOneByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({ where: { username } });
            if (!user)
                return null;
            return (0, user_entity_1.toUserDto)(user);
        });
    }
    findByLogin({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({
                where: { username: username, isActive: true },
            });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            const areEqual = yield bcrypt.compare(password, user.password);
            if (!areEqual) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
            return (0, user_entity_1.toUserDto)(user);
        });
    }
    findByPayload({ username }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.usersRepository.findOne({
                where: { username },
            });
            if (!user)
                return result_model_1.ResultModel.fail(null, 'User not found!');
            let userDto = new user_dto_1.UserDto();
            userDto.id = user.id;
            userDto.email = user.email;
            userDto.phone = user.phone;
            userDto.username = user.username;
            userDto.roles = [user.userRole];
            return result_model_1.ResultModel.success(userDto, 'Success');
        });
    }
    findAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.usersRepository.find();
                return users.map((user) => (0, user_entity_1.toUserDto)(user));
            }
            catch (error) {
                this.logger.error('Get all users error: ', (_a = error.message) !== null && _a !== void 0 ? _a : error);
                throw new common_1.HttpException(`Get all users failed`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    deactivate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.usersRepository.findOne({ where: { id } });
            if (!user)
                return result_model_1.ResultModel.fail(false, 'User not found!');
            user.isActive = false;
            yield this.usersRepository.save(user);
            return result_model_1.ResultModel.success(true, 'Deactive user sucess!');
        });
    }
    findWithFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.createQueryBuilder();
            const page = parseInt(filter.page) || 1;
            const limit = parseInt(filter.pageSize) || 10;
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
            const totalRows = yield query.getCount();
            const skip = (page - 1) * limit;
            query.offset(skip).limit(limit);
            const users = yield query.getMany();
            return result_list_model_1.ResultListModel.success(users, totalRows, 'All filtered users');
        });
    }
    createQueryBuilder() {
        return this.usersRepository.createQueryBuilder('users');
    }
    seedUsers(total) {
        return __awaiter(this, void 0, void 0, function* () {
            while (total > 0) {
                try {
                    this.usersRepository.create({
                        username: faker.internet.userName(),
                        password: 'password',
                        email: faker.internet.email(),
                        phone: faker.phone.phoneNumber(),
                        userRole: user_role_enum_1.UserRole.user,
                    });
                    total--;
                }
                catch (error) {
                    console.log(error);
                }
            }
            return result_model_1.ResultModel.success(total, '');
        });
    }
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const role = user_role_enum_1.UserRole.user;
            const users = yield this.usersRepository.findBy({
                userRole: role,
            });
            users.forEach((user) => {
                this.usersRepository.remove(user);
            });
            return result_model_1.ResultModel.success('', '');
        });
    }
};
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map