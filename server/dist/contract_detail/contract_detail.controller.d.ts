import { ContractDetailService } from './contract_detail.service';
import { ContractDetail } from './contract_detail.entity';
export declare class ContractDetailController {
    private contractDetailService;
    constructor(contractDetailService: ContractDetailService);
    getAll(): Promise<ContractDetail[]>;
    createATaskDetail(id: number, contract_id: string, product_id: string, quantity: number): Promise<ContractDetail>;
    getById(id: number): Promise<ContractDetail>;
    deleteById(id: number): Promise<void>;
}
