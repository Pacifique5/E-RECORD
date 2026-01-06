"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import ExpenseModal from "./modals/expense-modal"

export default function ExpenseManagementTable() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
  const [selectedExpense, setSelectedExpense] = useState(null)

  const expenses = [
    {
      date: "10/5/2025",
      vendor: "Tyaza Ubwenge",
      purpose: "Buying teacher materials",
      amount: "850000",
      status: "Paid",
    },
    {
      date: "10/5/2025",
      vendor: "Tyaza Ubwenge",
      purpose: "Buying teacher materials",
      amount: "850000",
      status: "Paid",
    },
    {
      date: "10/5/2025",
      vendor: "Tyaza Ubwenge",
      purpose: "Buying teacher materials",
      amount: "850000",
      status: "Paid",
    },
    {
      date: "10/5/2025",
      vendor: "Tyaza Ubwenge",
      purpose: "Buying teacher materials",
      amount: "850000",
      status: "Paid",
    },
    {
      date: "10/5/2025",
      vendor: "Tyaza Ubwenge",
      purpose: "Buying teacher materials",
      amount: "850000",
      status: "Paid",
    },
    {
      date: "10/5/2025",
      vendor: "Tyaza Ubwenge",
      purpose: "Buying teacher materials",
      amount: "850000",
      status: "Paid",
    },
    {
      date: "10/5/2025",
      vendor: "Tyaza Ubwenge",
      purpose: "Buying teacher materials",
      amount: "850000",
      status: "Paid",
    },
    {
      date: "10/5/2025",
      vendor: "Tyaza Ubwenge",
      purpose: "Buying teacher materials",
      amount: "850000",
      status: "Paid",
    },
  ]

  const openViewModal = (expense: any) => {
    setModalMode("view")
    const expenseData = {
      vendor: expense.vendor,
      amount: expense.amount,
      category: "Electronics",
      status: expense.status,
      description: expense.purpose,
    }
    setSelectedExpense(expenseData)
    setModalOpen(true)
  }

  const handleSave = (data: any) => {
    console.log("Saving expense data:", data)
    // Here you would implement the actual save functionality
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-end mb-6 space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
          Export Report
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          onClick={() => { setModalMode('add'); setSelectedExpense(null); setModalOpen(true); }}
        >
          Add new Expense
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search expense"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Category</option>
            <option>Academic</option>
            <option>Maintenance</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Status</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Vendor</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Purpose</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-sm text-gray-600">{expense.date}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{expense.vendor}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{expense.purpose}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{expense.amount}</td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{expense.status}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                      onClick={() => openViewModal(expense)}
                    >
                      VIEW
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center mt-6 space-x-2">
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">← Previous</button>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">3</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">...</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">67</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">68</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Next →</button>
      </div>

      <ExpenseModal
        isOpen={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        initialData={selectedExpense}
        onSave={handleSave}
      />
    </div>
  )
}
