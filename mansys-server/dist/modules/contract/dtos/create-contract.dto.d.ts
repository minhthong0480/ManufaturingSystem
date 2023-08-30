import { ContractItem } from '../entities/contract-item.entity';
export declare class CreateContractDto {
    contractNumber: string;
    customerId: number;
    userId: number;
    dateStart: Date;
    deadline: Date;
    total: number;
    contractItems: ContractItem[];
    isActive: boolean;
}
