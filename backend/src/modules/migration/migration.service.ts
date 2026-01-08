import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';

@Injectable()
export class MigrationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updateStaffToHeadmaster() {
    const staffUsers = await this.userRepository.find({ 
      where: { role: UserRole.STAFF } 
    });

    for (const user of staffUsers) {
      user.role = UserRole.HEADMASTER;
      await this.userRepository.save(user);
    }

    return {
      message: `Updated ${staffUsers.length} staff users to headmaster`,
      count: staffUsers.length,
    };
  }
}