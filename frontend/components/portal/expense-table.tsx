"use client"

export default function ExpenseTable() {
  const expenses = [
    {
      name: "Office Supplies",
      category: "Supplies",
      amount: "250000 Rwf",
      date: "10/5/2025",
      status: "Paid",
      paymentMethod: "Bank Transfer",
    },
    {
      name: "Equipment Maintenance",
      category: "Maintenance",
      amount: "450000 Rwf",
      date: "10/5/2025",
      status: "Pending",
      paymentMethod: "Bank Transfer",
    },
    {
      name: "Staff Training",
      category: "Training",
      amount: "350000 Rwf",
      date: "10/5/2025",
      status: "Paid",
      paymentMethod: "Bank Transfer",
    },
    {
      name: "Utilities",
      category: "Services",
      amount: "550000 Rwf",
      date: "10/5/2025",
      status: "Failed",
      paymentMethod: "Bank Transfer",
    },
    {
      name: "Building Repairs",
      category: "Maintenance",
      amount: "850000 Rwf",
      date: "10/5/2025",
      status: "Paid",
      paymentMethod: "Bank Transfer",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-blue-600"
      case "Pending":
        return "text-orange-600"
      case "Failed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Expense Management</h2>
          <p className="text-sm text-gray-600 mt-1">Total expenses : 2450000 Rwf</p>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-500">Expense Name</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Category</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Amount</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Payment Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td className="py-3 text-sm text-gray-900">{expense.name}</td>
                <td className="py-3 text-sm text-gray-600">{expense.category}</td>
                <td className="py-3 text-sm text-gray-900">{expense.amount}</td>
                <td className="py-3 text-sm text-gray-600">{expense.date}</td>
                <td className="py-3">
                  <span className={`text-sm font-medium ${getStatusColor(expense.status)}`}>
                    {expense.status}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-600">{expense.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 