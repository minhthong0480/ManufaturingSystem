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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const create_contract_dto_1 = require("../dtos/create-contract.dto");
const contract_service_1 = require("../services/contract.service");
const swagger_1 = require("@nestjs/swagger");
const filter_contract_dto_1 = require("../dtos/filter-contract.dto");
const update_contract_dto_1 = require("../dtos/update-contract.dto");
let ContractController = exports.ContractController = class ContractController {
    constructor(contractService) {
        this.contractService = contractService;
    }
    create(createContractDto) {
        return this.contractService.create(createContractDto);
    }
    filterContracts(filterDto) {
        filterDto.applyDefaultPaginationSetting();
        return this.contractService.filter(filterDto);
    }
    updateContact(id, updateContactDto) {
        return this.contractService.update(id, updateContactDto);
    }
    deactivate(id) {
        return this.contractService.deactivate(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contract_dto_1.CreateContractDto]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_contract_dto_1.ContractFilterDTO]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "filterContracts", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_contract_dto_1.UpdateContactDto]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "updateContact", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: "id", required: true }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "deactivate", null);
exports.ContractController = ContractController = __decorate([
    (0, swagger_1.ApiTags)('contract'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('contract'),
    __metadata("design:paramtypes", [contract_service_1.ContractService])
], ContractController);
//# sourceMappingURL=contract.controller.js.map