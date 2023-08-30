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
exports.ReceivingNote = void 0;
const typeorm_1 = require("typeorm");
const suppliers_entity_1 = require("../../suppliers/entities/suppliers.entity");
const receiving_note_item_entity_1 = require("./receiving-note-item.entity");
let ReceivingNote = exports.ReceivingNote = class ReceivingNote {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReceivingNote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReceivingNote.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_entity_1.Supplier, (supplier) => supplier.receivingNotes),
    __metadata("design:type", suppliers_entity_1.Supplier)
], ReceivingNote.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => receiving_note_item_entity_1.ReceivingNoteItem, (receivingNoteItem) => receivingNoteItem.receivingNote),
    __metadata("design:type", Array)
], ReceivingNote.prototype, "receivingNoteItems", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Date)
], ReceivingNote.prototype, "receiptDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], ReceivingNote.prototype, "purchaseOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], ReceivingNote.prototype, "receivedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ReceivingNote.prototype, "remarks", void 0);
exports.ReceivingNote = ReceivingNote = __decorate([
    (0, typeorm_1.Entity)('receiving_notes')
], ReceivingNote);
//# sourceMappingURL=receiving-note.entity.js.map