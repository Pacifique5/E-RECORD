"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { class: "Senior One", paid: 150, unpaid: 100 },
  { class: "Senior Two", paid: 140, unpaid: 90 },
  { class: "Senior Three", paid: 160, unpaid: 110 },
  { class: "Senior Four", paid: 145, unpaid: 95 },
  { class: "Senior Five", paid: 155, unpaid: 85 },
  { class: "Senior Six", paid: 165, unpaid: 90 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Paid: {payload[0].value} Students
          </p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Unpaid: {payload[1].value} Students
          </p>
        </div>
      </div>
    )
  }
  return null
}

export default function PromotionsChart() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Promotions Payment Statistics</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Paid Students</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">UnPaid Students</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="class" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="paid" 
              fill="#3b82f6" 
              name="Paid Students"
              radius={[4, 4, 0, 0]}
              activeBar={{ fill: "#2563eb" }}
            />
            <Bar 
              dataKey="unpaid" 
              fill="#ef4444" 
              name="UnPaid Students"
              radius={[4, 4, 0, 0]}
              activeBar={{ fill: "#dc2626" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
