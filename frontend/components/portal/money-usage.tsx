"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

const COLORS = ["bg-blue-600", "bg-green-500", "bg-orange-500", "bg-purple-500", "bg-cyan-500"]

export default function MoneyUsage() {
  const [categories, setCategories] = useState<Array<{ name: string; percentage: number; color: string }>>([])

  useEffect(() => {
    apiFetch("/financial/expenses")
      .then((rows: Array<{ category?: string; amount: number | string }>) => {
        const totals = new Map<string, number>()
        for (const row of Array.isArray(rows) ? rows : []) {
          const name = row.category || "Other"
          totals.set(name, (totals.get(name) || 0) + Number(row.amount || 0))
        }
        const total = Array.from(totals.values()).reduce((sum, value) => sum + value, 0)
        setCategories(
          Array.from(totals.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([name, value], index) => ({
              name,
              percentage: total ? Math.round((value / total) * 100) : 0,
              color: COLORS[index % COLORS.length],
            }))
        )
      })
      .catch(() => setCategories([]))
  }, [])

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-6">Money Usage</h2>
      {categories.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center text-sm text-gray-500">
          No spending recorded yet.
        </div>
      ) : (
        <div className="space-y-5">
          {categories.map((category) => (
            <div key={category.name} className="grid grid-cols-[minmax(0,5.5rem)_1fr_2.5rem] items-center gap-2 sm:grid-cols-[120px_1fr_40px] sm:gap-3">
              <span className="text-sm text-gray-600 capitalize truncate">{category.name}</span>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className={`h-2 rounded-full ${category.color}`} style={{ width: `${category.percentage}%` }} />
              </div>
              <span className="text-sm text-gray-500 text-right">{category.percentage}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
