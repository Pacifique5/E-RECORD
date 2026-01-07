"use client"

export default function MoneyUsage() {
  const categories = [
    { name: "Technology", percentage: 55, color: "bg-blue-500", bgColor: "bg-blue-100" },
    { name: "Maintenance", percentage: 25, color: "bg-orange-500", bgColor: "bg-orange-100" },
    { name: "Academic", percentage: 20, color: "bg-green-500", bgColor: "bg-green-100" },
  ]

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Money Usage</h2>

      <div className="space-y-6">
        {categories.map((category, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{category.name}</span>
              <span className="text-sm text-gray-900">{category.percentage}%</span>
            </div>
            <div className={`h-2 rounded-full ${category.bgColor}`}>
              <div
                className={`h-full ${category.color} rounded-full transition-all duration-500 ease-in-out`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
