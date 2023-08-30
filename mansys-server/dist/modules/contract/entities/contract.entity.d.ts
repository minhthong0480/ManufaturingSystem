import { ContractItem } from './contract-item.entity';
import { Timeline } from '../../timeline/entities/timeline.entity';
export declare class Contract {
    id: number;
    contractNumber: string;
    customerId: number;
    userId: number;
    dateStart: Date;
    deadline: Date;
    total: number;
    contractItems: ContractItem[];
    timeline: Timeline[];
    isActive: boolean;
}
