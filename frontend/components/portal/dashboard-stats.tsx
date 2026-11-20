"use client"

import { useEffect, useState } from "react"
import { BarChart3, CreditCard, DollarSign, Receipt, TrendingDown, TrendingUp } from "lucide-react"
import { apiFetch } from "@/lib/api"
import LoadingSpinner from "@/components/loading-spinner"

function formatRwf(amount: number) {
  return `${Math.round(amount).toLocaleString("en-US")} Rwf`
}

function monthChange(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : 100
  return Math.round(((current - previous) / Math.abs(previous)) * 100)
}

export default function DashboardStats() {
  const [fees, setFees] = useState(0)
  const [payroll, setPayroll] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [trends, setTrends] = useState({ fees: 0, payroll: 0, expenses: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      apiFetch("/dashboard/financial-summary"),
      apiFetch("/dashboard/charts/income-expenses").catch(() => []),
      apiFetch("/dashboard/charts/payroll-trend").catch(() => []),
    ])
      .then(([summary, months, payrollMonths]) => {
        setFees(Number(summary?.totalIncome || 0))
        setPayroll(Number(summary?.totalPayroll || 0))
        setExpenses(Number(summary?.totalExpenses || 0))

        const series = Array.isArray(months) ? months : []
        const latest = series[series.length - 1]
        const prior = series[series.length - 2]
        const paySeries = Array.isArray(payrollMonths) ? payrollMonths : []
        const latestPay = paySeries[paySeries.length - 1]
        const priorPay = paySeries[paySeries.length - 2]
        setTrends({
          fees: latest && prior ? monthChange(Number(latest.income || 0), Number(prior.income || 0)) : 0,
          expenses: latest && prior ? monthChange(Number(latest.expenses || 0), Number(prior.expenses || 0)) : 0,
          payroll:
            latestPay && priorPay
              ? monthChange(Number(latestPay.amount || latestPay.total || 0), Number(priorPay.amount || priorPay.total || 0))
              : 0,
        })
      })
      .catch(() => {
        setFees(0)
        setPayroll(0)
        setExpenses(0)
      })
      .finally(() => setLoading(false))
  }, [])

  const usage = fees > 0 ? Math.round(((expenses + payroll) / fees) * 100) : 0

  const cards = [
    {
      title: "Total School Fees",
      value: formatRwf(fees),
      trend: trends.fees,
      trendClass: "text-green-500",
      icon: DollarSign,
      iconClass: "bg-blue-600",
    },
    {
      title: "Staff Payments",
      value: formatRwf(payroll),
      trend: trends.payroll,
      trendClass: "text-green-500",
      icon: CreditCard,
      iconClass: "bg-green-500",
    },
    {
      title: "Term Expenses",
      value: formatRwf(expenses),
      trend: trends.expenses,
      trendClass: "text-red-500",
      icon: Receipt,
      iconClass: "bg-red-500",
    },
  ]

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const rising = card.trend >= 0
        const TrendIcon = rising ? TrendingUp : TrendingDown
        return (
          <div key={card.title} className="bg-white rounded-xl border border-gray-100 px-5 py-4">
            <p className="text-sm text-gray-500">{card.title}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="min-w-0 text-lg font-semibold leading-tight text-gray-900 sm:text-xl">{card.value}</p>
              <div className={`shrink-0 h-9 w-9 rounded-md flex items-center justify-center text-white ${card.iconClass}`}>
                <card.icon className="h-4 w-4" />
              </div>
            </div>
            <p className={`mt-2 flex items-center text-sm font-medium ${card.trendClass}`}>
              <TrendIcon className="h-4 w-4 mr-1" />
              {Math.abs(card.trend)}%
            </p>
          </div>
        )
      })}

      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-gray-500">Total Budget Usage</p>
          <div className="shrink-0 h-9 w-9 rounded-md bg-orange-500 flex items-center justify-center text-white">
            <BarChart3 className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <p className="text-2xl font-semibold text-gray-900">{usage}%</p>
          <span className="bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">Used</span>
        </div>
      </div>
    </div>
  )
}
