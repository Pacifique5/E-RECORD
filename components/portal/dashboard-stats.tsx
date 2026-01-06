import { DollarSign, CreditCard, TrendingUp, BarChart3 } from "lucide-react"

export default function DashboardStats() {
  const stats = [
    {
      title: "Total School Fees",
      value: "1000000",
      currency: "Rwf",
      change: "15%",
      icon: DollarSign,
      color: "text-white",
      bgColor: "bg-blue-500",
      changeColor: "text-blue-500",
      trendIcon: TrendingUp,
    },
    {
      title: "Staff Payments",
      value: "1000000",
      currency: "Rwf",
      change: "15%",
      icon: CreditCard,
      color: "text-white",
      bgColor: "bg-green-500",
      changeColor: "text-green-500",
      trendIcon: TrendingUp,
    },
    {
      title: "Term Expenses",
      value: "1000000",
      currency: "Rwf",
      change: "15%",
      icon: TrendingUp,
      color: "text-white",
      bgColor: "bg-red-500",
      changeColor: "text-red-500",
      trendIcon: TrendingUp,
    },
    {
      title: "Total Budget Usage",
      value: "85",
      currency: "%",
      status: "Used",
      icon: BarChart3,
      color: "text-white",
      bgColor: "bg-orange-500",
      statusColor: "bg-orange-100 text-orange-800",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{stat.title}</p>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
                <span className="text-sm text-gray-500">{stat.currency}</span>
              </div>
              {stat.change && (
                <div className={`flex items-center ${stat.changeColor}`}>
                  <stat.trendIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{stat.change}</span>
                </div>
              )}
              {stat.status && (
                <div className="mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${stat.statusColor}`}>
                    {stat.status}
                  </span>
                </div>
              )}
            </div>
            <div className={`p-2 rounded ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
