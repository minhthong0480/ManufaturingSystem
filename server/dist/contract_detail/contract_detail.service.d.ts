import { ContractDetail } from './contract_detail.entity';
import { Repository } from 'typeorm';
import { Contract } from 'src/contract/contract.entity';
export declare class ContractDetailService {
    private contract_detail;
    private contract;
    constructor(contract_detail: Repository<ContractDetail>, contract: Repository<Contract>);
    getAllContractDetail(): Promise<ContractDetail[]>;
    deleteContractDetailById(id: number): Promise<void>;
    getDetailById(id: number): Promise<ContractDetail>;
    createContractDetail(id: number, contract_id: string, product_id: string, quantity: number): Promise<ContractDetail>;
}
