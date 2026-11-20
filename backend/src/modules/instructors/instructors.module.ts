import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from '../../entities/instructor.entity';
import { User } from '../../entities/user.entity';
import { InstructorsController } from './instructors.controller';
import { InstructorsService } from './instructors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Instructor, User])],
  controllers: [InstructorsController],
  providers: [InstructorsService],
})
export class InstructorsModule {}
