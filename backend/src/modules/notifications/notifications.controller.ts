import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(@Req() req: any) {
    const userId = req.user.userId;
    return this.notificationsService.getNotificationsByUser(userId);
  }

  @Get('unread')
  async getUnreadNotifications(@Req() req: any) {
    const userId = req.user.userId;
    return this.notificationsService.getUnreadNotifications(userId);
  }

  @Get('count')
  async getNotificationCount(@Req() req: any) {
    const userId = req.user.userId;
    return this.notificationsService.getNotificationCount(userId);
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Post('read-all')
  async markAllAsRead(@Req() req: any) {
    const userId = req.user.userId;
    return this.notificationsService.markAllAsRead(userId);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    return this.notificationsService.deleteNotification(id);
  }

  @Delete()
  async deleteAllNotifications(@Req() req: any) {
    const userId = req.user.userId;
    return this.notificationsService.deleteAllNotifications(userId);
  }
}
