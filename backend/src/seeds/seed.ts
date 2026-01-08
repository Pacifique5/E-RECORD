import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { User, UserRole } from '../entities/user.entity';
import { School } from '../entities/school.entity';
import { Fee } from '../entities/fee.entity';
import { Expense } from '../entities/expense.entity';
import { Payroll } from '../entities/payroll.entity';
import { InventoryItem } from '../entities/inventory.entity';
import { Notification } from '../entities/notification.entity';

dotenv.config({ path: '.env' });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'erecord_db',
  entities: [User, School, Fee, Expense, Payroll, InventoryItem, Notification],
  synchronize: process.env.NODE_ENV !== 'production',
});

async function runSeed() {
  await AppDataSource.initialize();
  console.log('Database connected for seeding');

  const schoolRepo = AppDataSource.getRepository(School);
  const userRepo = AppDataSource.getRepository(User);

  let school = await schoolRepo.findOne({ where: { code: 'DEFAULT' } });
  if (!school) {
    school = schoolRepo.create({
      code: 'DEFAULT',
      name: 'Default School',
      address: '123 Main St',
      city: 'City',
      country: 'Country',
    });
    await schoolRepo.save(school);
    console.log('Created default school');
  }

  // Create admin user with specified credentials
  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'admin123';
  
  const adminExists = await userRepo.findOne({ where: { email: adminEmail } });
  if (!adminExists) {
    const hashed = await bcrypt.hash(adminPassword, 10);
    const admin = userRepo.create({
      email: adminEmail,
      password: hashed,
      firstName: 'System',
      lastName: 'Administrator',
      role: UserRole.ADMIN,
      isActive: true,
      // Don't set school for admin - it's nullable
    });
    await userRepo.save(admin);
    console.log(`✅ Created admin user: ${adminEmail} with password: ${adminPassword}`);
  } else {
    console.log('⚠️  Admin user already exists');
  }

  await AppDataSource.destroy();
  console.log('Seeding complete');
}

runSeed().catch((err) => {
  console.error('Seeding failed', err);
  process.exit(1);
});