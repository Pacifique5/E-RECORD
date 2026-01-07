import { TrendingUp } from "lucide-react"

export default function BudgetStats() {
  const stats = [
    { value: "1000000", currency: "Rwf", change: "15%", color: "text-blue-600" },
    { value: "1000000", currency: "Rwf", change: "15%", color: "text-blue-600" },
    { value: "1000000", currency: "Rwf", change: "15%", color: "text-blue-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value} <span className="text-sm">{stat.currency}</span>
            </div>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
