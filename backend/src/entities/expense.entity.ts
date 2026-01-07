import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { School } from './school.entity';

export enum ExpenseCategory {
  UTILITIES = 'utilities',
  MAINTENANCE = 'maintenance',
  SUPPLIES = 'supplies',
  PERSONNEL = 'personnel',
  TRANSPORTATION = 'transportation',
  EQUIPMENT = 'equipment',
  OTHER = 'other',
}

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ExpenseCategory,
    default: ExpenseCategory.OTHER,
  })
  category: ExpenseCategory;

  @Column()
  date: Date;

  @Column({ nullable: true })
  vendor: string;

  @Column({ nullable: true })
  invoiceNumber: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => School, (school) => school.expenses)
  school: School;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
