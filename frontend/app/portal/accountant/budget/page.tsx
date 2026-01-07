"use client"

import { BarChart2 } from "lucide-react"
import BudgetStats from "@/components/portal/budget-stats"
import BudgetOverviewPage from "@/components/portal/budget-overview-page"

export default function BudgetPlanningPage() {
  return (
    <div className="p-6 space-y-6">
      <BudgetStats />
      <BudgetOverviewPage />
    </div>
  )
} 