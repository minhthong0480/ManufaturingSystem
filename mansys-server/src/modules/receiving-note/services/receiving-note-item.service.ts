import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceivingNoteItem } from '../entities/receiving-note-item.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/modules/products/services/products.service';
import { CreateReceivingNoteItemDto } from '../dto/create-receiving-note-item.dto';
import { ResultModel } from 'src/common/result-model';
import { ReceivingNoteService } from './receiving-note.service';

@Injectable()
export class ReceivingNoteItemService {
  constructor(
    @InjectRepository(ReceivingNoteItem)
    private readonly receivingNoteItemRepository: Repository<ReceivingNoteItem>,

    @Inject(ReceivingNoteService)
    private readonly receivingNoteService: ReceivingNoteService,

    @Inject(ProductsService)
    private readonly productService: ProductsService,
  ) {}

  async create(dto: CreateReceivingNoteItemDto) {
    const product = await this.productService.getOneById(dto.productId);
    if (!product) {
      return ResultModel.fail('', 'Product not found!');
    }

    const receivingNote = await this.receivingNoteService.getOneById(
      dto.receivingNoteId,
    );
    if (!receivingNote) {
      return ResultModel.fail('', 'Receiving Note not found!');
    }

    const receivingNoteItem = await this.receivingNoteItemRepository.save(dto);
    if (!receivingNoteItem) {
      return ResultModel.fail('', 'Create Receiving Note Item failed!');
    }

    return ResultModel.fail(
      receivingNoteItem,
      'Create Receiving Note Item successful!',
    );
  }
}
