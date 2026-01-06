"use client"
import { useState } from "react"
import NotificationTabs from "@/components/portal/notification-tabs"
import NotificationList from "@/components/portal/notification-list"

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all")
  return (
    <div className="bg-white rounded-lg">
      <div className="p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Notifications</h2>
        <div className="space-y-8">
          <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <NotificationList activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}
