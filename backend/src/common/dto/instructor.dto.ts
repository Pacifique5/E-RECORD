import { IsEnum, IsOptional, IsString, Matches, ValidateIf } from 'class-validator';
import { InstructorGender, InstructorSubject } from '../../entities/instructor.entity';

const NAME = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/;
const PHONE = /^07\d{8}$/;

export class CreateInstructorDto {
  @IsString()
  @Matches(NAME, { message: 'Enter a valid first name' })
  firstName: string;

  @IsString()
  @Matches(NAME, { message: 'Enter a valid last name' })
  lastName: string;

  @IsEnum(InstructorGender)
  gender: InstructorGender;

  @IsString()
  @Matches(PHONE, { message: 'Phone must be 10 digits starting with 07' })
  phone: string;

  @ValidateIf((_, value) => value !== null && value !== undefined && value !== '')
  @IsString()
  @Matches(PHONE, { message: 'Other phone must be 10 digits starting with 07' })
  alternatePhone?: string | null;

  @IsEnum(InstructorSubject)
  subject: InstructorSubject;
}

export class UpdateInstructorDto {
  @IsOptional()
  @IsString()
  @Matches(NAME, { message: 'Enter a valid first name' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @Matches(NAME, { message: 'Enter a valid last name' })
  lastName?: string;

  @IsOptional()
  @IsEnum(InstructorGender)
  gender?: InstructorGender;

  @IsOptional()
  @IsString()
  @Matches(PHONE, { message: 'Phone must be 10 digits starting with 07' })
  phone?: string;

  @ValidateIf((_, value) => value !== null && value !== undefined && value !== '')
  @IsOptional()
  @IsString()
  @Matches(PHONE, { message: 'Other phone must be 10 digits starting with 07' })
  alternatePhone?: string | null;

  @IsOptional()
  @IsEnum(InstructorSubject)
  subject?: InstructorSubject;
}

export class InstructorResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  instructorCode: string;
  gender: InstructorGender;
  phone: string;
  alternatePhone: string | null;
  subject: InstructorSubject;
  createdAt: Date;
}
