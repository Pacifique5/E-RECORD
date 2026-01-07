export default function FeesStats() {
  const stats = [
    { title: "Total School Fees Paid", value: "1000000", currency: "Rwf", color: "text-blue-600" },
    { title: "Total School UnPaid Fees", value: "1000000", currency: "Rwf", color: "text-red-600" },
    { title: "Total Student Paid", value: "1000000", color: "text-blue-600" },
    { title: "Total Student UnPaid", value: "1000000", color: "text-red-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value} {stat.currency && <span className="text-sm">{stat.currency}</span>}
            </div>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
