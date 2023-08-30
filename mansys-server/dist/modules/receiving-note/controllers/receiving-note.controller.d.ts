import { ReceivingNoteService } from '../services/receiving-note.service';
import { CreateReceivingNoteDto } from '../dto/create-receiving-note.dto';
import { FilterReceivingNoteDto } from '../dto/filter-receiving-note.dto';
export declare class ReceivingNoteController {
    private receivingNoteService;
    constructor(receivingNoteService: ReceivingNoteService);
    create(dto: CreateReceivingNoteDto): Promise<import("../../../common/result-model").ResultModel<string> | import("../../../common/result-model").ResultModel<CreateReceivingNoteDto & import("../entities/receiving-note.entity").ReceivingNote>>;
    filter(dto: FilterReceivingNoteDto): Promise<import("../../../common/result-list-model").ResultListModel<import("../entities/receiving-note.entity").ReceivingNote>>;
}
