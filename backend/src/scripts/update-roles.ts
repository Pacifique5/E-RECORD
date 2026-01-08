import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../entities/user.entity';

dotenv.config({ path: '.env' });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'erecord_db',
  entities: [User],
  synchronize: false,
});

async function updateRoles() {
  await AppDataSource.initialize();
  console.log('Database connected for role update');

  // Update all staff users to headmaster
  await AppDataSource.query(`UPDATE users SET role = 'headmaster' WHERE role = 'staff'`);
  console.log('Updated staff users to headmaster');

  await AppDataSource.destroy();
  console.log('Role update complete');
}

updateRoles().catch((err) => {
  console.error('Role update failed', err);
  process.exit(1);
});