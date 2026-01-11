import 'reflect-metadata';
import { DataSource } from 'typeorm';
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

async function clearDatabase() {
  await AppDataSource.initialize();
  console.log('Database connected for cleanup');

  try {
    // Clear all related data first (to avoid foreign key constraints)
    const notificationRepo = AppDataSource.getRepository(Notification);
    const notifications = await notificationRepo.find();
    if (notifications.length > 0) {
      await notificationRepo.remove(notifications);
      console.log(`✅ Cleared ${notifications.length} notifications`);
    }

    const inventoryRepo = AppDataSource.getRepository(InventoryItem);
    const inventoryItems = await inventoryRepo.find();
    if (inventoryItems.length > 0) {
      await inventoryRepo.remove(inventoryItems);
      console.log(`✅ Cleared ${inventoryItems.length} inventory items`);
    }

    const payrollRepo = AppDataSource.getRepository(Payroll);
    const payrolls = await payrollRepo.find();
    if (payrolls.length > 0) {
      await payrollRepo.remove(payrolls);
      console.log(`✅ Cleared ${payrolls.length} payroll records`);
    }

    const expenseRepo = AppDataSource.getRepository(Expense);
    const expenses = await expenseRepo.find();
    if (expenses.length > 0) {
      await expenseRepo.remove(expenses);
      console.log(`✅ Cleared ${expenses.length} expenses`);
    }

    const feeRepo = AppDataSource.getRepository(Fee);
    const fees = await feeRepo.find();
    if (fees.length > 0) {
      await feeRepo.remove(fees);
      console.log(`✅ Cleared ${fees.length} fees`);
    }

    // Clear all non-admin users
    const userRepo = AppDataSource.getRepository(User);
    const nonAdminUsers = await userRepo.find({
      where: [
        { role: UserRole.HEADMASTER },
        { role: UserRole.ACCOUNTANT }
      ]
    });
    if (nonAdminUsers.length > 0) {
      await userRepo.remove(nonAdminUsers);
      console.log(`✅ Cleared ${nonAdminUsers.length} non-admin users`);
    }

    // Clear all schools
    const schoolRepo = AppDataSource.getRepository(School);
    const schools = await schoolRepo.find();
    if (schools.length > 0) {
      await schoolRepo.remove(schools);
      console.log(`✅ Cleared ${schools.length} schools`);
    }

    console.log('\n🎉 Database cleanup completed successfully!');
    console.log('📝 Admin user (admin@gmail.com / admin123) is preserved');
    console.log('🚀 You can now start fresh registrations');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

clearDatabase().catch((err) => {
  console.error('Cleanup failed', err);
  process.exit(1);
});