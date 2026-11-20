"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

function money(amount: number) {
  return new Intl.NumberFormat("en-RW", { maximumFractionDigits: 0 }).format(amount)
}

export default function ExpenseStats() {
  const [stats, setStats] = useState([
    { title: "Total School Expenses", value: "0", currency: "Rwf", color: "text-blue-600" },
    { title: "This month", value: "0", currency: "Rwf", color: "text-orange-600" },
    { title: "Average expense", value: "0", currency: "Rwf", color: "text-blue-600" },
    { title: "Total transactions", value: "0", color: "text-green-600" },
  ])

  useEffect(() => {
    apiFetch("/financial/expenses")
      .then((data: Array<{ amount: number | string; date: string }>) => {
        const rows = Array.isArray(data) ? data : []
        const now = new Date()
        const total = rows.reduce((sum, row) => sum + Number(row.amount || 0), 0)
        const thisMonth = rows
          .filter((row) => {
            const date = new Date(row.date)
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
          })
          .reduce((sum, row) => sum + Number(row.amount || 0), 0)
        setStats([
          { title: "Total School Expenses", value: money(total), currency: "Rwf", color: "text-blue-600" },
          { title: "This month", value: money(thisMonth), currency: "Rwf", color: "text-orange-600" },
          { title: "Average expense", value: money(rows.length ? total / rows.length : 0), currency: "Rwf", color: "text-blue-600" },
          { title: "Total transactions", value: String(rows.length), color: "text-green-600" },
        ])
      })
      .catch(() => {})
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value} {stat.currency && <span className="text-sm font-medium">{stat.currency}</span>}
            </div>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
