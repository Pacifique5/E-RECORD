"use client"

import DashboardStats from "@/components/portal/dashboard-stats"
import IncomeExpensesChart from "@/components/portal/income-expenses-chart"
import BudgetOverview from "@/components/portal/budget-overview"
import MoneyUsage from "@/components/portal/money-usage"
import StaffPayrollTable from "@/components/portal/staff-payroll-table"
import FeesManagementTable from "@/components/portal/fees-management-table"
import SchoolInfoCard from "@/components/portal/school-info-card"

export default function AccountantDashboard() {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <SchoolInfoCard />

      <DashboardStats />

      <div className="mt-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-900">School Fees Management</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">View All</button>
        </div>
        <FeesManagementTable />
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Income Expenses chart</h2>
        <IncomeExpensesChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Budget Overview</h2>
          <BudgetOverview />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Money Usage</h2>
          <MoneyUsage />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-900">Staff Payroll</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">View All</button>
        </div>
        <StaffPayrollTable />
      </div>
    </div>
  )
}
