import { Body, Controller, Post, Get, Query, Delete, ParseIntPipe, Param, Patch } from "@nestjs/common";
import { CreateContractDto } from "../dtos/create-contract.dto";
import { ContractService } from "../services/contract.service";
import { ApiBearerAuth, ApiTags, ApiParam } from "@nestjs/swagger";
import { ContractFilterDTO } from "../dtos/filter-contract.dto";
import { UpdateContactDto } from "../dtos/update-contract.dto";
import { PaginationRequestModel } from "../../../common/pagination-request-model";
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

    @Get(':id')
    get(@Param('id', ParseIntPipe) id) {
        return this.contractService.getContractById(id);
    }

    @Get('/r/filter')
    filterContracts(@Query() filterDto: ContractFilterDTO) {
        PaginationRequestModel.applyDefaultPaginationSetting(filterDto);
        return this.contractService.filter(filterDto);
    }

    @Patch(':id')
    updateContact(@Param('id', ParseIntPipe) id, @Body() updateContactDto: UpdateContactDto) {
        return this.contractService.update(id, updateContactDto);
    }

    @Delete(':id')
    @ApiParam({ name: "id", required: true })
    deactivate(@Param('id', ParseIntPipe) id) {
        return this.contractService.deactivate(id);
    }
}