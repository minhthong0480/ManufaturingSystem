import { Contract } from './contract.entity';
import { ContractService } from './contract.service';
export declare class ContractController {
    private contractService;
    constructor(contractService: ContractService);
    getContract(): Promise<Contract[]>;
    getContractById(id: string): Promise<Contract>;
    createContract(id: string): Promise<Contract>;
    deleteContract(id: string): Promise<void>;
}
