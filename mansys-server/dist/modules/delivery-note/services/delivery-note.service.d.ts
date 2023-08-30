import { CreateDeliveryNoteDto } from '../dto/create-delivery-note.dto';
import { DeliveryNote } from '../entities/delivery-note.entity';
import { Repository } from 'typeorm';
import { ResultModel } from 'src/common/result-model';
import { CustomersService } from 'src/modules/customers/sevices/customers.service';
import { FilterDeliveryNoteDto } from '../dto/filter-delivery-note.dto';
import { ResultListModel } from 'src/common/result-list-model';
export declare class DeliveryNoteSerive {
    private readonly deliveryNoteRepository;
    private readonly customerService;
    constructor(deliveryNoteRepository: Repository<DeliveryNote>, customerService: CustomersService);
    create(dto: CreateDeliveryNoteDto): Promise<ResultModel<CreateDeliveryNoteDto>>;
    findOneById(id: number): Promise<DeliveryNote>;
    filter(filter: FilterDeliveryNoteDto): Promise<ResultListModel<DeliveryNote>>;
}
