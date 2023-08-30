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
exports.ContractStatus = void 0;
const typeorm_1 = require("typeorm");
const timeline_entity_1 = require("../../timeline/entities/timeline.entity");
let ContractStatus = exports.ContractStatus = class ContractStatus {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContractStatus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContractStatus.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 254
    }),
    __metadata("design:type", String)
], ContractStatus.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ContractStatus.prototype, "previous_stage_ids", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ContractStatus.prototype, "next_stage_ids", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timeline_entity_1.Timeline, timeline => timeline.contractStatus, {
        eager: false,
        cascade: ['insert']
    }),
    __metadata("design:type", Array)
], ContractStatus.prototype, "timeline", void 0);
exports.ContractStatus = ContractStatus = __decorate([
    (0, typeorm_1.Entity)('contract_status')
], ContractStatus);
//# sourceMappingURL=contract_status.entity.js.map