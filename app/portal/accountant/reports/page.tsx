"use client"

import { FileBarChart2 } from "lucide-react"
import DashboardStats from "@/components/portal/dashboard-stats"
import IncomeExpensesChart from "@/components/portal/income-expenses-chart"
import BudgetOverview from "@/components/portal/budget-overview"
import FinancialStats from "@/components/portal/financial-stats"
import FinancialInformation from "@/components/portal/financial-information"

export default function FinancialReportPage() {
  const reports = [
    {
      name: "Annual Financial Report 2025",
      type: "Annual",
      date: "31/12/2025",
      status: "Pending",
      size: "2.5 MB",
    },
    {
      name: "Q4 Financial Statement",
      type: "Quarterly",
      date: "31/12/2025",
      status: "Generated",
      size: "1.8 MB",
    },
    {
      name: "November Monthly Report",
      type: "Monthly",
      date: "30/11/2025",
      status: "Generated",
      size: "1.2 MB",
    },
    {
      name: "Q3 Financial Statement",
      type: "Quarterly",
      date: "30/09/2025",
      status: "Generated",
      size: "1.7 MB",
    },
    {
      name: "Mid-Year Financial Report",
      type: "Semi-Annual",
      date: "30/06/2025",
      status: "Generated",
      size: "2.1 MB",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Generated":
        return "text-green-600 bg-green-50"
      case "Pending":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="p-6 space-y-8">
      <FinancialStats />
      <IncomeExpensesChart />
      <FinancialInformation />
    </div>
  )
} 