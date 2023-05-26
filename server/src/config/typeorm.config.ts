/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig:  TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'minhthong48',
    database: 'contract_dat',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}
