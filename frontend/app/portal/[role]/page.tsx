"use client"

import { useParams } from "next/navigation"
import DashboardStats from "@/components/portal/dashboard-stats"
import IncomeExpensesChart from "@/components/portal/income-expenses-chart"
import BudgetOverview from "@/components/portal/budget-overview"
import MoneyUsage from "@/components/portal/money-usage"
import { DashboardFeesTable, DashboardPayrollTable } from "@/components/portal/dashboard-tables"

export default function PortalDashboardPage() {
  const params = useParams<{ role: string }>()
  const role = params.role || "accountant"

  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
      <DashboardStats />
      <DashboardFeesTable role={role} />
      <IncomeExpensesChart />
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-gray-100 bg-white p-4 sm:gap-8 sm:p-6 lg:grid-cols-2">
        <BudgetOverview />
        <MoneyUsage />
      </div>
      <DashboardPayrollTable role={role} />
    </div>
  )
}
