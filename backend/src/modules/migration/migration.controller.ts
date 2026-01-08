import { Controller, Post, UseGuards } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('migration')
@UseGuards(JwtAuthGuard)
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Post('update-staff-to-headmaster')
  async updateStaffToHeadmaster() {
    return this.migrationService.updateStaffToHeadmaster();
  }
}