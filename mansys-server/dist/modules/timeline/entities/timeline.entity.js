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
exports.Timeline = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const contract_entity_1 = require("../../contract/entities/contract.entity");
const contract_status_entity_1 = require("../../contract_status/entities/contract_status.entity");
let Timeline = exports.Timeline = class Timeline {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Timeline.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contract_status_entity_1.ContractStatus, contractStatus => contractStatus.timeline),
    __metadata("design:type", contract_status_entity_1.ContractStatus)
], Timeline.prototype, "contractStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contract_entity_1.Contract, contract => contract.timeline),
    __metadata("design:type", contract_entity_1.Contract)
], Timeline.prototype, "contract", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.timeline),
    __metadata("design:type", user_entity_1.User)
], Timeline.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Timeline.prototype, "time", void 0);
exports.Timeline = Timeline = __decorate([
    (0, typeorm_1.Entity)('timeline')
], Timeline);
//# sourceMappingURL=timeline.entity.js.map