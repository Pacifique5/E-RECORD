"use client"

import { Dispatch, SetStateAction } from "react"

export default function NotificationTabs({
  activeTab,
  setActiveTab,
  counts,
}: {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  counts: { all: number; unread: number; seen: number }
}) {
  const tabs = [
    { id: "all", label: "All", count: counts.all },
    { id: "unread", label: "Unread", count: counts.unread },
    { id: "seen", label: "Seen", count: counts.seen },
  ]

  return (
    <div className="flex space-x-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-3 text-sm font-medium ${
            activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  )
}
