import { InjectRepository } from "@nestjs/typeorm";
import { Contract } from "../entities/contract.entity";
import { Repository } from "typeorm";
import { CreateContractDto } from '../dtos/create-contract.dto';
import { Injectable } from "@nestjs/common";
import { ResultModel } from "src/common/result-model";
import { ContractFilterDTO } from "../dtos/filter-contract.dto";
import { ResultListModel } from "src/common/result-list-model";

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) { }

  async create(createContractDto: CreateContractDto) : Promise<ResultModel<Contract>>{
    const contractNumber = createContractDto.contractNumber;
    let contract = await this.contractRepository.findOneBy({ contractNumber })

    if (contract) {
      return ResultModel.fail(null, "Contract existed!");
    }

    contract = await this.contractRepository.save(createContractDto)
    return ResultModel.success(contract, "Success");
  }


  async filter(filterDto: ContractFilterDTO): Promise<ResultListModel<Contract>>{
    var query = this.contractRepository.createQueryBuilder('contracts');

    if (filterDto.contractNumber) {
     query.andWhere('contracts.contractNumber ILIKE :contractNumber', {
        contractNumber: `%${filterDto.contractNumber}%`
      });
    }

    if (filterDto.customerName) {
      query.andWhere('contracts.customerName ILIKE :customerName', {
        customerName: `%${filterDto.customerName}%`
      });
    }

    if (filterDto.userName) {
      query.andWhere('contracts.userName ILIKE :userName', {
        userName: `%${filterDto.userName}%`
      });
    }

    if (filterDto.startDate) {
      query.andWhere('contracts.dateStart >=  :startDate', { "startDate" : filterDto.startDate});
    }

    if (filterDto.endDate) {
      query.andWhere('contracts.dateStart <= :endDate', { "endDate" : filterDto.endDate });
    }


    if (filterDto.startDeadline) {
      query.andWhere('contracts.deadline >= :startDeadline', { "startDeadline" : filterDto.startDeadline });
    }

    if (filterDto.endDeadline) {
      query.andWhere('contracts.deadline <= :endDeadline', { "endDeadline" : filterDto.endDeadline });
    }

    if (filterDto.minTotal) {
      query.andWhere('contracts.total >= :minTotal', { "minTotal" : filterDto.minTotal});
    }

    if (filterDto.maxTotal) {
      query.andWhere('contracts.total <=> :maxTotal', { "maxTotal" : filterDto.maxTotal });
    }

    const totalRows = await query.getCount();

    const skip = (filterDto.page - 1) * filterDto.pageSize;
    query.skip(skip).take(filterDto.pageSize);

    const contracts = await query.getMany();

    return ResultListModel.success(contracts, totalRows, "Filtered contracts!");
  }
}