"use client"

import PayrollStats from "@/components/portal/payroll-stats"
import PayrollTrendChart from "@/components/portal/payroll-trend-chart"
import StaffPayrollTable from "@/components/portal/staff-payroll-table"

export default function StaffPayroll() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-gray-900">Staff Payroll</h2>
      <div className="space-y-8">
        <PayrollStats />
        <PayrollTrendChart />
        <StaffPayrollTable />
      </div>
    </div>
  )
}
