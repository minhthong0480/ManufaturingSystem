import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultModel } from 'src/common/result-model';
import { DeliveryNoteItem } from '../entities/delivery-note-item.entity';
import { CreateDeliveryNoteItemDto } from '../dto/create-delivery-note-item.dto';
import { ProductsService } from 'src/modules/products/services/products.service';
import { DeliveryNoteSerive } from './delivery-note.service';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';

@Injectable()
export class DeliveryNoteItemSerive {
  constructor(
    @InjectRepository(DeliveryNoteItem)
    private readonly deliveryNoteItemRepository: Repository<DeliveryNoteItem>,

    @Inject(ProductsService)
    private readonly productsService: ProductsService,

    @Inject(forwardRef(() => DeliveryNoteSerive))
    private readonly deliveryNoteSerive: DeliveryNoteSerive,

    @Inject(InventoryService)
    private readonly inventoryService: InventoryService,
  ) {}

  async create(dto: CreateDeliveryNoteItemDto) {
    const product = await this.productsService.getOneById(dto.productId);
    if (!product) {
      return ResultModel.fail(dto, 'Product is not existed!');
    }

    const deliveryNote = await this.deliveryNoteSerive.findOneById(
      dto.deliveryId,
    );
    if (!deliveryNote) {
      return ResultModel.fail(dto, 'Delivery Note is not existed!');
    }

    const deliveryNoteItem = await this.deliveryNoteItemRepository.save(dto);
    if (!deliveryNoteItem) {
      return ResultModel.fail(
        deliveryNoteItem,
        'Create Delivery Note Item Failed',
      );
    }

    const inventory = await this.inventoryService.getOneByProductId(product.id);
    inventory.stockOut += dto.quantity;
    inventory.lastUpdate = new Date();
    await this.inventoryService.save(inventory);

    return ResultModel.success(
      deliveryNoteItem,
      'Delivery Note Item create successful!',
    );
  }

  async updateItems(deliveryNoteId: number, newItems: Array<DeliveryNoteItem>) {
    const items = await this.deliveryNoteItemRepository.findBy({
      deliveryNoteId,
    });
    const deletedItems = items
      .filter((item) => {
        const a = newItems.find((e) => e.id == item.id);
        return a ? false : true;
      })
      .map((e) => e.id);

    if (deletedItems && deletedItems.length > 0)
      await this.deliveryNoteItemRepository.delete(deletedItems);

    if (newItems && newItems.length > 0) {
      await this.deliveryNoteItemRepository.save(newItems);
    }
  }

  async saveItems(deliveryNoteId: number, newItems: Array<DeliveryNoteItem>) {
    newItems.map((item) => {
      item.deliveryNoteId = deliveryNoteId;
      return item;
    });
    await this.deliveryNoteItemRepository.save(newItems);
  }

  async deleteByDeliveryNoteId(deliveryNoteId: number) {
    const items = await this.deliveryNoteItemRepository.findBy({
      deliveryNoteId,
    });
    if (items.length > 0)
      await this.deliveryNoteItemRepository.delete(items.map((e) => e.id));
  }

  
  async deleteItems(items: Array<DeliveryNoteItem>) {
    if (items.length > 0)
      await this.deliveryNoteItemRepository.delete(items.map((e) => e.id));
  }
}
