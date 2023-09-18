import { Inject, Injectable } from '@nestjs/common';
import { CreateDeliveryNoteDto } from '../dto/create-delivery-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryNote } from '../entities/delivery-note.entity';
import { Repository } from 'typeorm';
import { ResultModel } from 'src/common/result-model';
import { CustomersService } from 'src/modules/customers/sevices/customers.service';
import { FilterDeliveryNoteDto } from '../dto/filter-delivery-note.dto';
import { ResultListModel } from 'src/common/result-list-model';

@Injectable()
export class DeliveryNoteSerive {
  constructor(
    @InjectRepository(DeliveryNote)
    private readonly deliveryNoteRepository: Repository<DeliveryNote>,

    @Inject(CustomersService)
    private readonly customerService: CustomersService,
  ) {}

  async get (id: number) {
    const deliveryNote = await this.deliveryNoteRepository.findOneBy({id});
    if (!deliveryNote) {
      return ResultModel.fail({}, "Failed!");
    }
    return ResultModel.success(deliveryNote, "Success!!!");
  }

  async create(dto: CreateDeliveryNoteDto) {
    const customer = await this.customerService.findOne(dto.customerId);
    if (!customer) {
      return ResultModel.fail(dto, 'Customer is not existed!');
    }

    const deliveryNote = await this.deliveryNoteRepository.save(dto);
    if (!deliveryNote) {
      return ResultModel.fail(deliveryNote, 'Create Delivery Note Failed');
    }

    return ResultModel.success(
      deliveryNote,
      'Delivery Note create successful!',
    );
  }

  async findOneById(id: number) {
    return await this.deliveryNoteRepository.findOneBy({ id });
  }

  async filter(filter: FilterDeliveryNoteDto) {
    const query = this.deliveryNoteRepository
      .createQueryBuilder('delivery-notes')
      .leftJoinAndSelect(
        'delivery-notes.deliveryNoteItems',
        'delivery-note-items',
      );
    const page = parseInt(filter.page as any) || 1;
    const limit = parseInt(filter.pageSize as any) || 10;

    if (filter.customerId) {
      query.andWhere('delivery-notes.customerId = :customerId', {
        customerId: filter.customerId,
      });
    }

    if (filter.productId) {
      query.andWhere('delivery-note-items.productId = :productId', {
        productId: filter.productId,
      });
    }

    if (filter.deliveryBy) {
      query.andWhere('delivery-notes.deliveryBy like :deliveryBy', {
        deliveryBy: '%' + filter.deliveryBy + '%',
      });
    }

    if (filter.salesOrder) {
      query.andWhere('delivery-notes.salesOrder like :salesOrder', {
        salesOrder: '%' + filter.salesOrder + '%',
      });
    }

    if (filter.deliveryDateFrom) {
      query.andWhere('delivery-notes.deliveryDate >= :deliveryDateFrom', {
        deliveryDateFrom: '%' + filter.deliveryDateFrom + '%',
      });
    }

    if (filter.deliveryDateTo) {
      query.andWhere('delivery-notes.deliveryDate <= :deliveryDateTo', {
        deliveryDateTo: '%' + filter.deliveryDateTo + '%',
      });
    }

    const totalRows = await query.getCount();

    const skip = (page - 1) * limit;
    query.offset(skip).limit(limit);

    const deliveryNotes = await query.getMany();
    return ResultListModel.success(
      deliveryNotes,
      totalRows,
      'Filter deliveryNotes successful!',
    );
  }
}
