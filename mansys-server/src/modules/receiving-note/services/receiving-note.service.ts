import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceivingNote } from '../entities/receiving-note.entity';
import { Repository } from 'typeorm';
import { CreateReceivingNoteDto } from '../dto/create-receiving-note.dto';
import { SupplierService } from 'src/modules/suppliers/services/suppliers.service';
import { ResultModel } from 'src/common/result-model';
import { FilterReceivingNoteDto } from '../dto/filter-receiving-note.dto';
import { ResultListModel } from 'src/common/result-list-model';

@Injectable()
export class ReceivingNoteService {
  constructor(
    @InjectRepository(ReceivingNote)
    private readonly receivingNoteRepository: Repository<ReceivingNote>,

    @Inject(SupplierService)
    private readonly supplierService: SupplierService,
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

    return ResultModel.success(
      receivingNote,
      'Create Receiving Note successful!',
    );
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
