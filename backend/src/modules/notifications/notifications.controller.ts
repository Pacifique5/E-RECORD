import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { User, UserRole } from '../../entities/user.entity';
import { Notification } from '../../entities/notification.entity';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  @Get()
  async getNotifications(@Req() req: { user: { userId: string } }) {
    return this.notificationsService.getNotificationsByUser(req.user.userId);
  }

  @Get('unread')
  async getUnreadNotifications(@Req() req: { user: { userId: string } }) {
    return this.notificationsService.getUnreadNotifications(req.user.userId);
  }

  @Get('count')
  async getNotificationCount(@Req() req: { user: { userId: string } }) {
    return this.notificationsService.getNotificationCount(req.user.userId);
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Post('read-all')
  async markAllAsRead(@Req() req: { user: { userId: string } }) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    return this.notificationsService.deleteNotification(id);
  }

  @Get('debug')
  async debugNotifications(@Req() req: { user: { userId: string } }) {
    const userId = req.user.userId;
    console.log('🔍 Debug - Current user ID:', userId);
    
    // Get all notifications for this user
    const notifications = await this.notificationsService.getNotificationsByUser(userId);
    console.log('🔍 Debug - Notifications for user:', notifications);
    
    // Get all admin users
    const adminUsers = await this.userRepository.find({ where: { role: UserRole.ADMIN } });
    console.log('🔍 Debug - All admin users:', adminUsers.map(u => ({ id: u.id, email: u.email })));
    
    // Get all notifications in the system
    const allNotifications = await this.notificationRepository.find({ relations: ['user'] });
    console.log('🔍 Debug - All notifications:', allNotifications.map(n => ({ 
      id: n.id, 
      title: n.title, 
      userId: n.user.id, 
      userEmail: n.user.email 
    })));
    
    return {
      currentUserId: userId,
      userNotifications: notifications,
      adminUsers: adminUsers.map(u => ({ id: u.id, email: u.email })),
      allNotifications: allNotifications.map(n => ({ 
        id: n.id, 
        title: n.title, 
        userId: n.user.id, 
        userEmail: n.user.email 
      }))
    };
  }
}
