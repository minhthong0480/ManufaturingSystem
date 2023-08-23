import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceivingNote } from '../entities/receiving-note.entity';
import { Repository } from 'typeorm';
import { CreateReceivingNoteDto } from '../dto/create-receiving-note.dto';
import { SupplierService } from 'src/modules/suppliers/services/suppliers.service';
import { ResultModel } from 'src/common/result-model';

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
}
