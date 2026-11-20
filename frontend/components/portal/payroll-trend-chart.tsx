"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { apiFetch } from "@/lib/api"

type Point = { month: string; amount: number }

function compactAxis(value: number) {
  const amount = Math.abs(value)
  if (amount >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (amount >= 1_000) return `${Math.round(value / 1_000)}k`
  return `${Math.round(value)}`
}

export default function PayrollTrendChart() {
  const [data, setData] = useState<Point[]>([])

  useEffect(() => {
    apiFetch("/dashboard/charts/payroll-trend")
      .then((rows: Point[]) => setData(Array.isArray(rows) ? rows : []))
      .catch(() => setData([]))
  }, [])

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Payroll Trend Overview</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 11 }} width={36} domain={[0, (max: number) => (max > 0 ? max : 1)]} tickFormatter={(value) => compactAxis(Number(value))} />
            <Tooltip formatter={(value: number) => `${Math.round(Number(value))} Rwf`} />
            <Bar dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} name="Payroll" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
