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
exports.DeliveryNoteSerive = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const delivery_note_entity_1 = require("../entities/delivery-note.entity");
const typeorm_2 = require("typeorm");
const result_model_1 = require("../../../common/result-model");
const customers_service_1 = require("../../customers/sevices/customers.service");
const result_list_model_1 = require("../../../common/result-list-model");
let DeliveryNoteSerive = exports.DeliveryNoteSerive = class DeliveryNoteSerive {
    constructor(deliveryNoteRepository, customerService) {
        this.deliveryNoteRepository = deliveryNoteRepository;
        this.customerService = customerService;
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne(dto.customerId);
            if (!customer) {
                return result_model_1.ResultModel.fail(dto, 'Customer is not existed!');
            }
            const deliveryNote = yield this.deliveryNoteRepository.save(dto);
            if (!deliveryNote) {
                return result_model_1.ResultModel.fail(deliveryNote, 'Create Delivery Note Failed');
            }
            return result_model_1.ResultModel.success(deliveryNote, 'Delivery Note create successful!');
        });
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.deliveryNoteRepository.findOneBy({ id });
        });
    }
    filter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.deliveryNoteRepository
                .createQueryBuilder('delivery-notes')
                .leftJoinAndSelect('delivery-notes.deliveryNoteItems', 'delivery-note-items');
            const page = parseInt(filter.page) || 1;
            const limit = parseInt(filter.pageSize) || 10;
            if (filter.customerId) {
                query.andWhere('delivery-notes.customerId = :customerId', {
                    customerId: filter.customerId,
                });
            }
            if (filter.productId) {
                query.andWhere('delivery-note-items.productId = :productId', {
                    productId: filter.productId,
                });
            }
            if (filter.deliveryBy) {
                query.andWhere('delivery-notes.deliveryBy like :deliveryBy', {
                    deliveryBy: '%' + filter.deliveryBy + '%',
                });
            }
            if (filter.salesOrder) {
                query.andWhere('delivery-notes.salesOrder like :salesOrder', {
                    salesOrder: '%' + filter.salesOrder + '%',
                });
            }
            if (filter.deliveryDateFrom) {
                query.andWhere('delivery-notes.deliveryDate >= :deliveryDateFrom', {
                    deliveryDateFrom: '%' + filter.deliveryDateFrom + '%',
                });
            }
            if (filter.deliveryDateTo) {
                query.andWhere('delivery-notes.deliveryDate <= :deliveryDateTo', {
                    deliveryDateTo: '%' + filter.deliveryDateTo + '%',
                });
            }
            const totalRows = yield query.getCount();
            const skip = (page - 1) * limit;
            query.offset(skip).limit(limit);
            const deliveryNotes = yield query.getMany();
            return result_list_model_1.ResultListModel.success(deliveryNotes, totalRows, 'Filter deliveryNotes successful!');
        });
    }
};
exports.DeliveryNoteSerive = DeliveryNoteSerive = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(delivery_note_entity_1.DeliveryNote)),
    __param(1, (0, common_1.Inject)(customers_service_1.CustomersService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        customers_service_1.CustomersService])
], DeliveryNoteSerive);
//# sourceMappingURL=delivery-note.service.js.map