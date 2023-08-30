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
exports.Material = void 0;
const typeorm_1 = require("typeorm");
const billOfMaterial_entity_1 = require("../../billOfMaterial/entities/billOfMaterial.entity");
let Material = exports.Material = class Material {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Material.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true,
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Material.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], Material.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'decimal'
    }),
    __metadata("design:type", Number)
], Material.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Material.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'int'
    }),
    __metadata("design:type", Number)
], Material.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false,
        default: new Date(),
    }),
    __metadata("design:type", Date)
], Material.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => billOfMaterial_entity_1.BillOfMaterial, billOfMaterial => billOfMaterial.material),
    __metadata("design:type", Array)
], Material.prototype, "billOfMaterials", void 0);
exports.Material = Material = __decorate([
    (0, typeorm_1.Entity)('material')
], Material);
//# sourceMappingURL=material.entity.js.map