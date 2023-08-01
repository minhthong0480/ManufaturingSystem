import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContractService } from './contract.service';

@Controller('contract')
export class ContractController {
    constructor(private contractService: ContractService) {}

    @Post()
    createContract(@Body('name') name: string) {
        return this.contractService.create(name);
    }

    @Get('/:id')
    getContract(@Param('id') id: string) {
        return this.contractService.getOne(parseInt(id));
    }

    @Delete('/:id')
    deleteContract(@Param('id') id: string) {
        return this.contractService.delete(parseInt(id));
    }
}
