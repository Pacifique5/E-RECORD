"use client"

import { Bell } from "lucide-react"

export type PortalNotification = {
  id: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: string
}

function colorFor(type: string) {
  if (type === "expense_alert" || type === "inventory_low") return "bg-red-500"
  if (type === "payroll_update") return "bg-green-500"
  if (type === "fee_reminder") return "bg-orange-500"
  return "bg-blue-500"
}

function timeAgo(value: string) {
  const date = new Date(value)
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
  if (Number.isNaN(minutes)) return ""
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} min ago`
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`
  return date.toLocaleDateString()
}

export default function NotificationList({
  activeTab,
  items,
}: {
  activeTab: string
  items: PortalNotification[]
}) {
  const filtered =
    activeTab === "unread" ? items.filter((item) => !item.isRead) : activeTab === "seen" ? items.filter((item) => item.isRead) : items

  return (
    <div className="space-y-6">
      <div className="text-base font-medium text-gray-900">Today</div>
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-10 text-center text-sm text-gray-500">
          No notifications.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((notification) => (
            <div key={notification.id} className="flex items-center border border-gray-200 rounded-lg px-4 py-4 gap-4 bg-white">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorFor(notification.type)}`}>
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-sm text-gray-900 text-left">
                <p className="font-medium">{notification.title}</p>
                <p className="text-gray-600">{notification.message}</p>
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0">{timeAgo(notification.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
