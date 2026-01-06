"use client"

import { FileText } from "lucide-react"
import ExpenseStats from "@/components/portal/expense-stats"
import ExpenseManagementTable from "@/components/portal/expense-management-table"

export default function ExpensesManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <ExpenseStats />
      <ExpenseManagementTable />
    </div>
  )
} 