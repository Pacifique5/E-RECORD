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

async function createAdmin() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const userRepo = AppDataSource.getRepository(User);

    // Admin credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin123';

    // Check if admin already exists
    const adminExists = await userRepo.findOne({ where: { email: adminEmail } });
    
    if (adminExists) {
      console.log('⚠️  Admin user already exists with email:', adminEmail);
      console.log('🔑 You can login with:');
      console.log('   Email:', adminEmail);
      console.log('   Password: admin123');
      await AppDataSource.destroy();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const admin = userRepo.create({
      email: adminEmail,
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: UserRole.ADMIN,
      isActive: true,
      // Don't set school for admin - it's nullable
    });

    await userRepo.save(admin);

    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('🌐 Login at: http://localhost:3000/registration/login');
    console.log('📊 Admin Dashboard: http://localhost:3000/admin');

    await AppDataSource.destroy();
    console.log('✅ Database connection closed');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();