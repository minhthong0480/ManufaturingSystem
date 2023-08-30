import { ContractStatus } from "../entities/contract_status.entity";
import { Repository } from "typeorm";
import { CreateContractStatusDto } from "../dtos/create_contract_status.dto";
export declare class ContractStatusService {
    private ContractStatusRepo;
    constructor(ContractStatusRepo: Repository<ContractStatus>);
    create(CreateContractStatusDto: CreateContractStatusDto): Promise<ContractStatus>;
    getAll(): Promise<ContractStatus[]>;
    delete(id: number): Promise<ContractStatus>;
}
