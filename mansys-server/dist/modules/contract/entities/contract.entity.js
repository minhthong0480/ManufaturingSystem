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
exports.Contract = void 0;
const typeorm_1 = require("typeorm");
const contract_item_entity_1 = require("./contract-item.entity");
const timeline_entity_1 = require("../../timeline/entities/timeline.entity");
let Contract = exports.Contract = class Contract {
    constructor() {
        this.isActive = true;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contract.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true,
        length: 100
    }),
    __metadata("design:type", String)
], Contract.prototype, "contractNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], Contract.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], Contract.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false
    }),
    __metadata("design:type", Date)
], Contract.prototype, "dateStart", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false
    }),
    __metadata("design:type", Date)
], Contract.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Number)
], Contract.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contract_item_entity_1.ContractItem, contractItem => contractItem.contract, {
        eager: true,
        cascade: ['insert'],
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Contract.prototype, "contractItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timeline_entity_1.Timeline, timeline => timeline.contract, {
        eager: false,
        cascade: ['insert']
    }),
    __metadata("design:type", Array)
], Contract.prototype, "timeline", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        nullable: false,
        default: true,
    }),
    __metadata("design:type", Boolean)
], Contract.prototype, "isActive", void 0);
exports.Contract = Contract = __decorate([
    (0, typeorm_1.Entity)('contract')
], Contract);
//# sourceMappingURL=contract.entity.js.map