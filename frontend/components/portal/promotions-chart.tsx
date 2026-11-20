"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { apiFetch } from "@/lib/api"

const FEE_TYPES = ["tuition", "exam", "activity", "other"]

function compactAxis(value: number) {
  const amount = Math.abs(value)
  if (amount >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (amount >= 1_000) return `${Math.round(value / 1_000)}k`
  return `${Math.round(value)}`
}

export default function PromotionsChart() {
  const [data, setData] = useState(FEE_TYPES.map((type) => ({ type, amount: 0 })))

  useEffect(() => {
    apiFetch("/financial/fees")
      .then((rows: Array<{ type?: string; amountPaid?: number | string; amount?: number | string; status?: string }>) => {
        const totals = new Map(FEE_TYPES.map((type) => [type, 0]))
        for (const row of Array.isArray(rows) ? rows : []) {
          const type = (row.type || "other").toLowerCase()
          const paid = Number(row.amountPaid || 0)
          totals.set(type, (totals.get(type) || 0) + (paid || Number(row.amount || 0)))
        }
        setData(Array.from(totals.entries()).map(([type, amount]) => ({ type, amount })))
      })
      .catch(() => setData(FEE_TYPES.map((type) => ({ type, amount: 0 }))))
  }, [])

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Fee payments by type</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 11 }} width={36} domain={[0, (max: number) => (max > 0 ? max : 1)]} tickFormatter={(value) => compactAxis(Number(value))} />
            <Tooltip formatter={(value: number) => `${Math.round(Number(value))} Rwf`} />
            <Bar dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} name="Amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
