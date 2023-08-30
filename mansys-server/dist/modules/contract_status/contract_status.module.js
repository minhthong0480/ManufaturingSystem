"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractStatusModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contract_status_entity_1 = require("./entities/contract_status.entity");
const contract_status_controller_1 = require("./controllers/contract_status.controller");
const contract_status_service_1 = require("./services/contract_status.service");
let ContractStatusModule = exports.ContractStatusModule = class ContractStatusModule {
};
exports.ContractStatusModule = ContractStatusModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([contract_status_entity_1.ContractStatus])],
        controllers: [contract_status_controller_1.ContractStatusController],
        providers: [contract_status_service_1.ContractStatusService]
    })
], ContractStatusModule);
//# sourceMappingURL=contract_status.module.js.map