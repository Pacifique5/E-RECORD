"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { apiFetch } from "@/lib/api"

function compactAxis(value: number) {
  const amount = Math.abs(value)
  if (amount >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (amount >= 1_000) return `${Math.round(value / 1_000)}k`
  return `${Math.round(value)}`
}

export default function ExpenseCategoryChart() {
  const [data, setData] = useState<Array<{ category: string; amount: number }>>([])

  useEffect(() => {
    apiFetch("/financial/expenses")
      .then((rows: Array<{ category?: string; amount: number | string }>) => {
        const totals = new Map<string, number>()
        for (const row of Array.isArray(rows) ? rows : []) {
          const name = row.category || "Other"
          totals.set(name, (totals.get(name) || 0) + Number(row.amount || 0))
        }
        setData(Array.from(totals.entries()).map(([category, amount]) => ({ category, amount })))
      })
      .catch(() => setData([]))
  }, [])

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Expenses by category</h2>
      {data.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-sm text-gray-500">No expenses recorded yet.</div>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="category" interval={0} angle={-25} textAnchor="end" height={56} axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 11 }} width={36} domain={[0, (max: number) => (max > 0 ? max : 1)]} tickFormatter={(value) => compactAxis(Number(value))} />
              <Tooltip formatter={(value: number) => `${Math.round(Number(value))} Rwf`} />
              <Bar dataKey="amount" fill="#ef4444" radius={[4, 4, 0, 0]} name="Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
