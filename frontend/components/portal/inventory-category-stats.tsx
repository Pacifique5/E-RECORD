"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { apiFetch } from "@/lib/api"

export default function InventoryCategoryStats() {
  const [categories, setCategories] = useState<Array<{ name: string; items: number }>>([])

  useEffect(() => {
    apiFetch("/inventory")
      .then((rows: Array<{ category?: string }>) => {
        const totals = new Map<string, number>()
        for (const row of Array.isArray(rows) ? rows : []) {
          const name = row.category || "Uncategorized"
          totals.set(name, (totals.get(name) || 0) + 1)
        }
        setCategories(Array.from(totals.entries()).map(([name, items]) => ({ name, items })))
      })
      .catch(() => setCategories([]))
  }, [])

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Items by category</h3>
      {categories.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-sm text-gray-500">No inventory categories yet.</div>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categories}>
              <CartesianGrid vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" interval={0} angle={-25} textAnchor="end" height={56} axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} width={32} />
              <Tooltip />
              <Bar dataKey="items" fill="#2563eb" radius={[4, 4, 0, 0]} name="Items" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
