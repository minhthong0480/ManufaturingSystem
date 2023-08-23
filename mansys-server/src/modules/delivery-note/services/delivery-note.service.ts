import { Inject, Injectable } from '@nestjs/common';
import { CreateDeliveryNoteDto } from '../dto/create-delivery-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryNote } from '../entities/delivery-note.entity';
import { Repository } from 'typeorm';
import { ResultModel } from 'src/common/result-model';
import { CustomersService } from 'src/modules/customers/sevices/customers.service';

@Injectable()
export class DeliveryNoteSerive {
  constructor(
    @InjectRepository(DeliveryNote)
    private readonly deliveryNoteRepository: Repository<DeliveryNote>,

    @Inject(CustomersService)
    private readonly customerService: CustomersService,
  ) {}

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
}
