/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ContractDetailService } from './contract_detail.service';
import { ContractDetail } from './contract_detail.entity';

@Controller('contract-detail')
export class ContractDetailController {
    constructor( private contractDetailService: ContractDetailService){}

    @Get()
    getAll(): Promise<ContractDetail[]>{
        return this.contractDetailService.getAllContractDetail()
    }

    

    @Post()
    createATaskDetail(
        @Body('id') id: number,
        @Body('contract_id') contract_id:string,
        @Body('product_id') product_id: string,
        @Body('quantity', ParseIntPipe) quantity: number
    ): Promise<ContractDetail>{
        return this.contractDetailService.createContractDetail(id, contract_id, product_id, quantity)
    }
    @Get('/:id')
    getById( @Param('id') id: number): Promise<ContractDetail>{
        return this.contractDetailService.getDetailById(id)
    }
    

    @Delete('/:id')
    deleteById(@Param('id') id: number): Promise<void>{
        return this.contractDetailService.deleteContractDetailById(id)
    }
}
