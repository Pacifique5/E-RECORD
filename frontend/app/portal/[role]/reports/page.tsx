"use client"

import IncomeExpensesChart from "@/components/portal/income-expenses-chart"
import FinancialStats from "@/components/portal/financial-stats"
import FinancialInformation from "@/components/portal/financial-information"

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
      <FinancialStats />
      <IncomeExpensesChart />
      <FinancialInformation />
    </div>
  )
}
