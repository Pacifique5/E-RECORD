"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"
import BudgetModal from "./modals/budget-modal"

const COLORS = ["bg-green-500", "bg-orange-500", "bg-blue-600", "bg-purple-500", "bg-cyan-500"]

type Category = { name: string; amount: number; percentage: number; color: string }

export default function BudgetOverviewPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "view">("add")
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; amount: number; description: string } | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  const loadCategories = () => {
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
            .map(([name, amount], index) => ({
              name,
              amount,
              percentage: total ? Math.round((amount / total) * 100) : 0,
              color: COLORS[index % COLORS.length],
            }))
        )
      })
      .catch(() => setCategories([]))
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900">Budget Overview</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          onClick={() => {
            setModalMode("add")
            setSelectedCategory(null)
            setModalOpen(true)
          }}
        >
          Add new category
        </button>
      </div>

      {categories.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">No expenses recorded yet.</p>
      ) : (
        <div className="space-y-5">
          {categories.map((category) => (
            <div key={category.name} className="grid grid-cols-[minmax(0,6rem)_1fr_2.5rem] items-center gap-2 sm:grid-cols-[140px_1fr_48px_72px] sm:gap-4">
              <span className="truncate text-sm capitalize text-gray-600">{category.name}</span>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className={`h-2 rounded-full ${category.color}`} style={{ width: `${category.percentage}%` }} />
              </div>
              <span className="text-sm text-gray-500 text-right">{category.percentage}%</span>
              <button
                className="col-span-3 mt-1 w-fit bg-blue-600 px-3 py-1 text-xs text-white rounded-md hover:bg-blue-700 sm:col-span-1 sm:mt-0"
                onClick={() => {
                  setModalMode("view")
                  setSelectedCategory({
                    name: category.name,
                    amount: category.amount,
                    description: `${category.name} expenses`,
                  })
                  setModalOpen(true)
                }}
              >
                VIEW
              </button>
            </div>
          ))}
        </div>
      )}

      <BudgetModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={loadCategories}
        initialData={selectedCategory}
        mode={modalMode}
      />
    </div>
  )
}
