"use client";

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  relatedId?: string;
  createdAt: string;
}

const NotificationIcon = ({ type, isRead }: { type: string; isRead: boolean }) => {
  const getIconColor = () => {
    if (!isRead) {
      switch (type) {
        case 'system': return 'bg-blue-500';
        case 'fee_reminder': return 'bg-yellow-500';
        case 'expense_alert': return 'bg-red-500';
        case 'payroll_update': return 'bg-green-500';
        case 'inventory_low': return 'bg-orange-500';
        default: return 'bg-blue-500';
      }
    }
    return 'bg-gray-400';
  };

  return (
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor()}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

const NotificationItem = ({ notification, onMarkAsRead }: { notification: Notification; onMarkAsRead: (id: string) => void }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  const handleClick = async () => {
    if (!notification.isRead) {
      await onMarkAsRead(notification.id);
    }
  };

  return (
    <div 
      className={`flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
        !notification.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''
      }`}
      onClick={handleClick}
    >
      <NotificationIcon type={notification.type} isRead={notification.isRead} />
      <div className="flex-1">
        <h4 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
          {notification.title}
        </h4>
        <p className={`text-sm ${!notification.isRead ? 'text-gray-700' : 'text-gray-500'}`}>
          {notification.message}
        </p>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <span className="text-sm text-gray-500">{formatTime(notification.createdAt)}</span>
        {!notification.isRead && (
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, label, count }: { active: boolean; label: string; count?: number }) => {
  const baseClasses = "px-4 py-2 text-sm font-medium rounded-lg transition-colors";
  const activeClasses = "bg-[#1A75FF] text-white";
  const inactiveClasses = "text-gray-600 hover:bg-gray-100";

  return (
    <Link 
      href={`/admin/notifications?tab=${label.toLowerCase()}`}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
    >
      {label} {count !== undefined && `(${count})`}
    </Link>
  );
};

export default function NotificationsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <NotificationsContent />
    </Suspense>
  );
}

function NotificationsContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ unread: 0, total: 0 });

  const fetchNotifications = async () => {
    try {
      const [notificationsData, countsData] = await Promise.all([
        apiFetch('/notifications'),
        apiFetch('/notifications/count')
      ]);
      
      setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
      setCounts(countsData || { unread: 0, total: 0 });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await apiFetch(`/notifications/${notificationId}/read`, { method: 'POST' });
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
      
      // Update counts
      setCounts(prev => ({ 
        ...prev, 
        unread: Math.max(0, prev.unread - 1) 
      }));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiFetch('/notifications/read-all', { method: 'POST' });
      
      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setCounts(prev => ({ ...prev, unread: 0 }));
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Set up auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    switch (currentTab) {
      case 'unread':
        return !notification.isRead;
      case 'spam':
        return false; // No spam filtering implemented yet
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex gap-2">
              <TabButton active={currentTab === 'all'} label="All" count={counts.total} />
              <TabButton active={currentTab === 'unread'} label="Unread" count={counts.unread} />
              <TabButton active={currentTab === 'spam'} label="Spam" />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={fetchNotifications}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              {counts.unread > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  Mark All Read
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="divide-y">
          {filteredNotifications.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5zm6 10V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2z" />
              </svg>
              <p className="text-lg font-medium mb-2">No notifications</p>
              <p className="text-sm">
                {currentTab === 'unread' 
                  ? "You're all caught up! No unread notifications." 
                  : "No notifications to display."}
              </p>
            </div>
          ) : (
            <>
              <div className="px-6 py-4">
                <h2 className="text-sm font-medium text-gray-600">
                  {currentTab === 'unread' ? 'Unread Notifications' : 'All Notifications'}
                </h2>
              </div>

              {filteredNotifications.map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 