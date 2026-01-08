"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { apiFetch } from "../../../../lib/api"

interface Fee {
  id?: string
  studentName: string
  studentId: string
  amount: number
  amountPaid: number
  type: string
  status: string
  dueDate: string
  paidDate?: string
  notes?: string
}

interface FeeModalProps {
  isOpen: boolean
  mode: "add" | "edit" | "view"
  onClose: () => void
  initialData?: Fee | null
  onSave?: () => void
}

export default function FeeModal({ isOpen, mode, onClose, initialData, onSave }: FeeModalProps) {
  const [formData, setFormData] = useState<Fee>({
    studentName: "",
    studentId: "",
    amount: 0,
    amountPaid: 0,
    type: "",
    status: "unpaid",
    dueDate: "",
    paidDate: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...initialData,
          dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : "",
          paidDate: initialData.paidDate ? new Date(initialData.paidDate).toISOString().split('T')[0] : "",
        })
      } else {
        setFormData({
          studentName: "",
          studentId: "",
          amount: 0,
          amountPaid: 0,
          type: "",
          status: "unpaid",
          dueDate: "",
          paidDate: "",
          notes: "",
        })
      }
      setError("")
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' || name === 'amountPaid' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "add") {
        await apiFetch('/financial/fees', {
          method: 'POST',
          body: JSON.stringify(formData),
        })
      } else if (mode === "edit" && initialData?.id) {
        await apiFetch(`/financial/fees/${initialData.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        })
      }
      
      if (onSave) onSave()
      onClose()
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the fee')
    } finally {
      setLoading(false)
    }
  }

  const isReadOnly = mode === "view"
  const title = mode === "add" ? "Add New Fee" : mode === "edit" ? "Edit Fee" : "View Fee"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-xl font-semibold mb-6">{title}</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Enter student name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter student ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fee Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isReadOnly}
                required
              >
                <option value="">Select fee type</option>
                <option value="tuition">Tuition</option>
                <option value="transport">Transport</option>
                <option value="meals">Meals</option>
                <option value="books">Books</option>
                <option value="uniform">Uniform</option>
                <option value="activities">Activities</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount (RWF)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter total amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Paid (RWF)</label>
              <input
                type="number"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
                placeholder="Enter amount paid"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isReadOnly}
                required
              >
                <option value="unpaid">Unpaid</option>
                <option value="partial">Partial</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paid Date</label>
              <input
                type="date"
                name="paidDate"
                value={formData.paidDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any additional notes"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            {mode !== "view" && (
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}