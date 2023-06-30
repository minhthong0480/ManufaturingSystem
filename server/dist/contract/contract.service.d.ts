import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
export declare class ContractService {
    private contractRepository;
    constructor(contractRepository: Repository<Contract>);
    getAllContracts(): Promise<Contract[]>;
    createContract(id: string): Promise<Contract>;
    getContractById(id: string): Promise<Contract>;
    deleteContractById(id: string): Promise<void>;
}
