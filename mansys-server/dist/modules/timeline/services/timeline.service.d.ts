import { Repository } from 'typeorm';
import { Timeline } from '../entities/timeline.entity';
import { CreateTimelineDto } from '../dtos/create-timeline.dto';
import { UpdateTimelineDto } from '../dtos/update-timeline.dto';
export declare class TimelinesService {
    private repo;
    constructor(repo: Repository<Timeline>);
    findAll(): Promise<Timeline[]>;
    findOne(id: number): Promise<Timeline>;
    findByContractId(contractId: number): Promise<Timeline[]>;
    create(timeline: CreateTimelineDto): Promise<{
        success: boolean;
        message: string;
        data: Timeline;
    }>;
    update(id: number, timeline: UpdateTimelineDto): Promise<Timeline>;
    remove(id: number): Promise<Timeline>;
}
