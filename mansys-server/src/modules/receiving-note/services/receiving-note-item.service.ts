import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceivingNoteItem } from '../entities/receiving-note-item.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/modules/products/services/products.service';
import { CreateReceivingNoteItemDto } from '../dto/create-receiving-note-item.dto';
import { ResultModel } from 'src/common/result-model';
import { ReceivingNoteService } from './receiving-note.service';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';

@Injectable()
export class ReceivingNoteItemService {
  constructor(
    @InjectRepository(ReceivingNoteItem)
    private readonly receivingNoteItemRepository: Repository<ReceivingNoteItem>,

    @Inject(forwardRef(() => ReceivingNoteService))
    private readonly receivingNoteService: ReceivingNoteService,

    @Inject(ProductsService)
    private readonly productService: ProductsService,

    @Inject(InventoryService)
    private readonly inventoryService: InventoryService,
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

    const inventory = await this.inventoryService.getOneByProductId(
      dto.productId,
    );
    if (inventory) {
      inventory.stockIn += dto.quantity;
      await this.inventoryService.save(inventory);
    }

    return ResultModel.fail(
      receivingNoteItem,
      'Create Receiving Note Item successful!',
    );
  }

  async updateItems(receivingNoteId: number, newItems: Array<ReceivingNoteItem>) {
    const items = await this.receivingNoteItemRepository.findBy({
      receivingNoteId,
    });
    const deletedItems = items
      .filter((bill) => {
        const a = newItems.find((e) => e.id == bill.id);
        return a ? false : true;
      })
      .map((e) => e.id);

    if (deletedItems && deletedItems.length > 0)
      await this.receivingNoteItemRepository.delete(deletedItems);

    if (newItems && newItems.length > 0) {
      await this.receivingNoteItemRepository.save(newItems);
    }
  }
}
