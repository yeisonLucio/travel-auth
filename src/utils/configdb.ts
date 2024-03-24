import { TypeOrmModuleOptions } from "@nestjs/typeorm";
const dotenv = require('dotenv')

dotenv.config()

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} = process.env

export const configDB: TypeOrmModuleOptions = {
    type: 'mysql',
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
}