"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Technology", value: 55, color: "#3b82f6" },
  { name: "Maintenance", value: 25, color: "#f97316" },
  { name: "Academic", value: 20, color: "#22c55e" },
]

const CustomLegend = () => {
  return (
    <div className="flex items-center justify-center mt-4 space-x-6">
      {data.map((entry, index) => (
        <div key={index} className="flex items-center">
          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
          <span className="text-sm text-gray-600">{entry.name}</span>
        </div>
      ))}
    </div>
  )
}

export default function BudgetOverview() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-2xl font-semibold text-gray-900">55%</span>
          </div>
        </div>
      </div>
      <CustomLegend />
    </div>
  )
}
