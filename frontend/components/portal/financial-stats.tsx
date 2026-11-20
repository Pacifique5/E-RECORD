"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

function money(amount: number) {
  return new Intl.NumberFormat("en-RW", { maximumFractionDigits: 0 }).format(amount)
}

export default function FinancialStats() {
  const [stats, setStats] = useState([
    { title: "Total Income", value: "0", color: "text-green-600" },
    { title: "Total Expenses", value: "0", color: "text-red-600" },
    { title: "Net Profit", value: "0", color: "text-orange-600" },
    { title: "Payroll", value: "0", color: "text-gray-900" },
  ])

  useEffect(() => {
    apiFetch("/dashboard/financial-summary")
      .then((data) => {
        const income = Number(data?.totalIncome || 0)
        const expenses = Number(data?.totalExpenses || 0)
        const payroll = Number(data?.totalPayroll || 0)
        setStats([
          { title: "Total Income", value: money(income), color: "text-green-600" },
          { title: "Total Expenses", value: money(expenses), color: "text-red-600" },
          { title: "Net Profit", value: money(Number(data?.netProfit || 0)), color: "text-orange-600" },
          { title: "Payroll", value: money(payroll), color: "text-gray-900" },
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
              {stat.value} <span className="text-sm font-medium">Rwf</span>
            </div>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
