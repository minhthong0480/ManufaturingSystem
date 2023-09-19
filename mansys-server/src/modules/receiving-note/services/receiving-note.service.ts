import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceivingNote } from '../entities/receiving-note.entity';
import { Repository } from 'typeorm';
import { CreateReceivingNoteDto } from '../dto/create-receiving-note.dto';
import { SupplierService } from 'src/modules/suppliers/services/suppliers.service';
import { ResultModel } from 'src/common/result-model';
import { FilterReceivingNoteDto } from '../dto/filter-receiving-note.dto';
import { ResultListModel } from 'src/common/result-list-model';
import { UpdateReceivingNoteDto } from '../dto/update-receiving-note.dto';
import { ReceivingNoteItemService } from './receiving-note-item.service';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';
import { Inventory } from 'src/modules/inventory/entities/inventory.entity';

@Injectable()
export class ReceivingNoteService {
  constructor(
    @InjectRepository(ReceivingNote)
    private readonly receivingNoteRepository: Repository<ReceivingNote>,

    @Inject(SupplierService)
    private readonly supplierService: SupplierService,

    @Inject(forwardRef(() => ReceivingNoteItemService))
    private readonly itemService: ReceivingNoteItemService,

    @Inject(InventoryService)
    private readonly inventoryService: InventoryService,
  ) {}

  async create(dto: CreateReceivingNoteDto) {
    const supplier = await this.supplierService.getOneById(dto.supplierId);
    if (!supplier) {
      return ResultModel.fail('', 'Supplier not found!');
    }

    const receivingNote = await this.receivingNoteRepository.save(dto);
    if (!receivingNote) {
      return ResultModel.fail('', 'Create Receiving Note failed!');
    }

    await this.itemService.saveItems(receivingNote.id, dto.receivingNoteItems);
    return ResultModel.success(
      receivingNote,
      'Create Receiving Note successful!',
    );
  }

  async approve(id: number) {
    const receivingNote = await this.receivingNoteRepository.findOneBy({ id });
    if (!receivingNote || receivingNote.approval) {
      return ResultModel.fail({}, 'Failed!');
    }

    for (const item of receivingNote.receivingNoteItems) {
      const inventory = await this.inventoryService.getOneByProductId(
        item.productId,
      );
      if (inventory) {
        inventory.stockIn += item.quantity;
        await this.inventoryService.save(inventory);
      }
    }
    receivingNote.approval = true;
    const approved = await this.receivingNoteRepository.save(receivingNote);
    return ResultModel.success(approved, 'Success!');
  }

  async get(id: number) {
    const receivingNote = await this.receivingNoteRepository.findOneBy({ id });
    if (!receivingNote) {
      return ResultModel.fail({}, 'Failed!');
    }
    return ResultModel.success(receivingNote, 'Success!');
  }

  async update(id: number, dto: UpdateReceivingNoteDto) {
    const receivingNote = await this.receivingNoteRepository.findOneBy({ id });
    if (!receivingNote) {
      return ResultModel.fail({}, 'Update failed!');
    }

    console.log(dto.receivingNoteItems);
    await this.itemService.updateItems(id, dto.receivingNoteItems);

    const updated = await this.receivingNoteRepository.save({
      ...receivingNote,
      ...dto,
    });

    return ResultModel.success(updated, 'Update Success!');
  }

  async getOneById(id: number) {
    return await this.receivingNoteRepository.findOneBy({ id });
  }

  async filter(filter: FilterReceivingNoteDto) {
    const query = this.receivingNoteRepository
      .createQueryBuilder('receiving-notes')
      .leftJoinAndSelect(
        'receiving-notes.receivingNoteItems',
        'receiving-note-items',
      );
    const page = parseInt(filter.page as any) || 1;
    const limit = parseInt(filter.pageSize as any) || 10;

    if (filter.supplierId) {
      query.andWhere('receiving-notes.supplierId = :supplierId', {
        supplierId: filter.supplierId,
      });
    }

    if (filter.productId) {
      query.andWhere('receiving-note-items.productId = :productId', {
        productId: filter.productId,
      });
    }

    if (filter.receivedBy) {
      query.andWhere('receiving-notes.receivedBy like :receivedBy', {
        receivedBy: '%' + filter.receivedBy + '%',
      });
    }

    if (filter.purchaseOrder) {
      query.andWhere('receiving-notes.purchaseOrder like :purchaseOrder', {
        purchaseOrder: '%' + filter.purchaseOrder + '%',
      });
    }

    if (filter.receiptDateFrom) {
      query.andWhere('receiving-notes.receiptDate >= :receiptDateFrom', {
        receiptDateFrom: '%' + filter.receiptDateFrom + '%',
      });
    }

    if (filter.receiptDateTo) {
      query.andWhere('receiving-notes.receiptDate <= :receiptDateTo', {
        receiptDateTo: '%' + filter.receiptDateTo + '%',
      });
    }

    const totalRows = await query.getCount();

    const skip = (page - 1) * limit;
    query.offset(skip).limit(limit);

    const receivingNotes = await query.getMany();
    return ResultListModel.success(
      receivingNotes,
      totalRows,
      'Filter receivingNote successful!',
    );
  }
}
