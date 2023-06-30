/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { Contract} from "./contract.entity";


@EntityRepository(Contract)
export class TaskRepository extends Repository<Contract> {

}