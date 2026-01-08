import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Fee } from './fee.entity';
import { Expense } from './expense.entity';
import { Payroll } from './payroll.entity';
import { InventoryItem } from './inventory.entity';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'approved', 'rejected'

  @OneToMany(() => User, (user) => user.school)
  users: User[];

  @OneToMany(() => Fee, (fee) => fee.school)
  fees: Fee[];

  @OneToMany(() => Expense, (expense) => expense.school)
  expenses: Expense[];

  @OneToMany(() => Payroll, (payroll) => payroll.school)
  payrolls: Payroll[];

  @OneToMany(() => InventoryItem, (item) => item.school)
  inventoryItems: InventoryItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
