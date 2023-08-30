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
exports.ReceivingNoteController = void 0;
const common_1 = require("@nestjs/common");
const receiving_note_service_1 = require("../services/receiving-note.service");
const create_receiving_note_dto_1 = require("../dto/create-receiving-note.dto");
const filter_receiving_note_dto_1 = require("../dto/filter-receiving-note.dto");
let ReceivingNoteController = exports.ReceivingNoteController = class ReceivingNoteController {
    constructor(receivingNoteService) {
        this.receivingNoteService = receivingNoteService;
    }
    create(dto) {
        return this.receivingNoteService.create(dto);
    }
    filter(dto) {
        return this.receivingNoteService.filter(dto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_receiving_note_dto_1.CreateReceivingNoteDto]),
    __metadata("design:returntype", void 0)
], ReceivingNoteController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_receiving_note_dto_1.FilterReceivingNoteDto]),
    __metadata("design:returntype", void 0)
], ReceivingNoteController.prototype, "filter", null);
exports.ReceivingNoteController = ReceivingNoteController = __decorate([
    (0, common_1.Controller)('receiving-notes'),
    __metadata("design:paramtypes", [receiving_note_service_1.ReceivingNoteService])
], ReceivingNoteController);
//# sourceMappingURL=receiving-note.controller.js.map