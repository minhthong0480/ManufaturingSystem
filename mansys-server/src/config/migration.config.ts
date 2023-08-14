import { DataSource } from 'typeorm';
import dataConfig from './migration-data.config';

const datasource = new DataSource(dataConfig());
datasource.initialize();
export default datasource;
