"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const NotificationIcon = ({ color = "#1A75FF" }: { color?: string }) => {
  return (
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color === "#1A75FF" ? "blue" : color === "#F04438" ? "red" : "green"}-500`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

const NotificationItem = ({ color, time }: { color: string; time: string }) => {
  return (
    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
      <NotificationIcon color={color} />
      <div className="flex-1">
        <p className="text-gray-900">Rwanda coding academy made a request to use e-record system</p>
      </div>
      <span className="text-sm text-gray-500">{time}</span>
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
      {label} {count && `(${count})`}
    </Link>
  );
};

export default function NotificationsPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';

  const notifications = [
    { color: "#1A75FF", time: "30 min ago" },
    { color: "#F04438", time: "30 min ago" },
    { color: "#1A75FF", time: "30 min ago" },
    { color: "#00BA34", time: "30 min ago" },
    { color: "#1A75FF", time: "30 min ago" },
    { color: "#00BA34", time: "30 min ago" },
    { color: "#1A75FF", time: "30 min ago" },
    { color: "#00BA34", time: "30 min ago" },
    { color: "#F04438", time: "30 min ago" },
  ];

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="px-6 py-4 flex gap-2">
            <TabButton active={currentTab === 'all'} label="All" count={20} />
            <TabButton active={currentTab === 'unread'} label="Unread" />
            <TabButton active={currentTab === 'spam'} label="Spam" />
          </div>
        </div>

        <div className="divide-y">
          <div className="px-6 py-4">
            <h2 className="text-sm font-medium text-gray-600">Today</h2>
          </div>

          {notifications.map((notification, index) => (
            <NotificationItem 
              key={index}
              color={notification.color}
              time={notification.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 