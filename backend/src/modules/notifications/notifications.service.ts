import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from '../../entities/notification.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createNotification(
    userId: string,
    title: string,
    message: string,
    type: NotificationType = NotificationType.SYSTEM,
    relatedId?: string,
  ): Promise<Notification> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const notification = this.notificationRepository.create({
      title,
      message,
      type,
      relatedId,
      user,
    });

    return this.notificationRepository.save(notification);
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId }, isRead: false },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found`);
    }

    notification.isRead = true;
    return this.notificationRepository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<{ message: string }> {
    await this.notificationRepository.update(
      { user: { id: userId }, isRead: false },
      { isRead: true },
    );
    return { message: 'All notifications marked as read' };
  }

  async deleteNotification(notificationId: string): Promise<{ message: string }> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found`);
    }

    await this.notificationRepository.remove(notification);
    return { message: 'Notification deleted successfully' };
  }

  async deleteAllNotifications(userId: string): Promise<{ message: string }> {
    await this.notificationRepository.delete({ user: { id: userId } });
    return { message: 'All notifications deleted successfully' };
  }

  async getNotificationCount(userId: string): Promise<{ unread: number; total: number }> {
    const total = await this.notificationRepository.count({
      where: { user: { id: userId } },
    });

    const unread = await this.notificationRepository.count({
      where: { user: { id: userId }, isRead: false },
    });

    return { unread, total };
  }
}
