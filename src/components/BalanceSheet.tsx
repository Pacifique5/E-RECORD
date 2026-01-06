import { Button } from "@/components/ui/button";

const balanceSheetData = {
  assets: [
    { name: "School Fees", amount: 850000 },
    { name: "School Materials", amount: 850000 },
    { name: "Equipment", amount: 850000 }
  ],
  liabilities: [
    { name: "Staff Salaries", amount: 850000 },
    { name: "Maintenance Costs", amount: 850000 },
    { name: "Utility Bills", amount: 850000 }
  ]
};

type ReportType = "profit-loss" | "cash-flow" | "balance-sheet" | "custom";

interface BalanceSheetProps {
  onReportChange: (report: ReportType) => void;
}

export const BalanceSheet = () => {
  return (
    <div className="space-y-6">
      {/* Balance Sheet Table */}
      <div className="grid grid-cols-2 gap-4">
        {/* Assets Column */}
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-sm font-medium text-gray-600">Assets</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {balanceSheetData.assets.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 text-sm text-gray-900">{item.name}</td>
                  <td className="py-4 text-sm text-gray-900">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Liabilities Column */}
        <div className="p-6 border-l">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-sm font-medium text-gray-600">Liability</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {balanceSheetData.liabilities.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 text-sm text-gray-900">{item.name}</td>
                  <td className="py-4 text-sm text-gray-900">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Net Cash Display */}
      <div className="text-lg font-medium">
        Net Cash : 1000000
      </div>
    </div>
  );
}; 