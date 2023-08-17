import { InjectRepository } from "@nestjs/typeorm";
import { ContractItem } from "../entities/contract-item.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ResultModel } from "src/common/result-model";
import { CreateContractItemDto } from "../dtos/create-contract-item.dto";

@Injectable()
export class ContractItemService {
  constructor(
    @InjectRepository(ContractItem)
    private readonly contractItemRepository: Repository<ContractItem>,
  ) { }

  async deleteByContractId(contractId: number) {
    const contratItems = await this.contractItemRepository.findBy({ contractId });
    await this.contractItemRepository.remove(contratItems);
    return ResultModel.success(true, "Delete successful!");
  }

  async save(createContractItemDto: CreateContractItemDto) {
    const contractId = createContractItemDto.contractId;
    const productId = createContractItemDto.productId;

    let contractItem = await this.contractItemRepository.findOneBy({ contractId, productId });
    if (contractItem) {
      contractItem.quanity += createContractItemDto.quantity;
      contractItem = await this.contractItemRepository.save(contractItem);
    }
    else {
      contractItem = await this.contractItemRepository.save(createContractItemDto);
    }

    return ResultModel.success(contractItem, "Create contract-item successful!");
  }
}