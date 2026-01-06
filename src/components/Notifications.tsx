import { Card, CardContent } from "@/components/ui/card";
import { Header } from "./Header";
import { Bell } from "lucide-react";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    type: "info",
    message: "Your request for approval for student school fees have been updated in the system",
    time: "30 min ago",
    color: "bg-blue-500",
    isRead: false,
    isSpam: false
  },
  {
    id: 2,
    type: "warning",
    message: "10 Items in the stock are finished please add in more items in stock to be used",
    time: "30 min ago",
    color: "bg-red-500",
    isRead: false,
    isSpam: false
  },
  {
    id: 3,
    type: "info",
    message: "Your request for approval for student school fees have been updated in the system",
    time: "30 min ago",
    color: "bg-blue-500",
    isRead: true,
    isSpam: false
  },
  {
    id: 4,
    type: "success",
    message: "School Budget being added in the system successfully",
    time: "30 min ago",
    color: "bg-green-500",
    isRead: true,
    isSpam: false
  },
  {
    id: 5,
    type: "info",
    message: "Your request for approval for student school fees have been updated in the system",
    time: "30 min ago",
    color: "bg-blue-500",
    isRead: false,
    isSpam: true
  },
  {
    id: 6,
    type: "success",
    message: "School Budget being added in the system successfully",
    time: "30 min ago",
    color: "bg-green-500",
    isRead: true,
    isSpam: false
  },
  {
    id: 7,
    type: "warning",
    message: "10 Items in the stock are finished please add in more items in stock to be used",
    time: "30 min ago",
    color: "bg-red-500",
    isRead: false,
    isSpam: true
  }
];

export const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notificationsList, setNotificationsList] = useState(notifications);

  const filterNotifications = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case "unread":
        setNotificationsList(notifications.filter(n => !n.isRead));
        break;
      case "spam":
        setNotificationsList(notifications.filter(n => n.isSpam));
        break;
      default:
        setNotificationsList(notifications);
    }
  };

  const getTabCount = (tab: string) => {
    switch (tab) {
      case "unread":
        return notifications.filter(n => !n.isRead).length;
      case "spam":
        return notifications.filter(n => n.isSpam).length;
      default:
        return notifications.length;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Notifications</h1>
          
          <div className="flex space-x-8 mb-8">
            <button
              onClick={() => filterNotifications("all")}
              className={`font-medium pb-2 ${
                activeTab === "all"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              All ({getTabCount("all")})
            </button>
            <button
              onClick={() => filterNotifications("unread")}
              className={`font-medium pb-2 ${
                activeTab === "unread"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Unread ({getTabCount("unread")})
            </button>
            <button
              onClick={() => filterNotifications("spam")}
              className={`font-medium pb-2 ${
                activeTab === "spam"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Spam ({getTabCount("spam")})
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-6">Today</h2>
          
          <div className="space-y-4">
            {notificationsList.map((notification) => (
              <Card key={notification.id} className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 ${notification.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {notification.message}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 flex-shrink-0">
                      {notification.time}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
