import { InjectRepository } from '@nestjs/typeorm';
import { ContractItem } from '../entities/contract-item.entity';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResultModel } from 'src/common/result-model';
import { CreateContractItemDto } from '../dtos/create-contract-item.dto';
import { ProductsService } from '../../products/services/products.service';
import { ContractService } from './contract.service';

@Injectable()
export class ContractItemService {
  constructor(
    @InjectRepository(ContractItem)
    private readonly contractItemRepository: Repository<ContractItem>,

    @Inject(ProductsService)
    private readonly productService: ProductsService,

    @Inject(forwardRef(() => ContractService))
    private readonly contractService: ContractService,
  ) {}

  async deleteByContractId(contractId: number) {
    const contratItems = await this.contractItemRepository.findBy({
      contractId,
    });
    await this.contractItemRepository.remove(contratItems);
    return ResultModel.success(true, 'Delete successful!');
  }

  async deleteById(contractId: number, productId: number) {
    const contratItems = await this.contractItemRepository.findBy({
      contractId,
      productId,
    });
    await this.contractItemRepository.remove(contratItems);
    return ResultModel.success(true, 'Delete successful!');
  }

  async save(createContractItemDto: CreateContractItemDto) {
    const contractId = createContractItemDto.contractId;
    const productId = createContractItemDto.productId;

    const contract = await this.contractService.getContractById(contractId);
    const product = await this.productService.getProductById(productId);

    if (!product.isSuccess || !contract.isSuccess) {
      return ResultModel.fail("", "Product or Contract not found!");
    }

    let contractItem = await this.contractItemRepository.findOneBy({
      contractId,
      productId,
    });
    if (contractItem) {
      contractItem.quanity += createContractItemDto.quantity;
      contractItem = await this.contractItemRepository.save(contractItem);
    } else {
      contractItem = await this.contractItemRepository.save(
        createContractItemDto,
      );
    }

    return ResultModel.success(
      contractItem,
      'Create contract-item successful!',
    );
  }
}
