import { BaseEntity } from "typeorm";
import { Contract } from '../contract/contract.entity';
export declare class ContractDetail extends BaseEntity {
    id: string;
    contract_id: Contract;
    product_id: string;
    quantity: number;
}
