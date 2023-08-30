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
exports.ContractStatusController = void 0;
const common_1 = require("@nestjs/common");
const contract_status_service_1 = require("../services/contract_status.service");
const create_contract_status_dto_1 = require("../dtos/create_contract_status.dto");
const swagger_1 = require("@nestjs/swagger");
let ContractStatusController = exports.ContractStatusController = class ContractStatusController {
    constructor(ContractStatusService) {
        this.ContractStatusService = ContractStatusService;
    }
    create(CreateContractStatusDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ContractStatusService.create(CreateContractStatusDto);
        });
    }
    getAll(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ContractStatusService.getAll();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ContractStatusService.delete(id);
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contract_status_dto_1.CreateContractStatusDto]),
    __metadata("design:returntype", Promise)
], ContractStatusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractStatusController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContractStatusController.prototype, "delete", null);
exports.ContractStatusController = ContractStatusController = __decorate([
    (0, swagger_1.ApiTags)('contract_status'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('contract_status'),
    __metadata("design:paramtypes", [contract_status_service_1.ContractStatusService])
], ContractStatusController);
//# sourceMappingURL=contract_status.controller.js.map