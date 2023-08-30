import { Contract } from './contract.entity';
export declare class ContractItem {
    contractId: number;
    productId: number;
    contract: Contract;
    quanity: number;
    isActive: boolean;
    createdAt: Date;
}
