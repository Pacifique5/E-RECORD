"use client"

import BudgetStats from "@/components/portal/budget-stats"
import BudgetOverviewPage from "@/components/portal/budget-overview-page"

export default function BudgetPlanning() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-gray-900">Budget Planning</h2>
      <div className="space-y-8">
        <BudgetStats />
        <BudgetOverviewPage />
      </div>
    </div>
  )
}
