import { InjectRepository } from "@nestjs/typeorm";
import { ContractItem } from "../entities/contract-item.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ResultModel } from "src/common/result-model";

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
}