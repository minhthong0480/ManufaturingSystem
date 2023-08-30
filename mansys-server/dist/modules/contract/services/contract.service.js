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
exports.ContractService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const contract_entity_1 = require("../entities/contract.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const result_model_1 = require("../../../common/result-model");
const result_list_model_1 = require("../../../common/result-list-model");
const contract_item_service_1 = require("./contract-item.service");
let ContractService = exports.ContractService = class ContractService {
    constructor(contractRepository, contractItemService) {
        this.contractRepository = contractRepository;
        this.contractItemService = contractItemService;
    }
    create(createContractDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractNumber = createContractDto.contractNumber;
            let contract = yield this.contractRepository.findOneBy({ contractNumber });
            if (contract) {
                return result_model_1.ResultModel.fail(null, 'Contract existed!');
            }
            contract = yield this.contractRepository.save(createContractDto);
            return result_model_1.ResultModel.success(contract, 'Success');
        });
    }
    filter(filterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.contractRepository.createQueryBuilder('contracts');
            if (filterDto.contractNumber) {
                query.andWhere('contracts.contractNumber ILIKE :contractNumber', {
                    contractNumber: `%${filterDto.contractNumber}%`,
                });
            }
            if (filterDto.customerName) {
                query.andWhere('contracts.customerName ILIKE :customerName', {
                    customerName: `%${filterDto.customerName}%`,
                });
            }
            if (filterDto.userName) {
                query.andWhere('contracts.userName ILIKE :userName', {
                    userName: `%${filterDto.userName}%`,
                });
            }
            if (filterDto.startDate) {
                query.andWhere('contracts.dateStart >=  :startDate', {
                    startDate: filterDto.startDate,
                });
            }
            if (filterDto.endDate) {
                query.andWhere('contracts.dateStart <= :endDate', {
                    endDate: filterDto.endDate,
                });
            }
            if (filterDto.startDeadline) {
                query.andWhere('contracts.deadline >= :startDeadline', {
                    startDeadline: filterDto.startDeadline,
                });
            }
            if (filterDto.endDeadline) {
                query.andWhere('contracts.deadline <= :endDeadline', {
                    endDeadline: filterDto.endDeadline,
                });
            }
            if (filterDto.minTotal) {
                query.andWhere('contracts.total >= :minTotal', {
                    minTotal: filterDto.minTotal,
                });
            }
            if (filterDto.maxTotal) {
                query.andWhere('contracts.total <=> :maxTotal', {
                    maxTotal: filterDto.maxTotal,
                });
            }
            const totalRows = yield query.getCount();
            const skip = (filterDto.page - 1) * filterDto.pageSize;
            query.skip(skip).take(filterDto.pageSize);
            const contracts = yield query.getMany();
            return result_list_model_1.ResultListModel.success(contracts, totalRows, 'Filtered contracts!');
        });
    }
    deactivate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var contract = yield this.contractRepository.findOne({
                where: { id: id, isActive: true },
            });
            if (contract) {
                contract.isActive = false;
                yield this.contractRepository.save(contract);
            }
            return result_model_1.ResultModel.success(true, null);
        });
    }
    update(id, updateContractDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield this.contractRepository.findOneBy({ id });
            const contractNumber = updateContractDto.contractNumber;
            if (!contract) {
                return result_model_1.ResultModel.fail('Contract not found', 'Contract not found');
            }
            if (contract.contractNumber == contractNumber) {
                delete updateContractDto.contractNumber;
            }
            else if (yield this.contractRepository.findOneBy({ contractNumber })) {
                return result_model_1.ResultModel.fail('contractNumber existed', 'contractNumber existed');
            }
            this.contractItemService.deleteByContractId(contract.id);
            const updatedContract = yield this.contractRepository.save(Object.assign(Object.assign({}, contract), updateContractDto));
            return result_model_1.ResultModel.success(updatedContract, 'Update contract successful!');
        });
    }
    getContractById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield this.contractRepository.findOneBy({ id });
            if (contract) {
                return result_model_1.ResultModel.success(contract, 'Get contract successful!');
            }
            return result_model_1.ResultModel.fail('', 'Get contract failed!');
        });
    }
};
exports.ContractService = ContractService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => contract_item_service_1.ContractItemService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        contract_item_service_1.ContractItemService])
], ContractService);
//# sourceMappingURL=contract.service.js.map