"use client"

import ExpenseStats from "@/components/portal/expense-stats"
import ExpenseManagementTable from "@/components/portal/expense-management-table"

export default function ExpenseManagement() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-gray-900">Expense Management</h2>
      <div className="space-y-8">
        <ExpenseStats />
        <ExpenseManagementTable />
      </div>
    </div>
  )
}
