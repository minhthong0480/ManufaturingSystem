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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const customers_entity_1 = require("../entities/customers.entity");
const result_model_1 = require("../../../common/result-model");
let CustomersService = exports.CustomersService = class CustomersService {
    constructor(repo) {
        this.repo = repo;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.repo.findOneBy({ id });
            if (!customer) {
                throw new common_1.NotFoundException('Customer not found');
            }
            return customer;
        });
    }
    createCustomer(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = this.repo.create(body);
            return yield this.repo.save(customer);
        });
    }
    updateCustomer(id, attrs) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.findOne(id);
            if (!customer) {
                throw new common_1.NotFoundException('Customer not found');
            }
            Object.assign(customer, attrs);
            return yield this.repo.save(customer);
        });
    }
    deactiveCustomer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.findOne(id);
            if (!customer) {
                throw new common_1.NotFoundException('Customer not found');
            }
            customer.isActive = false;
            yield this.repo.save(customer);
            return result_model_1.ResultModel.success(customer, 'Deactive customer successfully');
        });
    }
};
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(customers_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map