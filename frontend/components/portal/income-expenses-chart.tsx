"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { apiFetch } from "@/lib/api"

type Point = { month: string; income: number; expenses: number }

function compactAxis(value: number) {
  const amount = Math.abs(value)
  if (amount >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (amount >= 1_000) return `${Math.round(value / 1_000)}k`
  return `${Math.round(value)}`
}

export default function IncomeExpensesChart() {
  const [data, setData] = useState<Point[]>([])

  useEffect(() => {
    apiFetch("/dashboard/charts/income-expenses")
      .then((rows: Point[]) => setData(Array.isArray(rows) ? rows : []))
      .catch(() => setData([]))
  }, [])

  const hasActivity = data.some((point) => Number(point.income) > 0 || Number(point.expenses) > 0)

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-gray-900">Income Expenses chart</h2>
        <div className="flex items-center gap-4 sm:gap-6">
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

      {!hasActivity && (
        <p className="mb-3 text-sm text-gray-500">No income or expenses recorded yet.</p>
      )}
      <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 11 }} width={36} tickFormatter={(value) => compactAxis(Number(value))} />
              <Tooltip formatter={(value: number) => Math.round(Number(value)).toLocaleString()} />
              <Area type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} fill="url(#incomeFill)" dot={false} />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fill="url(#expenseFill)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
      </div>
    </div>
  )
}
