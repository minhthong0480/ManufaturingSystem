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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var UsersBootstrapService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersBootstrapService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../modules/users/services/users.service");
const user_role_enum_1 = require("../modules/users/enums/user-role.enum");
let UsersBootstrapService = exports.UsersBootstrapService = UsersBootstrapService_1 = class UsersBootstrapService {
    constructor(usersService) {
        this.usersService = usersService;
        this.logger = new common_1.Logger(UsersBootstrapService_1.name);
    }
    onApplicationBootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Running seeding!');
            this.createDefaultUser();
        });
    }
    createDefaultUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var user = yield this.usersService.findOneByUsername(process.env.DEFAULT_USERNAME);
                if (user) {
                    this.logger.log('Already had an admin user!');
                    return;
                }
                const defaultAdmin = {
                    username: process.env.DEFAULT_USERNAME,
                    password: process.env.DEFAULT_PASSWORD,
                    email: process.env.DEFAULT_EMAIL,
                    phone: process.env.DEFAULT_PHONE,
                    userRole: user_role_enum_1.UserRole.admin,
                };
                yield this.usersService.create(defaultAdmin);
                this.logger.log('Create a default admin user sucessfully!');
            }
            catch (error) {
                this.logger.log('Cannot create a default admin user!');
            }
        });
    }
};
exports.UsersBootstrapService = UsersBootstrapService = UsersBootstrapService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersBootstrapService);
//# sourceMappingURL=user-bootstrap.service.js.map