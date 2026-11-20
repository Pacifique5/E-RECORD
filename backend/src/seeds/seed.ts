import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { User, UserRole } from '../entities/user.entity';
import { School } from '../entities/school.entity';
import { Fee, FeeStatus, FeeType, PaymentMethod } from '../entities/fee.entity';
import { Expense, ExpenseCategory } from '../entities/expense.entity';
import { Payroll, PayrollStatus } from '../entities/payroll.entity';
import { InventoryItem } from '../entities/inventory.entity';
import { Notification, NotificationType } from '../entities/notification.entity';
import { Student, StudentClass, StudentCombination, StudentGender } from '../entities/student.entity';
import { SchoolTerm, classInYear, termFromMonth } from '../common/academic';
import { Instructor, InstructorGender, InstructorSubject } from '../entities/instructor.entity';

dotenv.config({ path: '.env' });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'erecord_db',
  entities: [User, School, Fee, Expense, Payroll, InventoryItem, Notification, Student, Instructor],
  synchronize: process.env.NODE_ENV !== 'production',
});

async function runSeed() {
  await AppDataSource.initialize();
  console.log('Database connected for seeding');

  const schoolRepo = AppDataSource.getRepository(School);
  const userRepo = AppDataSource.getRepository(User);
  const feeRepo = AppDataSource.getRepository(Fee);
  const expenseRepo = AppDataSource.getRepository(Expense);
  const payrollRepo = AppDataSource.getRepository(Payroll);
  const inventoryRepo = AppDataSource.getRepository(InventoryItem);
  const notificationRepo = AppDataSource.getRepository(Notification);
  const studentRepo = AppDataSource.getRepository(Student);
  const instructorRepo = AppDataSource.getRepository(Instructor);

  let school = await schoolRepo.findOne({ where: { code: 'SCH0001' } });
  if (!school) {
    school = schoolRepo.create({
      code: 'SCH0001',
      name: 'Rwanda Coding Academy',
      address: 'Kibeho',
      city: 'Kibeho',
      country: 'Rwanda',
      phoneNumber: '0795653123',
      email: 'info@rwandacoding.ac.rw',
      status: 'approved',
      isActive: true,
    });
    await schoolRepo.save(school);
    console.log('Created Rwanda Coding Academy (SCH0001)');
  } else if (school.status !== 'approved') {
    school.status = 'approved';
    school.isActive = true;
    await schoolRepo.save(school);
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

  const passwordHash = await bcrypt.hash('password123', 10);
  const headmaster = await ensureUser(userRepo, {
    email: 'headmaster@gmail.com',
    password: passwordHash,
    firstName: 'Pacifique',
    lastName: 'Mugisha',
    role: UserRole.HEADMASTER,
    phoneNumber: '0788001122',
    school,
  });
  const accountant = await ensureUser(userRepo, {
    email: 'accountant@gmail.com',
    password: passwordHash,
    firstName: 'Aline',
    lastName: 'Uwase',
    role: UserRole.ACCOUNTANT,
    phoneNumber: '0788003344',
    school,
  });

  const feeCount = await feeRepo.count({ where: { school: { id: school.id } } });
  if (feeCount === 0) {
    const students = ['Dushime Aine', 'Keza Ingrid', 'Habimana Eric', 'Mukamana Diane', 'Niyonsenga Patrick', 'Uwimana Claire'];
    const months = lastMonths(6);
    const fees: Fee[] = [];
    months.forEach((month, monthIndex) => {
      students.forEach((student, studentIndex) => {
        const paid = studentIndex < 4;
        const partial = studentIndex === 4;
        const amount = 850000 + studentIndex * 20000;
        const paidAmount = paid ? amount : partial ? Math.round(amount / 2) : 0;
        fees.push(feeRepo.create({
          studentName: student,
          studentId: `STU${String(studentIndex + 1).padStart(3, '0')}`,
          amount,
          amountPaid: paidAmount,
          type: [FeeType.TUITION, FeeType.EXAM, FeeType.ACTIVITY, FeeType.OTHER][studentIndex % 4],
          status: paid ? FeeStatus.PAID : partial ? FeeStatus.PARTIALLY_PAID : FeeStatus.PENDING,
          dueDate: month,
          ...(paid || partial ? { paidDate: month } : {}),
          notes: 'Term school fee',
          paymentMethod: PAYMENT_METHODS[(studentIndex + monthIndex) % PAYMENT_METHODS.length],
          school,
        }));
      });
      void monthIndex;
    });
    await feeRepo.save(fees);
    console.log(`Created ${fees.length} fee records`);
  }

  const expenseCount = await expenseRepo.count({ where: { school: { id: school.id } } });
  if (expenseCount === 0) {
    const months = lastMonths(6);
    const templates = [
      { description: 'Classroom repairs', category: ExpenseCategory.MAINTENANCE, vendor: 'BuildRight Ltd', base: 900000 },
      { description: 'Science lab supplies', category: ExpenseCategory.SUPPLIES, vendor: 'LabSource', base: 450000 },
      { description: 'Computer equipment', category: ExpenseCategory.EQUIPMENT, vendor: 'TechWorld', base: 1200000 },
      { description: 'Electricity and water', category: ExpenseCategory.UTILITIES, vendor: 'REG', base: 320000 },
      { description: 'Student transport', category: ExpenseCategory.TRANSPORTATION, vendor: 'City Bus', base: 280000 },
    ];
    const expenses = months.flatMap((month, monthIndex) =>
      templates.map((template, index) => expenseRepo.create({
        description: template.description,
        amount: template.base + monthIndex * 40000 + index * 15000,
        category: template.category,
        date: month,
        vendor: template.vendor,
        invoiceNumber: `INV-${month.getFullYear()}${month.getMonth() + 1}-${index + 1}`,
        school,
      })),
    );
    await expenseRepo.save(expenses);
    console.log(`Created ${expenses.length} expenses`);
  }

  const payrollCount = await payrollRepo.count({ where: { school: { id: school.id } } });
  if (payrollCount === 0) {
    const staff = [
      { name: 'Dushime Aine', id: 'STF001', position: 'Science', salary: 450000 },
      { name: 'Jean Bosco', id: 'STF002', position: 'Mathematics', salary: 420000 },
      { name: 'Marie Claire', id: 'STF003', position: 'Languages', salary: 400000 },
      { name: 'Eric Habimana', id: 'STF004', position: 'Administration', salary: 380000 },
    ];
    const months = lastMonths(6);
    const payrolls = months.flatMap((month) =>
      staff.map((person, index) => {
        const allowances = 50000;
        const deductions = 30000;
        const pending = index === 3 && month.getMonth() === new Date().getMonth();
        return payrollRepo.create({
          staffName: person.name,
          staffId: person.id,
          position: person.position,
          baseSalary: person.salary,
          allowances,
          deductions,
          netSalary: person.salary + allowances - deductions,
          payrollMonth: month,
          status: pending ? PayrollStatus.APPROVED : PayrollStatus.PAID,
          ...(pending ? {} : { paidDate: month }),
          paymentMethod: PAYMENT_METHODS[index % PAYMENT_METHODS.length],
          school,
        });
      }),
    );
    await payrollRepo.save(payrolls);
    console.log(`Created ${payrolls.length} payroll records`);
  }

  const inventoryCount = await inventoryRepo.count({ where: { school: { id: school.id } } });
  if (inventoryCount === 0) {
    const items = [
      { name: 'Laptops', category: 'Technology', sku: 'TECH-001', quantity: 20, unitCost: 450000, supplier: 'TechWorld' },
      { name: 'Projectors', category: 'Technology', sku: 'TECH-002', quantity: 3, unitCost: 280000, supplier: 'Office Equip' },
      { name: 'Textbooks', category: 'Academic', sku: 'ACAD-001', quantity: 120, unitCost: 8000, supplier: 'Book Supplier Ltd' },
      { name: 'Notebooks', category: 'Academic', sku: 'ACAD-002', quantity: 4, unitCost: 1500, supplier: 'Paper Co' },
      { name: 'Cleaning supplies', category: 'Maintenance', sku: 'MAIN-001', quantity: 0, unitCost: 12000, supplier: 'Cleaners Inc' },
      { name: 'Desktop computers', category: 'Technology', sku: 'TECH-003', quantity: 12, unitCost: 350000, supplier: 'TechWorld' },
    ];
    await inventoryRepo.save(items.map((item) => inventoryRepo.create({
      ...item,
      totalValue: item.quantity * item.unitCost,
      location: 'Main campus',
      description: item.name,
      isActive: true,
      school,
    })));
    console.log(`Created ${items.length} inventory items`);
  }

  const studentCount = await studentRepo.count({ where: { school: { id: school.id } } });
  if (studentCount === 0) {
    const starters = [
      { firstName: 'Dushime', lastName: 'Aine', studentCode: 'STU001', gender: StudentGender.MALE, dateOfBirth: '2008-03-12', fatherName: 'Jean Aine', fatherPhone: '0788111001', motherName: 'Claire Aine', motherPhone: '0788111002', classLevel: StudentClass.S5, entryYear: 2026, combination: StudentCombination.MCB },
      { firstName: 'Keza', lastName: 'Ingrid', studentCode: 'STU002', gender: StudentGender.FEMALE, dateOfBirth: '2009-07-21', fatherName: 'Eric Keza', fatherPhone: '0788222001', motherName: 'Diane Keza', motherPhone: '0788222002', classLevel: StudentClass.S4, combination: StudentCombination.PCB },
      { firstName: 'Habimana', lastName: 'Eric', studentCode: 'STU003', gender: StudentGender.MALE, dateOfBirth: '2007-11-02', fatherName: 'Patrick Habimana', fatherPhone: '0788333001', motherName: 'Aline Habimana', motherPhone: '0788333002', classLevel: StudentClass.S6, combination: StudentCombination.PCM },
      { firstName: 'Mukamana', lastName: 'Diane', studentCode: 'STU004', gender: StudentGender.FEMALE, dateOfBirth: '2010-01-18', fatherName: 'Bosco Mukamana', fatherPhone: '0788444001', motherName: 'Marie Mukamana', motherPhone: '0788444002', classLevel: StudentClass.S3, combination: null },
      { firstName: 'Niyonsenga', lastName: 'Patrick', studentCode: 'STU005', gender: StudentGender.MALE, dateOfBirth: '2011-05-09', fatherName: 'Claude Niyonsenga', fatherPhone: '0788555001', motherName: 'Grace Niyonsenga', motherPhone: '0788555002', classLevel: StudentClass.S2, combination: null },
      { firstName: 'Uwimana', lastName: 'Claire', studentCode: 'STU006', gender: StudentGender.FEMALE, dateOfBirth: '2012-09-30', fatherName: 'David Uwimana', fatherPhone: '0788666001', motherName: 'Sarah Uwimana', motherPhone: '0788666002', classLevel: StudentClass.S1, combination: null },
    ];
    await studentRepo.save(starters.map((student) => studentRepo.create({ ...student, school })));
    console.log(`Created ${starters.length} students`);
  }

  const instructorCount = await instructorRepo.count({ where: { school: { id: school.id } } });
  if (instructorCount === 0) {
    const instructors = [
      { firstName: 'Jean Bosco', lastName: 'Hakizimana', instructorCode: 'INS001', gender: InstructorGender.MALE, phone: '0789100101', alternatePhone: '0789100102', subject: InstructorSubject.MATHEMATICS },
      { firstName: 'Marie Claire', lastName: 'Uwimana', instructorCode: 'INS002', gender: InstructorGender.FEMALE, phone: '0789200201', alternatePhone: '0789200202', subject: InstructorSubject.FRENCH },
      { firstName: 'Eric', lastName: 'Nkurunziza', instructorCode: 'INS003', gender: InstructorGender.MALE, phone: '0789300301', alternatePhone: '0789300302', subject: InstructorSubject.PHYSICS },
      { firstName: 'Aline', lastName: 'Uwase', instructorCode: 'INS004', gender: InstructorGender.FEMALE, phone: '0789400401', alternatePhone: null, subject: InstructorSubject.BIOLOGY },
      { firstName: 'Patrick', lastName: 'Ndayisaba', instructorCode: 'INS005', gender: InstructorGender.MALE, phone: '0789500501', alternatePhone: '0789500502', subject: InstructorSubject.COMPUTER_SCIENCE },
      { firstName: 'Diane', lastName: 'Ingabire', instructorCode: 'INS006', gender: InstructorGender.FEMALE, phone: '0789600601', alternatePhone: '0789600602', subject: InstructorSubject.ENGLISH },
      { firstName: 'Claude', lastName: 'Bizimana', instructorCode: 'INS007', gender: InstructorGender.MALE, phone: '0789700701', alternatePhone: null, subject: InstructorSubject.CHEMISTRY },
      { firstName: 'Grace', lastName: 'Mukamana', instructorCode: 'INS008', gender: InstructorGender.FEMALE, phone: '0789800801', alternatePhone: '0789800802', subject: InstructorSubject.HISTORY },
    ];
    await instructorRepo.save(instructors.map((instructor) => instructorRepo.create({ ...instructor, school })));
    console.log(`Created ${instructors.length} instructors`);
  }

  const notificationCount = await notificationRepo.count({ where: { user: { id: accountant.id } } });
  if (notificationCount === 0) {
    const notes = [
      { title: 'Fee update', message: 'Student school fees have been recorded for this term.', type: NotificationType.FEE_REMINDER, isRead: false },
      { title: 'Low stock', message: 'Cleaning supplies are finished. Add more items before the next week.', type: NotificationType.INVENTORY_LOW, isRead: false },
      { title: 'Budget saved', message: 'The term budget categories were added successfully.', type: NotificationType.SYSTEM, isRead: true },
      { title: 'Payroll ready', message: 'Staff payroll for this month is ready to review.', type: NotificationType.PAYROLL_UPDATE, isRead: false },
      { title: 'Expense alert', message: 'Computer equipment spending is higher than last month.', type: NotificationType.EXPENSE_ALERT, isRead: true },
    ];
    await notificationRepo.save([
      ...notes.map((note) => notificationRepo.create({ ...note, user: accountant })),
      ...notes.map((note) => notificationRepo.create({ ...note, user: headmaster })),
    ]);
    console.log('Created notifications');
  }

  await assignPaymentMethods(feeRepo, school.id);
  await assignPaymentMethods(payrollRepo, school.id);
  await assignAcademicPeriods(feeRepo, expenseRepo, payrollRepo, studentRepo, school);

  console.log('School login:');
  console.log('  Headmaster  headmaster@gmail.com / password123  code SCH0001');
  console.log('  Accountant  accountant@gmail.com / password123');

  await AppDataSource.destroy();
  console.log('Seeding complete');
}

const PAYMENT_METHODS = [PaymentMethod.MOBILE_MONEY, PaymentMethod.CASH, PaymentMethod.OTHER];

const CLASS_OF_2026 = [
  { name: 'Dushime Aine', id: 'STU001', classLevel: StudentClass.S5 },
  { name: 'Keza Ingrid', id: 'STU002', classLevel: StudentClass.S4 },
  { name: 'Habimana Eric', id: 'STU003', classLevel: StudentClass.S6 },
  { name: 'Mukamana Diane', id: 'STU004', classLevel: StudentClass.S3 },
  { name: 'Niyonsenga Patrick', id: 'STU005', classLevel: StudentClass.S2 },
  { name: 'Uwimana Claire', id: 'STU006', classLevel: StudentClass.S1 },
];

async function assignAcademicPeriods(feeRepo, expenseRepo, payrollRepo, studentRepo, school) {
  const fees = await feeRepo.find({ where: { school: { id: school.id } } });
  const untagged = fees.filter((fee) => {
    const date = new Date(fee.dueDate);
    return Number(fee.academicYear) !== date.getFullYear() || fee.term !== termFromMonth(date.getMonth());
  });
  untagged.forEach((fee) => {
    const date = new Date(fee.dueDate);
    const term = termFromMonth(date.getMonth());
    const index = Number(String(fee.studentId).replace(/\D/g, ''));
    fee.academicYear = date.getFullYear();
    fee.term = term;
    if (term === SchoolTerm.THIRD && index >= 3) {
      fee.status = FeeStatus.PENDING;
      fee.amountPaid = 0;
      fee.paidDate = null as unknown as Date;
    } else if (term === SchoolTerm.SECOND && index >= 6) {
      fee.status = FeeStatus.PENDING;
      fee.amountPaid = 0;
      fee.paidDate = null as unknown as Date;
    }
  });
  if (untagged.length) {
    await feeRepo.save(untagged);
    console.log(`Tagged ${untagged.length} fees with a year and term`);
  }

  const expenses = await expenseRepo.find({ where: { school: { id: school.id } } });
  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    expense.academicYear = date.getFullYear();
    expense.term = termFromMonth(date.getMonth());
  });
  if (expenses.length) await expenseRepo.save(expenses);

  const payrolls = await payrollRepo.find({ where: { school: { id: school.id } } });
  payrolls.forEach((payroll) => {
    const date = new Date(payroll.payrollMonth);
    payroll.academicYear = date.getFullYear();
    payroll.term = termFromMonth(date.getMonth());
  });
  if (payrolls.length) await payrollRepo.save(payrolls);

  const current = await feeRepo.find({ where: { school: { id: school.id } } });
  const missing: Fee[] = [];
  for (const year of [2025, 2026]) {
    for (const term of [SchoolTerm.FIRST, SchoolTerm.SECOND, SchoolTerm.THIRD]) {
      CLASS_OF_2026.forEach((person, index) => {
        if (!classInYear(person.classLevel, 2026, year)) return;
        const exists = current.some((fee) => fee.studentId === person.id && Number(fee.academicYear) === year && fee.term === term);
        if (exists) return;
        const unpaid = year === 2025 && term === SchoolTerm.THIRD && index >= 3;
        const amount = 850000 + index * 20000;
        const dueMonth = term === SchoolTerm.FIRST ? 1 : term === SchoolTerm.SECOND ? 5 : 8;
        const due = new Date(year, dueMonth, 8);
        missing.push(feeRepo.create({
          studentName: person.name,
          studentId: person.id,
          amount,
          amountPaid: unpaid ? 0 : amount,
          type: FeeType.TUITION,
          status: unpaid ? FeeStatus.PENDING : FeeStatus.PAID,
          dueDate: due,
          ...(unpaid ? {} : { paidDate: due }),
          notes: 'Term school fee',
          paymentMethod: PaymentMethod.CASH,
          academicYear: year,
          term,
          school,
        }));
      });
    }
  }
  if (missing.length) {
    await feeRepo.save(missing);
    console.log(`Created ${missing.length} term fees`);
  }

  const students = await studentRepo.find({ where: { school: { id: school.id } } });
  const withoutYear = students.filter((student) => !student.entryYear);
  withoutYear.forEach((student) => { student.entryYear = 2026; });
  if (withoutYear.length) await studentRepo.save(withoutYear);
}

function lastMonths(count: number) {
  const now = new Date();
  return Array.from({ length: count }, (_, index) => {
    const offset = count - 1 - index;
    return new Date(now.getFullYear(), now.getMonth() - offset, 8);
  });
}

async function assignPaymentMethods(
  repo: { find: Function; save: Function },
  schoolId: string,
) {
  const rows = await repo.find({ where: { school: { id: schoolId } } });
  const missing = rows.filter((row: { paymentMethod?: PaymentMethod }) => !row.paymentMethod);
  missing.forEach((row: { paymentMethod?: PaymentMethod }, index: number) => {
    row.paymentMethod = PAYMENT_METHODS[index % PAYMENT_METHODS.length];
  });
  if (missing.length) {
    await repo.save(missing);
    console.log(`Set payment method on ${missing.length} records`);
  }
}

async function ensureUser(
  repo: { findOne: Function; create: Function; save: Function },
  data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phoneNumber: string;
    school: School;
  },
) {
  const existing = await repo.findOne({ where: { email: data.email }, relations: ['school'] });
  if (existing) {
    if (!existing.school) {
      existing.school = data.school;
      await repo.save(existing);
    }
    return existing;
  }
  return repo.save(repo.create(data));
}

runSeed().catch((err) => {
  console.error('Seeding failed', err);
  process.exit(1);
});