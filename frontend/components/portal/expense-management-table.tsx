"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Eye } from "lucide-react"
import { apiFetch } from "../../lib/api"

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
  vendor?: string
  invoiceNumber?: string
  notes?: string
  createdAt: string
}

export default function ExpenseManagementTable() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const data = await apiFetch('/financial/expenses')
      setExpenses(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch expenses:', error)
      setExpenses([])
    } finally {
      setLoading(false)
    }
  }

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (expense.vendor && expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return <div className="p-6">Loading expenses...</div>
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-end mb-6 space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
          Export Report
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Expense
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search expenses"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Office Supplies</option>
            <option>Utilities</option>
            <option>Maintenance</option>
            <option>Transportation</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Description</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Vendor</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  {expenses.length === 0 ? 'No expenses found' : 'No expenses match your search'}
                </td>
              </tr>
            ) : (
              filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{expense.description}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{expense.category}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(expense.amount)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{expense.vendor || 'N/A'}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{formatDate(expense.date)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center mt-6 space-x-2">
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">← Previous</button>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Next →</button>
      </div>
    </div>
  )
}