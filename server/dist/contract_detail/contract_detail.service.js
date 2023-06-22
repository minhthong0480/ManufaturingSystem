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
exports.ContractDetailService = void 0;
const common_1 = require("@nestjs/common");
const contract_detail_entity_1 = require("./contract_detail.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contract_entity_1 = require("../contract/contract.entity");
let ContractDetailService = class ContractDetailService {
    constructor(contract_detail, contract) {
        this.contract_detail = contract_detail;
        this.contract = contract;
    }
    async getAllContractDetail() {
        const result = await this.contract_detail.find();
        return result;
    }
    async deleteContractDetailById(id) {
        const found = await this.getDetailById(id);
        const result = await this.contract_detail.delete(id);
        const contractResult = await this.contract.delete(found['contract_id']['id']);
        if (result.affected === 0 || contractResult.affected === 0) {
            throw new common_1.NotFoundException(`Cannot find contracts with the given ID: ${id}`);
        }
    }
    async getDetailById(id) {
        const found = await this.contract_detail.findOneBy({ id: id });
        console.log(found['contract_id']['id']);
        if (!found) {
            throw new common_1.NotFoundException(`Cannot find contracts with the given ID: ${id}`);
        }
        return found;
    }
    async createContractDetail(id, contract_id, product_id, quantity) {
        const contractInfo = new contract_entity_1.Contract;
        contractInfo.id = contract_id;
        await contractInfo.save();
        const contractDetail = new contract_detail_entity_1.ContractDetail;
        contractDetail.id = id;
        contractDetail.contract_id = contractInfo;
        contractDetail.product_id = product_id;
        contractDetail.quantity = quantity;
        await contractDetail.save();
        return contractDetail;
    }
};
ContractDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contract_detail_entity_1.ContractDetail)),
    __param(1, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ContractDetailService);
exports.ContractDetailService = ContractDetailService;
//# sourceMappingURL=contract_detail.service.js.map