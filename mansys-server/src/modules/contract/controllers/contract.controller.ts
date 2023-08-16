import { Body, Controller, Post, Get , Query, Delete, ParseIntPipe, Param} from "@nestjs/common";
import { CreateContractDto } from "../dtos/create-contract.dto";
import { ContractService } from "../services/contract.service";
import { ApiBearerAuth, ApiTags, ApiParam } from "@nestjs/swagger";
import { ContractFilterDTO } from "../dtos/filter-contract.dto";

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
        filterDto.applyDefaultPaginationSetting();
        return await this.contractService.filter(filterDto);
    }

    @Delete(':id')
    @ApiParam({name : "id", required: true})
    async deactivate(@Param('id', ParseIntPipe) id){
        return await this.contractService.deactivate(id);
    }
}