"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contract_entity_1 = require("./entities/contract.entity");
const contract_service_1 = require("./services/contract.service");
const contract_controller_1 = require("./controllers/contract.controller");
const contract_item_service_1 = require("./services/contract-item.service");
const contract_item_entity_1 = require("./entities/contract-item.entity");
const products_module_1 = require("../products/products.module");
let ContractModule = exports.ContractModule = class ContractModule {
};
exports.ContractModule = ContractModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([contract_entity_1.Contract, contract_item_entity_1.ContractItem]), products_module_1.ProductsModule],
        controllers: [contract_controller_1.ContractController],
        providers: [contract_service_1.ContractService, contract_item_service_1.ContractItemService],
    })
], ContractModule);
//# sourceMappingURL=contract.module.js.map