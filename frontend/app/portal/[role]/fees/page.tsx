"use client"

import FeesStats from "@/components/portal/fees-stats"
import PromotionsChart from "@/components/portal/promotions-chart"
import FeesManagementTable from "@/components/portal/fees-management-table"

export default function FeesPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <FeesStats />
      <PromotionsChart />
      <FeesManagementTable />
    </div>
  )
}
