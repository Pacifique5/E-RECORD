"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { month: "Jan", income: 150, expenses: 180 },
  { month: "Feb", income: 170, expenses: 160 },
  { month: "Mar", income: 180, expenses: 170 },
  { month: "Apr", income: 160, expenses: 190 },
  { month: "May", income: 200, expenses: 220 },
  { month: "Jun", income: 190, expenses: 180 },
  { month: "Jul", income: 220, expenses: 170 },
  { month: "Aug", income: 240, expenses: 160 },
  { month: "Sep", income: 250, expenses: 165 },
  { month: "Oct", income: 230, expenses: 190 },
  { month: "Nov", income: 210, expenses: 170 },
  { month: "Dec", income: 200, expenses: 160 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-lg">
        <p className="text-xs text-gray-500 mb-1">This Month</p>
        <p className="text-lg font-semibold">220,342,123</p>
        <p className="text-xs text-gray-500">May</p>
      </div>
    )
  }
  return null
}

export default function IncomeExpensesChart() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Income Expenses chart</h2>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">Income</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
        </div>
      </div>

      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `${value}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
              fillOpacity={1}
              fill="url(#incomeGradient)"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
              fillOpacity={1}
              fill="url(#expensesGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
