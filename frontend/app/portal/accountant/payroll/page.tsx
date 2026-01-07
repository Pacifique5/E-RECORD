"use client"

import { Users2 } from "lucide-react"
import PayrollStats from "@/components/portal/payroll-stats"
import PayrollTrendChart from "@/components/portal/payroll-trend-chart"
import StaffPayrollTable from "@/components/portal/staff-payroll-table"

export default function StaffPayrollPage() {
  return (
    <div className="p-6 space-y-6">
      <PayrollStats />
      <PayrollTrendChart />
      <StaffPayrollTable />
    </div>
  )
} 