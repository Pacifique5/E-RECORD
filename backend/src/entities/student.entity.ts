import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { School } from './school.entity';

export enum StudentClass {
  S1 = 'S1',
  S2 = 'S2',
  S3 = 'S3',
  S4 = 'S4',
  S5 = 'S5',
  S6 = 'S6',
}

export enum StudentCombination {
  MCB = 'MCB',
  PCB = 'PCB',
  PCM = 'PCM',
  MPC = 'MPC',
  MEG = 'MEG',
  HEG = 'HEG',
  HGL = 'HGL',
  LF = 'LF',
}

export enum StudentGender {
  MALE = 'male',
  FEMALE = 'female',
}

export const UPPER_CLASSES: StudentClass[] = [
  StudentClass.S4,
  StudentClass.S5,
  StudentClass.S6,
];

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  studentCode: string;

  @Column({ type: 'enum', enum: StudentGender })
  gender: StudentGender;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column()
  fatherName: string;

  @Column()
  fatherPhone: string;

  @Column()
  motherName: string;

  @Column()
  motherPhone: string;

  @Column({ type: 'enum', enum: StudentClass })
  classLevel: StudentClass;

  @Column({ type: 'int', default: 2026 })
  entryYear: number;

  @Column({ type: 'enum', enum: StudentCombination, nullable: true })
  combination: StudentCombination | null;

  @ManyToOne(() => School, (school) => school.students, { nullable: true })
  school: School;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
