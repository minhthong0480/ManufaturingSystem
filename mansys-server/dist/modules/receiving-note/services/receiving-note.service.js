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
exports.ReceivingNoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const receiving_note_entity_1 = require("../entities/receiving-note.entity");
const typeorm_2 = require("typeorm");
const suppliers_service_1 = require("../../suppliers/services/suppliers.service");
const result_model_1 = require("../../../common/result-model");
const result_list_model_1 = require("../../../common/result-list-model");
let ReceivingNoteService = exports.ReceivingNoteService = class ReceivingNoteService {
    constructor(receivingNoteRepository, supplierService) {
        this.receivingNoteRepository = receivingNoteRepository;
        this.supplierService = supplierService;
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield this.supplierService.getOneById(dto.supplierId);
            if (!supplier) {
                return result_model_1.ResultModel.fail('', 'Supplier not found!');
            }
            const receivingNote = yield this.receivingNoteRepository.save(dto);
            if (!receivingNote) {
                return result_model_1.ResultModel.fail('', 'Create Receiving Note failed!');
            }
            return result_model_1.ResultModel.success(receivingNote, 'Create Receiving Note successful!');
        });
    }
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.receivingNoteRepository.findOneBy({ id });
        });
    }
    filter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.receivingNoteRepository
                .createQueryBuilder('receiving-notes')
                .leftJoinAndSelect('receiving-notes.receivingNoteItems', 'receiving-note-items');
            const page = parseInt(filter.page) || 1;
            const limit = parseInt(filter.pageSize) || 10;
            if (filter.supplierId) {
                query.andWhere('receiving-notes.supplierId = :supplierId', {
                    supplierId: filter.supplierId,
                });
            }
            if (filter.productId) {
                query.andWhere('receiving-note-items.productId = :productId', {
                    productId: filter.productId,
                });
            }
            if (filter.receivedBy) {
                query.andWhere('receiving-notes.receivedBy like :receivedBy', {
                    receivedBy: '%' + filter.receivedBy + '%',
                });
            }
            if (filter.purchaseOrder) {
                query.andWhere('receiving-notes.purchaseOrder like :purchaseOrder', {
                    purchaseOrder: '%' + filter.purchaseOrder + '%',
                });
            }
            if (filter.receiptDateFrom) {
                query.andWhere('receiving-notes.receiptDate >= :receiptDateFrom', {
                    receiptDateFrom: '%' + filter.receiptDateFrom + '%',
                });
            }
            if (filter.receiptDateTo) {
                query.andWhere('receiving-notes.receiptDate <= :receiptDateTo', {
                    receiptDateTo: '%' + filter.receiptDateTo + '%',
                });
            }
            const totalRows = yield query.getCount();
            const skip = (page - 1) * limit;
            query.offset(skip).limit(limit);
            const receivingNotes = yield query.getMany();
            return result_list_model_1.ResultListModel.success(receivingNotes, totalRows, 'Filter receivingNote successful!');
        });
    }
};
exports.ReceivingNoteService = ReceivingNoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(receiving_note_entity_1.ReceivingNote)),
    __param(1, (0, common_1.Inject)(suppliers_service_1.SupplierService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        suppliers_service_1.SupplierService])
], ReceivingNoteService);
//# sourceMappingURL=receiving-note.service.js.map