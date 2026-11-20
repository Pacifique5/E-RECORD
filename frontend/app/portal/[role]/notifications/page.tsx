"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"
import NotificationTabs from "@/components/portal/notification-tabs"
import NotificationList, { PortalNotification } from "@/components/portal/notification-list"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [items, setItems] = useState<PortalNotification[]>([])

  useEffect(() => {
    apiFetch("/notifications")
      .then((data: PortalNotification[]) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
  }, [])

  const counts = {
    all: items.length,
    unread: items.filter((item) => !item.isRead).length,
    seen: items.filter((item) => item.isRead).length,
  }

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <h2 className="mb-6 text-xl font-semibold text-gray-900 sm:mb-8 sm:text-2xl">Notifications</h2>
      <div className="space-y-8">
        <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />
        <NotificationList activeTab={activeTab} items={items} />
      </div>
    </div>
  )
}
