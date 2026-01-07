"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { month: "Jan", income: 150, expenses: 180 },
  { month: "Feb", income: 170, expenses: 170 },
  { month: "Mar", income: 165, expenses: 175 },
  { month: "Apr", income: 180, expenses: 195 },
  { month: "May", income: 200, expenses: 225 },
  { month: "Jun", income: 210, expenses: 200 },
  { month: "Jul", income: 230, expenses: 190 },
  { month: "Aug", income: 250, expenses: 180 },
  { month: "Sep", income: 220, expenses: 170 },
  { month: "Oct", income: 200, expenses: 185 },
  { month: "Nov", income: 180, expenses: 190 },
  { month: "Dec", income: 190, expenses: 175 },
]

export default function FinancialChart() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Income Expenses chart</h2>
          <div className="mt-2">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-gray-900">170,000,000</p>
            <p className="text-sm text-gray-500">Feb</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Income</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
