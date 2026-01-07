"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { month: "Jan", amount: 150 },
  { month: "Feb", amount: 145 },
  { month: "Mar", amount: 155 },
  { month: "Apr", amount: 150 },
  { month: "May", amount: 160 },
  { month: "Jun", amount: 155 },
  { month: "Jul", amount: 165 },
  { month: "Aug", amount: 160 },
  { month: "Sep", amount: 170 },
  { month: "Oct", amount: 165 },
  { month: "Nov", amount: 175 },
  { month: "Dec", amount: 170 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm mt-2">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          Amount: {payload[0].value}M Rwf
        </p>
      </div>
    )
  }
  return null
}

export default function PayrollTrendChart() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="amount" 
              fill="#3b82f6" 
              name="Payroll Amount"
              radius={[4, 4, 0, 0]}
              activeBar={{ fill: "#2563eb" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
