"use client"

import FeesStats from "@/components/portal/fees-stats"
import PromotionsChart from "@/components/portal/promotions-chart"
import FeesManagementTable from "@/components/portal/fees-management-table"

export default function FeesManagement() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-gray-900">Fees Management</h2>
      <div className="space-y-8">
        <FeesStats />
        <PromotionsChart />
        <FeesManagementTable />
      </div>
    </div>
  )
}
