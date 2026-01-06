"use client"

import { Dispatch, SetStateAction } from "react"

export default function NotificationTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: Dispatch<SetStateAction<string>> }) {
  const tabs = [
    { id: "all", label: "All", count: 7 },
    { id: "unread", label: "Unread", count: 4 },
    { id: "spam", label: "Spam", count: 2 },
  ]

  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  )
}
