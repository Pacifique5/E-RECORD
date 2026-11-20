"use client"

import { useEffect, useState } from "react"
import { BarChart3, TrendingUp, Wallet } from "lucide-react"
import { apiFetch } from "@/lib/api"

function formatRwf(amount: number) {
  return `${Math.round(amount)} Rwf`
}

export default function BudgetStats() {
  const [income, setIncome] = useState(0)
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    apiFetch("/dashboard/financial-summary")
      .then((data) => {
        setIncome(Number(data?.totalIncome || 0))
        setSpent(Number(data?.totalExpenses || 0) + Number(data?.totalPayroll || 0))
      })
      .catch(() => {
        setIncome(0)
        setSpent(0)
      })
  }, [])

  const remaining = Math.max(income - spent, 0)
  const cards = [
    { title: "Total School Budget", value: formatRwf(income), icon: BarChart3, iconClass: "bg-blue-600" },
    { title: "Total Spend", value: formatRwf(spent), icon: Wallet, iconClass: "bg-red-500" },
    { title: "Total Remaining", value: formatRwf(remaining), icon: TrendingUp, iconClass: "bg-green-500" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">{card.value}</p>
          </div>
          <div className={`shrink-0 h-9 w-9 rounded-md flex items-center justify-center text-white ${card.iconClass}`}>
            <card.icon className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  )
}
