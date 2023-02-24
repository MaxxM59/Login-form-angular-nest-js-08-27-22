import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: +process.env.DATABASE_PORT,
   username: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
});
