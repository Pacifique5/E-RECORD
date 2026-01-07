"use client"

import { useState } from "react"
import BudgetModal from "./modals/budget-modal"

export default function BudgetOverviewPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'view'>("add")
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const categories = [
    { name: "Academic", percentage: 55, color: "bg-green-500" },
    { name: "Maintenance", percentage: 25, color: "bg-orange-500" },
    { name: "Technology", percentage: 20, color: "bg-blue-500" },
  ]

  const handleOpenModal = () => {
    setModalMode("add")
    setSelectedCategory(null)
    setModalOpen(true)
  }

  const handleViewModal = (category: any) => {
    setModalMode("view")
    setSelectedCategory({
      name: category.name,
      amount: category.percentage,
      description: `${category.name} budget category`,
    })
    setModalOpen(true)
  }

  const handleSave = (data: any) => {
    console.log("Saving budget category:", data)
    // Here you would implement the actual save functionality
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          onClick={handleOpenModal}
        >
          Add new category
        </button>
      </div>

      <div className="space-y-6">
        {categories.map((category, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{category.name}</span>
              <span className="text-sm font-medium text-gray-900">{category.percentage}%</span>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                onClick={() => handleViewModal(category)}
              >
                VIEW
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className={`h-3 rounded-full ${category.color}`} style={{ width: `${category.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <BudgetModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={selectedCategory}
        mode={modalMode}
      />
    </div>
  )
}
