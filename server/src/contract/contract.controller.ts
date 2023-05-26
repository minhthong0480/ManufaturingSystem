/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Contract } from './contract.entity';
import { ContractService } from './contract.service';

@Controller('contract')
export class ContractController {
    constructor(
        private contractService : ContractService
    ){}
    
    @Get()
    getContract(): Promise<Contract[]>{
        return this.contractService.getAllContracts();
    }
    
    @Get('/:id')
    getContractById( @Param('id') id: string): Promise<Contract>{
        return this.contractService.getContractById(id)
    }


    @Post()
    createContract(
        @Body('id') id: string) : Promise<Contract> {
        return this.contractService.createContract(id)
    }

    @Delete('/:id')
    deleteContract(@Param('id') id: string): Promise<void>{
        return this.contractService.deleteContractById(id)
    }
}
