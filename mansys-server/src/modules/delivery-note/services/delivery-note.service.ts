import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateDeliveryNoteDto } from '../dto/create-delivery-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryNote } from '../entities/delivery-note.entity';
import { Repository } from 'typeorm';
import { ResultModel } from 'src/common/result-model';
import { CustomersService } from 'src/modules/customers/sevices/customers.service';
import { FilterDeliveryNoteDto } from '../dto/filter-delivery-note.dto';
import { ResultListModel } from 'src/common/result-list-model';
import { UpdateDeliveryNoteDto } from '../dto/update-delivery-note.dto';
import { DeliveryNoteItemSerive } from './delivery-note-item.service';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';

@Injectable()
export class DeliveryNoteSerive {
  constructor(
    @InjectRepository(DeliveryNote)
    private readonly deliveryNoteRepository: Repository<DeliveryNote>,

    @Inject(CustomersService)
    private readonly customerService: CustomersService,

    @Inject(forwardRef(() => DeliveryNoteItemSerive))
    private readonly itemService: DeliveryNoteItemSerive,

    @Inject(InventoryService)
    private readonly inventoryService: InventoryService,
  ) {}

  async get(id: number) {
    const deliveryNote = await this.deliveryNoteRepository.findOneBy({ id });
    if (!deliveryNote) {
      return ResultModel.fail({}, 'Failed!');
    }
    return ResultModel.success(deliveryNote, 'Success!!!');
  }

  async delete(id: number) {
    const deliveryNote = await this.deliveryNoteRepository.findOneBy({ id });
    if (!deliveryNote) {
      return ResultModel.fail({}, 'Failed!');
    }
    await this.itemService.deleteByDeliveryNoteId(id);
    await this.deliveryNoteRepository.delete(deliveryNote.id);
    return ResultModel.success({}, 'Success!!!');
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

    await this.itemService.saveItems(deliveryNote.id, dto.deliveryNoteItems);
    return ResultModel.success(
      deliveryNote,
      'Delivery Note create successful!',
    );
  }

  async findOneById(id: number) {
    return await this.deliveryNoteRepository.findOneBy({ id });
  }

  async approve(id: number) {
    const deliveryNote = await this.deliveryNoteRepository.findOneBy({ id });
    if (!deliveryNote || deliveryNote.approval) {
      return ResultModel.fail({}, 'Failed!');
    }

    for (const item of deliveryNote.deliveryNoteItems) {
      const inventory = await this.inventoryService.getOneByProductId(
        item.productId,
      );
      if (inventory) {
        inventory.stockOut += item.quantity;
        await this.inventoryService.save(inventory);
      }
    }
    deliveryNote.approval = true;
    const approved = await this.deliveryNoteRepository.save(deliveryNote);
    return ResultModel.success(approved, 'Success!');
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

  async update(id: number, dto: UpdateDeliveryNoteDto) {
    const deliveryNote = await this.deliveryNoteRepository.findOneBy({ id });
    if (!deliveryNote) {
      return ResultModel.fail({}, 'Failed');
    }

    await this.itemService.updateItems(id, dto.deliveryNoteItems);

    const updated = await this.deliveryNoteRepository.save({
      ...deliveryNote,
      ...dto,
    });

    return ResultModel.success(updated, 'Success');
  }
}
