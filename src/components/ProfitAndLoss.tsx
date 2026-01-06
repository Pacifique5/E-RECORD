import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BudgetOverview } from "./BudgetOverview";

const reportData = [
  { category: "School Fees", amount: "850000", type: "income" },
  { category: "School Materials", amount: "850000", type: "expense" },
  { category: "Staff Salaries", amount: "750000", type: "expense" },
  { category: "Donations", amount: "450000", type: "income" },
  { category: "Maintenance", amount: "350000", type: "expense" }
];

export const ProfitAndLoss = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Left side - Profit and Loss Table */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-50">
                    <td className="py-4 text-sm text-gray-900">{item.category}</td>
                    <td className={`py-4 text-sm font-medium ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.amount}
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-gray-100 font-semibold">
                  <td className="py-4 text-sm text-gray-900">Net Profit</td>
                  <td className="py-4 text-sm text-green-600">850000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side - Budget Overview */}
        <div className="col-span-1">
          <BudgetOverview />
        </div>
      </div>
    </div>
  );
}; 