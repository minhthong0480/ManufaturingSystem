import { CreateTimelineDto } from '../dtos/create-timeline.dto';
import { TimelinesService } from '../services/timeline.service';
import { UpdateTimelineDto } from '../dtos/update-timeline.dto';
export declare class TimelinesController {
    private timelinesService;
    constructor(timelinesService: TimelinesService);
    findAll(): Promise<import("../entities/timeline.entity").Timeline[]>;
    findOne(id: string): Promise<import("../entities/timeline.entity").Timeline>;
    findByContractId(contractId: string): Promise<import("../entities/timeline.entity").Timeline[]>;
    create(timeline: CreateTimelineDto): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/timeline.entity").Timeline;
    }>;
    update(id: string, timeline: UpdateTimelineDto): Promise<import("../entities/timeline.entity").Timeline>;
    remove(id: string): Promise<import("../entities/timeline.entity").Timeline>;
}
