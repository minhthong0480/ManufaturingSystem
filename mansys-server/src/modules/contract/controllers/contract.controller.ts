import { Body, Controller, Post, Get , Query} from "@nestjs/common";
import { CreateContractDto } from "../dtos/create-contract.dto";
import { ContractService } from "../services/contract.service";
import { ApiBearerAuth, ApiTags, ApiQuery, ApiOkResponse } from "@nestjs/swagger";
import { ContractFilterDTO } from "../dtos/filter-contract.dto";
import { Contract } from "../entities/contract.entity";
import { ResultListModel } from "src/common/result-list-model";

@ApiTags('contract')
@ApiBearerAuth()
@Controller('contract')
export class ContractController {

    constructor(
        private readonly contractService: ContractService,
    ) { }

    @Post()
    async create(@Body() createContractDto: CreateContractDto) {
        return await this.contractService.create(createContractDto);
    }


    @Get()
    async filterContracts(@Query() filterDto: ContractFilterDTO){
        return await this.contractService.filter(filterDto);
    }
}