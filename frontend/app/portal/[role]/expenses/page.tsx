"use client"

import ExpenseStats from "@/components/portal/expense-stats"
import ExpenseCategoryChart from "@/components/portal/expense-category-chart"
import ExpenseManagementTable from "@/components/portal/expense-management-table"

export default function ExpensesPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <ExpenseStats />
      <ExpenseCategoryChart />
      <ExpenseManagementTable />
    </div>
  )
}
