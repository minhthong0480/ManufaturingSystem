import { Injectable } from '@nestjs/common';
import { BillOfMaterial } from '../entities/bill-of-material.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BillOfMaterialService {
  constructor(
    @InjectRepository(BillOfMaterial)
    private readonly billRepository: Repository<BillOfMaterial>,
  ) {}

  async getAllByProductId(product_id: number) {
    const bills = await this.billRepository.find({
      relations: ['material'],
      where: { product_id },
    });

    return bills;
  }
}
