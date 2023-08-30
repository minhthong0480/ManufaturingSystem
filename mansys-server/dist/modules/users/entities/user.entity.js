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
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDto = exports.User = void 0;
const typeorm_1 = require("typeorm");
const user_role_enum_1 = require("../enums/user-role.enum");
const class_validator_1 = require("class-validator");
const timeline_entity_1 = require("../../timeline/entities/timeline.entity");
let User = exports.User = class User {
    constructor() {
        this.isActive = true;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false,
        default: new Date(),
    }),
    __metadata("design:type", Date)
], User.prototype, "joinDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        nullable: false,
        default: true,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        nullable: false,
        enum: user_role_enum_1.UserRole,
        default: user_role_enum_1.UserRole.user,
    }),
    __metadata("design:type", String)
], User.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timeline_entity_1.Timeline, timeline => timeline.user),
    __metadata("design:type", Array)
], User.prototype, "timeline", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
const toUserDto = (data) => {
    if (!data)
        return null;
    const { id, username, email, phone, userRole } = data;
    let userDto = { id, username, email, phone, roles: [userRole] };
    return userDto;
};
exports.toUserDto = toUserDto;
//# sourceMappingURL=user.entity.js.map