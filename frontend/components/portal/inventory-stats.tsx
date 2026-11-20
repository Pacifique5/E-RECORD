"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

type Item = { quantity: number | string; category?: string }

export default function InventoryStats() {
  const [stats, setStats] = useState([
    { title: "Total Items", value: "0", color: "text-blue-600" },
    { title: "In Stock", value: "0", color: "text-green-600" },
    { title: "Low in Stock", value: "0", color: "text-orange-600" },
    { title: "Finished in Stock", value: "0", color: "text-red-600" },
  ])

  useEffect(() => {
    apiFetch("/inventory")
      .then((data: Item[]) => {
        const rows = Array.isArray(data) ? data : []
        const qty = (item: Item) => Number(item.quantity || 0)
        setStats([
          { title: "Total Items", value: String(rows.length), color: "text-blue-600" },
          { title: "In Stock", value: String(rows.filter((item) => qty(item) > 5).length), color: "text-green-600" },
          { title: "Low in Stock", value: String(rows.filter((item) => qty(item) > 0 && qty(item) <= 5).length), color: "text-orange-600" },
          { title: "Finished in Stock", value: String(rows.filter((item) => qty(item) <= 0).length), color: "text-red-600" },
        ])
      })
      .catch(() => {})
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
