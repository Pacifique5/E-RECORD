"use client"

import DashboardStats from "@/components/portal/dashboard-stats"
import IncomeExpensesChart from "@/components/portal/income-expenses-chart"
import BudgetOverview from "@/components/portal/budget-overview"
import MoneyUsage from "@/components/portal/money-usage"
import StaffPayrollTable from "@/components/portal/staff-payroll-table"

export default function AccountantDashboard() {
  return (
    <div className="p-6 space-y-6">
      <DashboardStats />
      
      <IncomeExpensesChart />
      
      <div className="grid grid-cols-2 gap-6">
        <BudgetOverview />
        <MoneyUsage />
      </div>
      
      <StaffPayrollTable />
    </div>
  )
}
