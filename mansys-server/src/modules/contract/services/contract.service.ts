import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from '../entities/contract.entity';
import { Repository } from 'typeorm';
import { CreateContractDto } from '../dtos/create-contract.dto';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ResultModel } from 'src/common/result-model';
import { ContractFilterDTO } from '../dtos/filter-contract.dto';
import { ResultListModel } from 'src/common/result-list-model';
import { UpdateContactDto } from '../dtos/update-contract.dto';
import { ContractItemService } from './contract-item.service';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,

    @Inject(forwardRef(() => ContractItemService))
    private readonly contractItemService: ContractItemService,
  ) {}

  async create(
    createContractDto: CreateContractDto,
  ): Promise<ResultModel<Contract>> {
    const contractNumber = createContractDto.contractNumber;
    let contract = await this.contractRepository.findOneBy({ contractNumber });

    if (contract) {
      return ResultModel.fail(null, 'Contract existed!');
    }

    contract = await this.contractRepository.save(createContractDto);
    return ResultModel.success(contract, 'Success');
  }

  async filter(
    filterDto: ContractFilterDTO,
  ): Promise<ResultListModel<Contract>> {
    var query = this.contractRepository.createQueryBuilder('contracts');

    if (filterDto.contractNumber) {
      query.andWhere('contracts.contractNumber ILIKE :contractNumber', {
        contractNumber: `%${filterDto.contractNumber}%`,
      });
    }

    if (filterDto.customerName) {
      query.andWhere('contracts.customerName ILIKE :customerName', {
        customerName: `%${filterDto.customerName}%`,
      });
    }

    if (filterDto.userName) {
      query.andWhere('contracts.userName ILIKE :userName', {
        userName: `%${filterDto.userName}%`,
      });
    }

    if (filterDto.startDate) {
      query.andWhere('contracts.dateStart >=  :startDate', {
        startDate: filterDto.startDate,
      });
    }

    if (filterDto.endDate) {
      query.andWhere('contracts.dateStart <= :endDate', {
        endDate: filterDto.endDate,
      });
    }

    if (filterDto.startDeadline) {
      query.andWhere('contracts.deadline >= :startDeadline', {
        startDeadline: filterDto.startDeadline,
      });
    }

    if (filterDto.endDeadline) {
      query.andWhere('contracts.deadline <= :endDeadline', {
        endDeadline: filterDto.endDeadline,
      });
    }

    if (filterDto.minTotal) {
      query.andWhere('contracts.total >= :minTotal', {
        minTotal: filterDto.minTotal,
      });
    }

    if (filterDto.maxTotal) {
      query.andWhere('contracts.total <=> :maxTotal', {
        maxTotal: filterDto.maxTotal,
      });
    }

    if (filterDto.isActive) {
      query.andWhere('contracts.isActive = :isActive', {
        isActive: filterDto.isActive,
      });
    }

    const totalRows = await query.getCount();

    const skip = (filterDto.page - 1) * filterDto.pageSize;
    query.skip(skip).take(filterDto.pageSize);

    const contracts = await query.getMany();
    return ResultListModel.success(contracts, totalRows, 'Filtered contracts!');
  }

  async deactivate(id: number): Promise<ResultModel<boolean>> {
    var contract = await this.contractRepository.findOne({
      where: { id: id, isActive: true },
    });
    if (contract) {
      contract.isActive = false;
      await this.contractRepository.save(contract);
    }
    return ResultModel.success(true, null);
  }

  async update(id: number, updateContractDto: UpdateContactDto) {
    const contract = await this.contractRepository.findOneBy({ id });
    const contractNumber = updateContractDto.contractNumber;

    if (!contract) {
      return ResultModel.fail('Contract not found', 'Contract not found');
    }

    if (contract.contractNumber == contractNumber) {
      delete updateContractDto.contractNumber;
    } else if (await this.contractRepository.findOneBy({ contractNumber })) {
      return ResultModel.fail(
        'contractNumber existed',
        'contractNumber existed',
      );
    }

    this.contractItemService.deleteByContractId(contract.id);
    const updatedContract = await this.contractRepository.save({
      ...contract,
      ...updateContractDto,
    });

    return ResultModel.success(updatedContract, 'Update contract successful!');
  }

  async getContractById(id: number) {
    const contract = await this.contractRepository.findOneBy({ id });
    if (contract) {
      return ResultModel.success(contract, 'Get contract successful!');
    }

    return ResultModel.fail('', 'Get contract failed!');
  }
}
