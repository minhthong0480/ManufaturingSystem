import { Body, Controller, Get, Post, Patch, Delete, Query, Param, Put} from "@nestjs/common";
import { ContractStatusService } from "../services/contract_status.service";
import { CreateContractStatusDto } from "../dtos/create_contract_status.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('contract_status')
@ApiBearerAuth()
@Controller('contract_status')
export class ContractStatusController {
    constructor (
        private ContractStatusService: ContractStatusService
    ) {}

    @Post()
    async create(@Body() CreateContractStatusDto: CreateContractStatusDto){
        return this.ContractStatusService.create(CreateContractStatusDto)
    }

    @Get()
    async getAll(@Query('name') name:string) {
        return this.ContractStatusService.getAll()
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
     return  this.ContractStatusService.delete(id);
    }

}