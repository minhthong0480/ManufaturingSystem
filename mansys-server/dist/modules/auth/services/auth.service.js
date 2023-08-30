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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../users/services/users.service");
const common_1 = require("@nestjs/common");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    getTokenForUser(user) {
        return this.jwtService.sign({
            username: user.username,
            sub: user.id,
        });
    }
    register(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = {
                success: true,
                message: 'user registered',
            };
            try {
                yield this.usersService.create(userDto);
            }
            catch (err) {
                status = {
                    success: false,
                    message: err,
                };
            }
            return status;
        });
    }
    login(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findByLogin(loginUserDto);
            const token = this._createToken(user);
            return Object.assign({ username: user.username }, token);
        });
    }
    _createToken({ id, username, roles }) {
        const user = { id, username, roles: roles };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,
        };
    }
    validateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultModel = yield this.usersService.findByPayload(payload);
            if (!resultModel.indicateSuccess()) {
                throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
            }
            return resultModel.data;
        });
    }
};
exports.AuthService = AuthService = __decorate([
    __param(0, (0, common_1.Inject)(users_service_1.UsersService)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map