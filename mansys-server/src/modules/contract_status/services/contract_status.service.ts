import { Injectable } from "@nestjs/common";
import { ContractStatus } from "../entities/contract_status.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateContractStatusDto } from "../dtos/create_contract_status.dto";

@Injectable()
export class ContractStatusService {
    constructor (
        @InjectRepository(ContractStatus)
        private ContractStatusRepo: Repository<ContractStatus>
    ) {}

    async create(CreateContractStatusDto: CreateContractStatusDto) {
        const constat = this.ContractStatusRepo.create(CreateContractStatusDto)
        return await this.ContractStatusRepo.save(constat)
    }

    async getAll(): Promise<ContractStatus[]>{
        return this.ContractStatusRepo.find();
    }

    async delete(id: number) {
        const delmat = await this.ContractStatusRepo.findOneBy({id})
        return await this.ContractStatusRepo.remove(delmat)
    }

}