import { InjectRepository } from "@nestjs/typeorm";
import { Contract } from "../entities/contract.entity";
import { Repository } from "typeorm";
import { CreateContractDto } from '../dtos/create-contract.dto';
import { Injectable } from "@nestjs/common";
import { ResultModel } from "src/common/result-model";

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) { }

  async create(createContractDto: CreateContractDto) {
    const contractNumber = createContractDto.contractNumber;
    let contract = await this.contractRepository.findOneBy({ contractNumber })

    if (contract) {
      return ResultModel.fail("Contract existed!", "Contract existed!");
    }

    contract = await this.contractRepository.save(createContractDto)
    return ResultModel.success(contract, "Success");
  }

}