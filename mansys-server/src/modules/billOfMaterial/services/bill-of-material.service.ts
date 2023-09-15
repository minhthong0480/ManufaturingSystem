import { Injectable } from '@nestjs/common';
import { BillOfMaterial } from '../entities/bill-of-material.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultModel } from 'src/common/result-model';

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

    if (!bills) {
      return ResultModel.fail([], 'fail');
    }

    return ResultModel.success(bills, 'Success!');
  }

  async saveAll(bills) {
    return await this.billRepository.save(bills);
  }

  async updateBills(product_id, newBills) {
    const bills = await this.billRepository.findBy({ product_id });
    const deletedBills = bills
      .filter((bill) => {
        const a = newBills.find((e) => e.id == bill.id);
        return a ? false : true;
      })
      .map((e) => e.id);

    if (deletedBills && deletedBills.length > 0)
      await this.billRepository.delete(deletedBills);

    if (newBills && newBills.length > 0)
      await this.saveAll(
        newBills.map((e: BillOfMaterial) => {
          return { ...e, product_id: product_id };
        }),
      );
  }
}
