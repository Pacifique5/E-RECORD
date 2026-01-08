import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from '../../entities/school.entity';
import { User } from '../../entities/user.entity';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([School, User]),
    NotificationsModule
  ],
  providers: [SchoolsService],
  controllers: [SchoolsController],
  exports: [SchoolsService],
})
export class SchoolsModule {}
