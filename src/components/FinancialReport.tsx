import { Button } from "@/components/ui/button";
import { Header } from "./Header";
import { CashFlowStatement } from "./CashFlowStatement";
import { BalanceSheet } from "./BalanceSheet";
import { ProfitAndLoss } from "./ProfitAndLoss";
import { CustomReports } from "./CustomReports";
import { useState } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from "recharts";

type ReportType = "profit-loss" | "cash-flow" | "balance-sheet" | "custom";

// Define TypeScript interfaces
interface ChartData {
  name: string;
  income: number;
  expenses: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: ChartData;
  }>;
}

// Sample data for the chart
const chartData: ChartData[] = [
  { name: "Jan", income: 150000000, expenses: 180000000 },
  { name: "Feb", income: 170000000, expenses: 165000000 },
  { name: "Mar", income: 160000000, expenses: 175000000 },
  { name: "Apr", income: 180000000, expenses: 190000000 },
  { name: "May", income: 200000000, expenses: 220000000 },
  { name: "Jun", income: 210000000, expenses: 200000000 },
  { name: "Jul", income: 230000000, expenses: 190000000 },
  { name: "Aug", income: 240000000, expenses: 180000000 },
  { name: "Sep", income: 220000000, expenses: 170000000 },
  { name: "Oct", income: 200000000, expenses: 185000000 },
  { name: "Nov", income: 180000000, expenses: 190000000 },
  { name: "Dec", income: 190000000, expenses: 180000000 }
];

// Sample data for different reports
const profitLossData = [
  { category: "School Fees", amount: "850000", type: "income" },
  { category: "School Materials", amount: "850000", type: "expense" },
  { category: "School Fees", amount: "850000", type: "income" },
  { category: "School Fees", amount: "850000", type: "expense" },
  { category: "School Fees", amount: "850000", type: "income" }
];

const cashFlowData = [
  { period: "January", inflow: "100000", outflow: "100000", netCash: "100000" },
  { period: "February", inflow: "100000", outflow: "100000", netCash: "100000" },
  { period: "March", inflow: "100000", outflow: "100000", netCash: "100000" },
  { period: "April", inflow: "100000", outflow: "100000", netCash: "100000" }
];

const balanceSheetData = {
  assets: [
    { item: "School Fees", amount: "850000" },
    { item: "School Materials", amount: "850000" },
    { item: "School Fees", amount: "850000" }
  ],
  liabilities: [
    { item: "School Fees", amount: "850000" },
    { item: "School Materials", amount: "850000" },
    { item: "School Fees", amount: "850000" }
  ]
};

const tabs = [
  "Profit and Loss Statement",
  "CashFlow Statement",
  "Balance Sheet",
  "Custom Reports"
];

export const FinancialReport = () => {
  const [activeTab, setActiveTab] = useState("profit-and-loss-statement");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedTerm, setSelectedTerm] = useState("First Term");

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-600">This Month</p>
          <p className="text-2xl font-bold">{payload[0].value.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{payload[0].payload.name}</p>
        </div>
      );
    }
    return null;
  };

  const tabNames = {
    "profit-and-loss-statement": "Profit and Loss Statement",
    "cash-flow-statement": "Cash Flow Statement",
    "balance-sheet": "Balance Sheet",
    "custom-reports": "Custom Reports"
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-8">
        {/* Financial Reports Title */}
        <h2 className="text-xl font-semibold mb-6">Financial Reports</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-2xl font-semibold text-green-500">1000000 <span className="text-sm font-normal">Rwf</span></p>
            <p className="text-sm text-gray-600 mt-1">Total Income</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-2xl font-semibold text-red-500">1000000 <span className="text-sm font-normal">Rwf</span></p>
            <p className="text-sm text-gray-600 mt-1">Total Expenses</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-2xl font-semibold text-orange-500">1000000 <span className="text-sm font-normal">Rwf</span></p>
            <p className="text-sm text-gray-600 mt-1">Net Profit</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-2xl font-semibold">1000000 <span className="text-sm font-normal text-gray-600">Rwf</span></p>
            <p className="text-sm text-gray-600 mt-1">Current Cash Balance</p>
          </div>
        </div>

        {/* Income Expenses Chart */}
        <div className="bg-white p-6 rounded-lg border mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Income Expenses chart</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  domain={[140000000, 260000000]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000000}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', r: 4 }}
                  activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', r: 4 }}
                  activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Information Section */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-xl font-medium mb-6">Financial Information</h3>
          
          {/* Report Type Tabs */}
          <div className="flex gap-4 mb-6">
            {Object.entries(tabNames).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === key
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Report Content */}
          {activeTab === "profit-and-loss-statement" && (
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Category</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profitLossData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-50">
                        <td className="py-4 text-sm text-gray-900">{item.category}</td>
                        <td className={`py-4 text-sm ${item.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                          {item.amount}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-gray-200">
                      <td className="py-4 text-sm font-medium text-gray-900">Net Profit</td>
                      <td className="py-4 text-sm font-medium text-green-500">850000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Income</span>
                      <span className="text-sm text-gray-900">55%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[55%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Expenses</span>
                      <span className="text-sm text-gray-900">45%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[45%]" />
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Action</h3>
                  <div className="flex gap-3">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                      Export Report
                    </Button>
                    <Button variant="outline" className="border-blue-600 text-blue-600">
                      Print Report
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full mt-3 border-blue-600 text-blue-600">
                    Share via gmail
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cash-flow-statement" && (
            <div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Periods</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Inflow</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Outflow</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Net Cash</th>
                  </tr>
                </thead>
                <tbody>
                  {cashFlowData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-4 text-sm text-gray-900">{item.period}</td>
                      <td className="py-4 text-sm text-green-500">{item.inflow}</td>
                      <td className="py-4 text-sm text-red-500">{item.outflow}</td>
                      <td className="py-4 text-sm text-gray-900">{item.netCash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Action</h3>
                <div className="flex gap-3">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Export Report
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600">
                    Print Report
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600">
                    Share via gmail
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "balance-sheet" && (
            <div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">Assets</h4>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Assets</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {balanceSheetData.assets.map((item, index) => (
                        <tr key={index} className="border-b border-gray-50">
                          <td className="py-4 text-sm text-gray-900">{item.item}</td>
                          <td className="py-4 text-sm text-gray-900">{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-4">Liability</h4>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Liability</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {balanceSheetData.liabilities.map((item, index) => (
                        <tr key={index} className="border-b border-gray-50">
                          <td className="py-4 text-sm text-gray-900">{item.item}</td>
                          <td className="py-4 text-sm text-gray-900">{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-lg font-medium mb-6">Net Cash : 1000000</p>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Action</h3>
                <div className="flex gap-3">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Export Report
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600">
                    Print Report
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600">
                    Share via gmail
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "custom-reports" && (
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-6">Report Preparement</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select report fields
                    </label>
                    <select className="w-full px-4 py-2 border rounded-md bg-white">
                      <option>Report field</option>
                    </select>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        Academic <button className="ml-2 text-gray-500">&times;</button>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select time range
                    </label>
                    <div className="flex gap-4">
                      <input type="date" className="px-4 py-2 border rounded-md bg-white" />
                      <input type="date" className="px-4 py-2 border rounded-md bg-white" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                      Download Report
                    </Button>
                    <Button variant="outline" className="border-blue-600 text-blue-600">
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-6">Preview</h3>
                <div className="bg-gray-100 rounded-lg h-[400px]"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
