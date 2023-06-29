/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ContractDetail } from './contract_detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from 'src/contract/contract.entity';


@Injectable()
export class ContractDetailService {
    constructor(
        @InjectRepository(ContractDetail)
        private contract_detail: Repository<ContractDetail>,

        @InjectRepository(Contract)
        private contract: Repository<Contract>,
    ){}
    
    async getAllContractDetail(): Promise<ContractDetail[]>{
        const result = await this.contract_detail.find()
      
        
        return result
    }

    async deleteContractDetailById(id: number): Promise<void>{
        const found = await this.getDetailById(id) 
        const result = await this.contract_detail.delete(id)
        
        const contractResult = await this.contract.delete(found['contract_id']['id'])
        if(result.affected === 0 || contractResult.affected === 0){
            throw new NotFoundException(`Cannot find contracts with the given ID: ${id}`)
        }
        
    }

    async getDetailById (id: number): Promise<ContractDetail>{
        const found = await this.contract_detail.findOneBy({id: id})
        console.log(found['contract_id']['id']);
        

        if(!found){
            throw new  NotFoundException(`Cannot find contracts with the given ID: ${id}`)
        }
        return found
    }
    async createContractDetail(
        id: number, 
        contract_id: string, 
        product_id: string, 
        quantity: number): Promise<ContractDetail>{
            
            const contractInfo = new Contract
            contractInfo.id = contract_id
            await contractInfo.save()

            const contractDetail = new ContractDetail
            contractDetail.id = id;
            contractDetail.contract_id= contractInfo
            contractDetail.product_id = product_id
            contractDetail.quantity = quantity
            
            await contractDetail.save()
            return contractDetail
    }

}
