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
exports.ContractDetailController = void 0;
const common_1 = require("@nestjs/common");
const contract_detail_service_1 = require("./contract_detail.service");
let ContractDetailController = class ContractDetailController {
    constructor(contractDetailService) {
        this.contractDetailService = contractDetailService;
    }
    getById(id) {
        return this.contractDetailService.getDetailById(id);
    }
    getAll() {
        return this.contractDetailService.getAllContractDetail();
    }
    deleteById(id) {
        return this.contractDetailService.deleteContractDetailById(id);
    }
    createATaskDetail(id, contract_id, product_id, quantity) {
        return this.contractDetailService.createContractDetail(id, contract_id, product_id, quantity);
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractDetailController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractDetailController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractDetailController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Body)('contract_id')),
    __param(2, (0, common_1.Body)('product_id')),
    __param(3, (0, common_1.Body)('quantity', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Promise)
], ContractDetailController.prototype, "createATaskDetail", null);
ContractDetailController = __decorate([
    (0, common_1.Controller)('contract-detail'),
    __metadata("design:paramtypes", [contract_detail_service_1.ContractDetailService])
], ContractDetailController);
exports.ContractDetailController = ContractDetailController;
//# sourceMappingURL=contract_detail.controller.js.map