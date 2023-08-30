import { Timeline } from '../../timeline/entities/timeline.entity';
export declare class ContractStatus {
    id: number;
    name: string;
    description: string;
    previous_stage_ids: string;
    next_stage_ids: string;
    timeline: Timeline[];
}
