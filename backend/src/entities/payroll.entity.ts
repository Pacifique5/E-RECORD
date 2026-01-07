import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { School } from './school.entity';

export enum PayrollStatus {
  DRAFT = 'draft',
  APPROVED = 'approved',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

@Entity('payrolls')
export class Payroll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  staffName: string;

  @Column()
  staffId: string;

  @Column({ nullable: true })
  position: string;

  @Column('decimal', { precision: 10, scale: 2 })
  baseSalary: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  allowances: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  deductions: number;

  @Column('decimal', { precision: 10, scale: 2 })
  netSalary: number;

  @Column()
  payrollMonth: Date;

  @Column({
    type: 'enum',
    enum: PayrollStatus,
    default: PayrollStatus.DRAFT,
  })
  status: PayrollStatus;

  @Column({ nullable: true })
  paidDate: Date;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => School, (school) => school.payrolls)
  school: School;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
