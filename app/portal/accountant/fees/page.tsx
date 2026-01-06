"use client"

import { DollarSign } from "lucide-react"
import FeesStats from "@/components/portal/fees-stats"
import PromotionsChart from "@/components/portal/promotions-chart"
import FeesManagementTable from "@/components/portal/fees-management-table"

export default function FeesManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <FeesStats />
      <PromotionsChart />
      <FeesManagementTable />
    </div>
  )
} 