/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { ContractDetailService } from 'src/contract_detail/contract_detail.service';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private contractRepository: Repository<Contract>
    ){}
    async getAllContracts (): Promise<Contract[]> {
        const result = await this.contractRepository.find()
        return result
    }
    async createContract(id: string) : Promise<Contract> {
        const contract = new Contract;
        contract.id = id;
        await contract.save();
        return contract
    }

    async getContractById(id: string): Promise<Contract> {
        const found = await this.contractRepository.findOneBy({id: id})
        if(!found){
            throw new NotFoundException(`Cannot find contracts with the given ID: ${id}`)
        }
        return found
    }

    async deleteContractById(id: string): Promise<void>{
        const result = await this.contractRepository.delete(id)
        if (result.affected === 0){
            throw new NotFoundException(`Cannot find contracts with the given ID: ${id}`)
        }
    }

}
