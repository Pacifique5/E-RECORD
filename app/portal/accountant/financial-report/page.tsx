import FinancialStats from "@/components/portal/financial-stats"
import FinancialChart from "@/components/portal/financial-chart"
import FinancialInformation from "@/components/portal/financial-information"

export default function FinancialReport() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
      <FinancialStats />
      <FinancialChart />
      <FinancialInformation />
    </div>
  )
}
