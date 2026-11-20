import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { School } from './school.entity';

export enum InstructorGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum InstructorSubject {
  MATHEMATICS = 'mathematics',
  PHYSICS = 'physics',
  CHEMISTRY = 'chemistry',
  BIOLOGY = 'biology',
  COMPUTER_SCIENCE = 'computer_science',
  ECONOMICS = 'economics',
  GEOGRAPHY = 'geography',
  HISTORY = 'history',
  LITERATURE = 'literature',
  FRENCH = 'french',
  ENGLISH = 'english',
  KINYARWANDA = 'kinyarwanda',
  ENTREPRENEURSHIP = 'entrepreneurship',
}

export const SCIENCE_SUBJECTS: InstructorSubject[] = [
  InstructorSubject.MATHEMATICS,
  InstructorSubject.PHYSICS,
  InstructorSubject.CHEMISTRY,
  InstructorSubject.BIOLOGY,
  InstructorSubject.COMPUTER_SCIENCE,
];

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  instructorCode: string;

  @Column({ type: 'enum', enum: InstructorGender })
  gender: InstructorGender;

  @Column()
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  alternatePhone: string | null;

  @Column({ type: 'enum', enum: InstructorSubject })
  subject: InstructorSubject;

  @ManyToOne(() => School, (school) => school.instructors, { nullable: true })
  school: School;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
