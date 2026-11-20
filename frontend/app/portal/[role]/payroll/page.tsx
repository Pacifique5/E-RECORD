"use client"

import PayrollStats from "@/components/portal/payroll-stats"
import PayrollTrendChart from "@/components/portal/payroll-trend-chart"
import StaffPayrollTable from "@/components/portal/staff-payroll-table"

export default function PayrollPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <PayrollStats />
      <PayrollTrendChart />
      <StaffPayrollTable />
    </div>
  )
}
