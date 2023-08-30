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
exports.ContractItemService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const contract_item_entity_1 = require("../entities/contract-item.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const result_model_1 = require("../../../common/result-model");
const products_service_1 = require("../../products/services/products.service");
const contract_service_1 = require("./contract.service");
let ContractItemService = exports.ContractItemService = class ContractItemService {
    constructor(contractItemRepository, productService, contractService) {
        this.contractItemRepository = contractItemRepository;
        this.productService = productService;
        this.contractService = contractService;
    }
    deleteByContractId(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contratItems = yield this.contractItemRepository.findBy({
                contractId,
            });
            yield this.contractItemRepository.remove(contratItems);
            return result_model_1.ResultModel.success(true, 'Delete successful!');
        });
    }
    deleteById(contractId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contratItems = yield this.contractItemRepository.findBy({
                contractId,
                productId,
            });
            yield this.contractItemRepository.remove(contratItems);
            return result_model_1.ResultModel.success(true, 'Delete successful!');
        });
    }
    save(createContractItemDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractId = createContractItemDto.contractId;
            const productId = createContractItemDto.productId;
            const contract = yield this.contractService.getContractById(contractId);
            const product = yield this.productService.getProductById(productId);
            if (!product.isSuccess || !contract.isSuccess) {
                return result_model_1.ResultModel.fail("", "Product or Contract not found!");
            }
            let contractItem = yield this.contractItemRepository.findOneBy({
                contractId,
                productId,
            });
            if (contractItem) {
                contractItem.quanity += createContractItemDto.quantity;
                contractItem = yield this.contractItemRepository.save(contractItem);
            }
            else {
                contractItem = yield this.contractItemRepository.save(createContractItemDto);
            }
            return result_model_1.ResultModel.success(contractItem, 'Create contract-item successful!');
        });
    }
};
exports.ContractItemService = ContractItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contract_item_entity_1.ContractItem)),
    __param(1, (0, common_1.Inject)(products_service_1.ProductsService)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => contract_service_1.ContractService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService,
        contract_service_1.ContractService])
], ContractItemService);
//# sourceMappingURL=contract-item.service.js.map