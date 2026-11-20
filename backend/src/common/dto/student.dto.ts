import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, Min, ValidateIf } from 'class-validator';
import { StudentClass, StudentCombination, StudentGender, UPPER_CLASSES } from '../../entities/student.entity';

const NAME = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/;
const PHONE = /^07\d{8}$/;

export class CreateStudentDto {
  @IsString()
  @Matches(NAME, { message: 'Enter a valid first name' })
  firstName: string;

  @IsString()
  @Matches(NAME, { message: 'Enter a valid last name' })
  lastName: string;

  @IsEnum(StudentGender)
  gender: StudentGender;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  @Matches(NAME, { message: "Enter the father's name" })
  fatherName: string;

  @IsString()
  @Matches(PHONE, { message: "Father's phone must be 10 digits starting with 07" })
  fatherPhone: string;

  @IsString()
  @Matches(NAME, { message: "Enter the mother's name" })
  motherName: string;

  @IsString()
  @Matches(PHONE, { message: "Mother's phone must be 10 digits starting with 07" })
  motherPhone: string;

  @IsEnum(StudentClass)
  classLevel: StudentClass;

  @IsInt()
  @Min(2020)
  @Max(2035)
  entryYear: number;

  @ValidateIf((student) => UPPER_CLASSES.includes(student.classLevel))
  @IsEnum(StudentCombination)
  @IsNotEmpty()
  combination?: StudentCombination;
}

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @Matches(NAME, { message: 'Enter a valid first name' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @Matches(NAME, { message: 'Enter a valid last name' })
  lastName?: string;

  @IsOptional()
  @IsEnum(StudentGender)
  gender?: StudentGender;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  @Matches(NAME, { message: "Enter the father's name" })
  fatherName?: string;

  @IsOptional()
  @IsString()
  @Matches(PHONE, { message: "Father's phone must be 10 digits starting with 07" })
  fatherPhone?: string;

  @IsOptional()
  @IsString()
  @Matches(NAME, { message: "Enter the mother's name" })
  motherName?: string;

  @IsOptional()
  @IsString()
  @Matches(PHONE, { message: "Mother's phone must be 10 digits starting with 07" })
  motherPhone?: string;

  @IsOptional()
  @IsEnum(StudentClass)
  classLevel?: StudentClass;

  @IsOptional()
  @IsInt()
  @Min(2020)
  @Max(2035)
  entryYear?: number;

  @IsOptional()
  @IsEnum(StudentCombination)
  combination?: StudentCombination | null;
}

export class StudentResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  studentCode: string;
  gender: StudentGender;
  dateOfBirth: string;
  fatherName: string;
  fatherPhone: string;
  motherName: string;
  motherPhone: string;
  classLevel: StudentClass;
  entryClass: StudentClass;
  entryYear: number;
  enrolled: boolean;
  combination: StudentCombination | null;
  createdAt: Date;
}
