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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivingNoteItem = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../products/entities/product.entity");
const receiving_note_entity_1 = require("./receiving-note.entity");
let ReceivingNoteItem = exports.ReceivingNoteItem = class ReceivingNoteItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReceivingNoteItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReceivingNoteItem.prototype, "receivingNoteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => receiving_note_entity_1.ReceivingNote, (receivingNote) => receivingNote.receivingNoteItems),
    __metadata("design:type", receiving_note_entity_1.ReceivingNote)
], ReceivingNoteItem.prototype, "receivingNote", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReceivingNoteItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.receivingNoteItems),
    __metadata("design:type", product_entity_1.Product)
], ReceivingNoteItem.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], ReceivingNoteItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], ReceivingNoteItem.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], ReceivingNoteItem.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ReceivingNoteItem.prototype, "remarks", void 0);
exports.ReceivingNoteItem = ReceivingNoteItem = __decorate([
    (0, typeorm_1.Entity)('receiving_note_items')
], ReceivingNoteItem);
//# sourceMappingURL=receiving-note-item.entity.js.map