import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from "./create-contract.dto";

OmitType(CreateContractDto, [])
export class UpdateContactDto extends PartialType(CreateContractDto
) { } 