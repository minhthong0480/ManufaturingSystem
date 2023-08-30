// import { Injectable,  NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Not, Repository } from 'typeorm';
// import { Timeline } from '../entities/timeline.entity'
// import { CreateTimelineDto } from '../dtos/create-timeline.dto';
// import { UpdateTimelineDto } from '../dtos/update-timeline.dto'
// import { Contract } from '../../contract/entities/contract.entity'
// import { ContractStatus } from '../../contract_status/entities/contract_status.entity'
// import { User } from '../../users/entities/user.entity'
// import { time } from 'console';

// @Injectable()
// export class TimelinesService {
//     constructor(@InjectRepository(Timeline) private repo: Repository<Timeline>
//                 @) {}
    
//     // Find all timelines
//     async findAll(): Promise<Timeline[]> {
//         return await this.repo.find();
//     }

//     // Find one timeline
//     async findOne(id: number): Promise<Timeline> {
//         const found = await this.repo.findOneBy({id});
//         if (!found) {
//             throw new NotFoundException(`Timeline ${id} not found`);
//         }
//         return found;
//     }

//     // Find all timelines by contract id
//     async findByContractId(contractId: number): Promise<Timeline[]> {
//         return await this.repo.find({ where: { contract: { id: contractId } } });
//     }

//     // Create a new timeline that uses the contract status id, contract id, user id from the request body to compare with the existing values from other entities (contract, user, contract status).
   
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Timeline } from '../entities/timeline.entity'
import { CreateTimelineDto } from '../dtos/create-timeline.dto';
import { UpdateTimelineDto } from '../dtos/update-timeline.dto'
import { Contract } from '../../contract/entities/contract.entity'
import { ContractStatus } from '../../contract_status/entities/contract_status.entity'
import { User } from '../../users/entities/user.entity'

@Injectable()
export class TimelinesService {
    constructor(@InjectRepository(Timeline) private repo: Repository<Timeline>) {}
    
    // Find all timelines
    async findAll(): Promise<Timeline[]> {
        return await this.repo.find();
    }

    // Find one timeline
    async findOne(id: number): Promise<Timeline> {
        const found = await this.repo.findOneBy({id});
        if (!found) {
            throw new NotFoundException(`Timeline ${id} not found`);
        }
        return found;
    }

    // Find all timelines by contract id
    async findByContractId(contractId: number): Promise<Timeline[]> {
        return await this.repo.find({ where: { contract: { id: contractId } } });
    }

    // Create a new timeline that uses the contract status id, contract id, user id from the request body to compare with the existing values from other entities (contract, user, contract status).
    async create(timeline: CreateTimelineDto) {
        const contractId = timeline.contractId;
        const contractStatusId = timeline.contractStatusId;
        const userId = timeline.userId;
        const time = timeline.time;

        let timelineItem = await this.repo.findOne({
            where: {
                contract: { id: contractId },
                contractStatus: { id: contractStatusId },
                user: { id: userId },
            },
        });
        if (timelineItem) {
            timelineItem.time = time;
            timelineItem = await this.repo.save(timelineItem);
        } else {
            timelineItem = await this.repo.save(timeline);
        }

        return {
            success: true,
            message: 'Create timeline successful!',
            data: timelineItem,
        };
    }

    // Update a timeline
    async update(id: number, timeline: UpdateTimelineDto): Promise<Timeline> {
        return
    }

    // Deactivate a timeline
    async remove(id: number): Promise<Timeline> {
        return
    }
}






    // async create(timeline: CreateTimelineDto): Promise<Timeline> {
    //   const timelineId = timeline.id;
    //     let timelineEntity = await this.repo.findOneBy({ id: timelineId })
    //     if (timelineEntity) {
    //         throw new BadRequestException(`Timeline ${timelineId} existed`);
    //     }
    //     return

    // }

  

