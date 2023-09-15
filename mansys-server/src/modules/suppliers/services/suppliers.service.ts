import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from '../entities/suppliers.entity';
import { Repository } from 'typeorm';
import { ResultModel } from 'src/common/result-model';

export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async getOneById(id: number) {
    return await this.supplierRepository.findOneBy({ id });
  }

  async getAll() {
    const suppliers = await this.supplierRepository.find();
    return ResultModel.success(suppliers, 'Success!');
  }
}
