import { Bell } from "lucide-react"

export default function NotificationList({ activeTab }: { activeTab: string }) {
  const notifications = [
    {
      type: "info",
      message: "Your request for approval for student school fees have been updated in the system",
      time: "30 min ago",
      color: "bg-blue-500",
    },
    {
      type: "warning",
      message: "10 Items in the stock are finished please add in more items in stock to be used",
      time: "30 min ago",
      color: "bg-red-500",
    },
    {
      type: "info",
      message: "Your request for approval for student school fees have been updated in the system",
      time: "30 min ago",
      color: "bg-blue-500",
    },
    {
      type: "success",
      message: "School Budget being added in the system successfully",
      time: "30 min ago",
      color: "bg-green-500",
    },
    {
      type: "info",
      message: "Your request for approval for student school fees have been updated in the system",
      time: "30 min ago",
      color: "bg-blue-500",
    },
    {
      type: "success",
      message: "School Budget being added in the system successfully",
      time: "30 min ago",
      color: "bg-green-500",
    },
    {
      type: "warning",
      message: "10 Items in the stock are finished please add in more items in stock to be used",
      time: "30 min ago",
      color: "bg-red-500",
    },
  ]

  let filtered = notifications
  if (activeTab === "unread") {
    filtered = notifications.filter(n => n.type === "info" || n.type === "success")
  } else if (activeTab === "spam") {
    filtered = notifications.filter(n => n.type === "warning")
  }

  return (
    <div className="space-y-6">
      <div className="text-base font-medium text-gray-900">Today</div>
      <div className="space-y-4">
        {filtered.map((notification, index) => (
          <div
            key={index}
            className="flex items-center border border-gray-200 rounded-lg px-4 py-4 gap-4 bg-white"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${notification.color}`}>
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-sm text-gray-900 text-left">
              {notification.message}
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
