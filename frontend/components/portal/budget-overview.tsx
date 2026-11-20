"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { apiFetch } from "@/lib/api"

const COLORS = ["#2563eb", "#22c55e", "#f97316", "#8b5cf6", "#06b6d4", "#eab308"]

type Slice = { name: string; value: number; color: string }

export default function BudgetOverview() {
  const [data, setData] = useState<Slice[]>([])

  useEffect(() => {
    apiFetch("/financial/expenses")
      .then((rows: Array<{ category?: string; amount: number | string }>) => {
        const totals = new Map<string, number>()
        for (const row of Array.isArray(rows) ? rows : []) {
          const name = row.category || "Other"
          totals.set(name, (totals.get(name) || 0) + Number(row.amount || 0))
        }
        setData(
          Array.from(totals.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([name, value], index) => ({
              name,
              value,
              color: COLORS[index % COLORS.length],
            }))
        )
      })
      .catch(() => setData([]))
  }, [])

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-2">Budget Overview</h2>
      {data.length === 0 ? (
        <div className="h-[260px] flex items-center justify-center text-sm text-gray-500">
          No expenses recorded yet.
        </div>
      ) : (
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name }) => name}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
