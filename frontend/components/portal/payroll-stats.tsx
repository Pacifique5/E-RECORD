"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

type PayrollRow = {
  netSalary: number | string
  status: string
  payrollMonth: string
  staffId: string
}

function money(amount: number) {
  return new Intl.NumberFormat("en-RW", { maximumFractionDigits: 0 }).format(amount)
}

export default function PayrollStats() {
  const [stats, setStats] = useState([
    { title: "Total Payroll", value: "0", currency: "Rwf", color: "text-blue-600" },
    { title: "Paid This Month", value: "0", currency: "Rwf", color: "text-green-600" },
    { title: "Pending Payments", value: "0", currency: "Rwf", color: "text-orange-600" },
    { title: "Total Staff", value: "0", color: "text-gray-900" },
  ])

  useEffect(() => {
    apiFetch("/financial/payrolls")
      .then((data: PayrollRow[]) => {
        const rows = Array.isArray(data) ? data : []
        const now = new Date()
        const total = rows.reduce((sum, row) => sum + Number(row.netSalary || 0), 0)
        const paidThisMonth = rows
          .filter((row) => {
            const date = new Date(row.payrollMonth)
            return (
              row.status === "paid" &&
              date.getMonth() === now.getMonth() &&
              date.getFullYear() === now.getFullYear()
            )
          })
          .reduce((sum, row) => sum + Number(row.netSalary || 0), 0)
        const pending = rows
          .filter((row) => row.status !== "paid" && row.status !== "cancelled")
          .reduce((sum, row) => sum + Number(row.netSalary || 0), 0)
        const staff = new Set(rows.map((row) => row.staffId)).size

        setStats([
          { title: "Total Payroll", value: money(total), currency: "Rwf", color: "text-blue-600" },
          { title: "Paid This Month", value: money(paidThisMonth), currency: "Rwf", color: "text-green-600" },
          { title: "Pending Payments", value: money(pending), currency: "Rwf", color: "text-orange-600" },
          { title: "Total Staff", value: String(staff), color: "text-gray-900" },
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
