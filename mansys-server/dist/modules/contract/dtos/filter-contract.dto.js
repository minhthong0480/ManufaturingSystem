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
exports.ContractFilterDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const pagination_request_model_1 = require("../../../common/pagination-request-model");
class ContractFilterDTO extends pagination_request_model_1.PaginationRequestModel {
}
exports.ContractFilterDTO = ContractFilterDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractFilterDTO.prototype, "contractNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractFilterDTO.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractFilterDTO.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ContractFilterDTO.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ContractFilterDTO.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ContractFilterDTO.prototype, "startDeadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ContractFilterDTO.prototype, "endDeadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], ContractFilterDTO.prototype, "minTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], ContractFilterDTO.prototype, "maxTotal", void 0);
//# sourceMappingURL=filter-contract.dto.js.map