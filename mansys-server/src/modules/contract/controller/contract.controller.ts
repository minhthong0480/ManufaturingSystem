import { Body, Controller, Post } from "@nestjs/common";
import { CreateContractDto } from "../dtos/create-contract.dto";
import { ContractService } from "../services/contract.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('contract')
@ApiBearerAuth()
@Controller('contract')
export class ContractController {

    constructor(
        private readonly contractService: ContractService,
    ) { }

    @Post()
    create(@Body() createContractDto: CreateContractDto) {
        return this.contractService.create(createContractDto);
    }
}