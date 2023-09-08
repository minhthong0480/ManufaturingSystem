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
import { ContractStatusService } from '../../contract_status/services/contract_status.service'
import { CustomersService } from 'src/modules/customers/sevices/customers.service';
import { CONTRACT_STATUS_NEW_ID } from '../../../common/enum'
import { Timeline } from 'src/modules/timeline/entities/timeline.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,

    @Inject(forwardRef(() => ContractItemService))
    private readonly contractItemService: ContractItemService,

    @Inject(forwardRef(() => ContractStatusService))
    private readonly contractStatusService: ContractStatusService,

    @Inject(CustomersService)
    private readonly customerService: CustomersService,
  ) {}

  async create(
    createContractDto: CreateContractDto,
  ): Promise<ResultModel<Contract>> {
    const contractNumber = createContractDto.contractNumber;
    let contract = await this.contractRepository.findOneBy({ contractNumber });

    if (contract) {
      return ResultModel.fail(null, 'Contract existed!');
    }
    createContractDto.statusId = CONTRACT_STATUS_NEW_ID;
    contract = await this.contractRepository.save(createContractDto);
    return ResultModel.success(contract, 'Success');
  }

  async filter(
    filterDto: ContractFilterDTO,
  ): Promise<ResultListModel<Contract>> {
    var query = this.contractRepository.createQueryBuilder('contracts');

    if (filterDto.contractNumber) {
      query.andWhere('contracts.contractNumber like :contractNumber', {
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
    for (const c of contracts) {
      const customer = await this.customerService.findOne(c.customerId);
      c.customerName = customer.name;
    }
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

    await this.contractItemService.deleteByContractId(contract.id);
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

  async validateStatus(id : number) : Promise<ResultModel<boolean>>{
    const contract = await this.contractRepository.findOne({ where: { id : id, isActive: true }} );
    if(!contract)
      return ResultModel.fail(false, 'Contract is not existed!')
    
    const allStatus = await this.contractStatusService.getAll()
    if(!allStatus || !allStatus.isSuccess || allStatus.data == null)
      return ResultModel.fail(false, 'Contract status is not existed!')

    const sortedStatus = allStatus.data.sort((a, b) => a.id - b.id)
    const currentStatus = sortedStatus.find(e => e.id == contract.statusId)
    const nextStatus = currentStatus.next_stage_ids.split(',').map(e => Number.parseInt(e))
    if(nextStatus.length == 0){
      return ResultModel.fail(false, 'The contract is done, can not be moving to the next step!')
    }

    contract.statusId = nextStatus[0]
    this.contractRepository.save(contract)
    return ResultModel.success(true, 'Validate the contract success!')
  }
}
