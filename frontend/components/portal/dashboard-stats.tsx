"use client"

import { useEffect, useState } from "react"
import { DollarSign, CreditCard, TrendingUp, BarChart3 } from "lucide-react"
import { apiFetch } from "../../lib/api"

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalFees: 0,
    totalPayrolls: 0,
    totalExpenses: 0,
    netIncome: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiFetch('/dashboard/financial-summary')
        setStats({
          totalFees: data.totalIncome || 0,
          totalPayrolls: data.totalPayroll || 0,
          totalExpenses: data.totalExpenses || 0,
          netIncome: data.netProfit || 0,
        })
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const statsData = [
    {
      title: "Total School Fees",
      value: formatCurrency(stats.totalFees),
      change: "15%",
      icon: DollarSign,
      color: "text-white",
      bgColor: "bg-blue-500",
      changeColor: "text-blue-500",
      trendIcon: TrendingUp,
    },
    {
      title: "Staff Payments",
      value: formatCurrency(stats.totalPayrolls),
      change: "15%",
      icon: CreditCard,
      color: "text-white",
      bgColor: "bg-green-500",
      changeColor: "text-green-500",
      trendIcon: TrendingUp,
    },
    {
      title: "Term Expenses",
      value: formatCurrency(stats.totalExpenses),
      change: "15%",
      icon: TrendingUp,
      color: "text-white",
      bgColor: "bg-red-500",
      changeColor: "text-red-500",
      trendIcon: TrendingUp,
    },
    {
      title: "Net Income",
      value: formatCurrency(stats.netIncome),
      change: stats.netIncome >= 0 ? "Profit" : "Loss",
      icon: BarChart3,
      color: "text-white",
      bgColor: stats.netIncome >= 0 ? "bg-green-500" : "bg-red-500",
      changeColor: stats.netIncome >= 0 ? "text-green-500" : "text-red-500",
      trendIcon: TrendingUp,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading ? (
        <div className="col-span-4 text-center py-8">Loading...</div>
      ) : (
        statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{stat.title}</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
                </div>
                {stat.change && (
                  <div className={`flex items-center ${stat.changeColor}`}>
                    <stat.trendIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{stat.change}</span>
                  </div>
                )}
              </div>
              <div className={`p-2 rounded ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
