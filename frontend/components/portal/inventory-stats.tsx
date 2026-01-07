export default function InventoryStats() {
  const stats = [
    { title: "Total Items", value: "50", color: "text-blue-600" },
    { title: "In Stock", value: "30", color: "text-green-600" },
    { title: "Low in Stock", value: "14", color: "text-orange-600" },
    { title: "Finished in Stock", value: "10", color: "text-red-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg- rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
