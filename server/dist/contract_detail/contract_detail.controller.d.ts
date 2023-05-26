import { ContractDetailService } from './contract_detail.service';
import { ContractDetail } from './contract_detail.entity';
export declare class ContractDetailController {
    private contractDetailService;
    constructor(contractDetailService: ContractDetailService);
    getById(id: string): Promise<ContractDetail>;
    getAll(): Promise<ContractDetail[]>;
    deleteById(id: string): Promise<void>;
    createATaskDetail(id: string, contract_id: string, product_id: string, quantity: number): Promise<ContractDetail>;
}
