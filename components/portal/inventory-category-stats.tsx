export default function InventoryCategoryStats() {
  const categories = [
    { title: "Technology Items", value: "50", color: "text-blue-600" },
    { title: "Academic Items", value: "30", color: "text-green-600" },
    { title: "Maintenance", value: "14", color: "text-orange-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <div className={`text-3xl font-bold ${category.color} mb-2`}>{category.value}</div>
            <p className="text-sm text-gray-600">{category.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
