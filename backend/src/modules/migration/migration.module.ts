import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [MigrationController],
  providers: [MigrationService],
})
export class MigrationModule {}