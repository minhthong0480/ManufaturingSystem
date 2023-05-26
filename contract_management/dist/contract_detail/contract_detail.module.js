"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDetailModule = void 0;
const common_1 = require("@nestjs/common");
const contract_detail_controller_1 = require("./contract_detail.controller");
const contract_detail_service_1 = require("./contract_detail.service");
const typeorm_1 = require("@nestjs/typeorm");
const contract_detail_entity_1 = require("./contract_detail.entity");
const contract_entity_1 = require("../contract/contract.entity");
let ContractDetailModule = class ContractDetailModule {
};
ContractDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([contract_entity_1.Contract]),
            typeorm_1.TypeOrmModule.forFeature([contract_detail_entity_1.ContractDetail])
        ],
        controllers: [contract_detail_controller_1.ContractDetailController],
        providers: [contract_detail_service_1.ContractDetailService]
    })
], ContractDetailModule);
exports.ContractDetailModule = ContractDetailModule;
//# sourceMappingURL=contract_detail.module.js.map