import { ReceivingNote } from '../entities/receiving-note.entity';
import { Repository } from 'typeorm';
import { CreateReceivingNoteDto } from '../dto/create-receiving-note.dto';
import { SupplierService } from 'src/modules/suppliers/services/suppliers.service';
import { ResultModel } from 'src/common/result-model';
import { FilterReceivingNoteDto } from '../dto/filter-receiving-note.dto';
import { ResultListModel } from 'src/common/result-list-model';
export declare class ReceivingNoteService {
    private readonly receivingNoteRepository;
    private readonly supplierService;
    constructor(receivingNoteRepository: Repository<ReceivingNote>, supplierService: SupplierService);
    create(dto: CreateReceivingNoteDto): Promise<ResultModel<string> | ResultModel<CreateReceivingNoteDto & ReceivingNote>>;
    getOneById(id: number): Promise<ReceivingNote>;
    filter(filter: FilterReceivingNoteDto): Promise<ResultListModel<ReceivingNote>>;
}
