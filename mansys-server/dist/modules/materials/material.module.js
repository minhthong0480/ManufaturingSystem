"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialModule = void 0;
const common_1 = require("@nestjs/common");
const material_service_1 = require("./services/material.service");
const material_controller_1 = require("./controller/material.controller");
const material_entity_1 = require("./entities/material.entity");
const typeorm_1 = require("@nestjs/typeorm");
let MaterialModule = exports.MaterialModule = class MaterialModule {
};
exports.MaterialModule = MaterialModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([material_entity_1.Material])],
        providers: [material_service_1.MaterialService],
        controllers: [material_controller_1.MaterialController]
    })
], MaterialModule);
//# sourceMappingURL=material.module.js.map