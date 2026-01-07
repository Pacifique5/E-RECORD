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
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

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

  @Delete()
  async deleteAllNotifications(@Req() req: { user: { userId: string } }) {
    return this.notificationsService.deleteAllNotifications(req.user.userId);
  }
}
