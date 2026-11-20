"use client"

import BudgetStats from "@/components/portal/budget-stats"
import BudgetOverviewPage from "@/components/portal/budget-overview-page"

export default function BudgetPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <BudgetStats />
      <BudgetOverviewPage />
    </div>
  )
}
