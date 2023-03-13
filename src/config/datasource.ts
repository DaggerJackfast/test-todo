import * as dotenv from 'dotenv';
import { getDataSource } from './typeorm.config';
dotenv.config();
const dataSource = getDataSource();
export default dataSource;
