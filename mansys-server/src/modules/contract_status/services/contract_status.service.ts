import { Injectable } from "@nestjs/common";
import { ContractStatus } from "../entities/contract_status.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateContractStatusDto } from "../dtos/create_contract_status.dto";
import { ResultModel } from '../../../common/result-model'
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

    async getAll(): Promise<ResultModel<ContractStatus[]>>{
        const result = await this.ContractStatusRepo.find()
        return ResultModel.success(result, null);
    }

    async delete(id: number) {
        const delmat = await this.ContractStatusRepo.findOneBy({id})
        return await this.ContractStatusRepo.remove(delmat)
    }

}