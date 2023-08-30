"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContactDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_contract_dto_1 = require("./create-contract.dto");
(0, mapped_types_1.OmitType)(create_contract_dto_1.CreateContractDto, []);
class UpdateContactDto extends (0, mapped_types_1.PartialType)(create_contract_dto_1.CreateContractDto) {
}
exports.UpdateContactDto = UpdateContactDto;
//# sourceMappingURL=update-contract.dto.js.map