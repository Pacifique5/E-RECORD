"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Eye } from "lucide-react"
import { apiFetch } from "../../../lib/api"
import FeeModal from "./modals/fee-modal"

interface Fee {
  id: string
  studentName: string
  studentId: string
  amount: number
  amountPaid: number
  type: string
  status: string
  dueDate: string
  paidDate?: string
  notes?: string
  createdAt: string
}

export default function FeesManagementTable() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null)
  const [fees, setFees] = useState<Fee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchFees()
  }, [])

  const fetchFees = async () => {
    try {
      const data = await apiFetch('/financial/fees')
      setFees(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch fees:', error)
      setFees([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddFee = () => {
    setSelectedFee(null)
    setModalMode("add")
    setModalOpen(true)
  }

  const handleEditFee = (fee: Fee) => {
    setSelectedFee(fee)
    setModalMode("edit")
    setModalOpen(true)
  }

  const handleViewFee = (fee: Fee) => {
    setSelectedFee(fee)
    setModalMode("view")
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedFee(null)
    fetchFees() // Refresh the list
  }

  const filteredFees = fees.filter(fee =>
    fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.type.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'partial':
        return 'bg-yellow-100 text-yellow-800'
      case 'unpaid':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <div className="p-6">Loading fees...</div>
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-end mb-6 space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
          Export Report
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center gap-2"
          onClick={handleAddFee}
        >
          <Plus className="h-4 w-4" />
          Add New Fee
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search student or fee type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Types</option>
            <option>Tuition</option>
            <option>Transport</option>
            <option>Meals</option>
            <option>Books</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Status</option>
            <option>Paid</option>
            <option>Partial</option>
            <option>Unpaid</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Student Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Student ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Fee Type</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Paid</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Due Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFees.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  {fees.length === 0 ? 'No fees found' : 'No fees match your search'}
                </td>
              </tr>
            ) : (
              filteredFees.map((fee) => (
                <tr key={fee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{fee.studentName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{fee.studentId}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{fee.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(fee.amount)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(fee.amountPaid)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{formatDate(fee.dueDate)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(fee.status)}`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1"
                        onClick={() => handleViewFee(fee)}
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 p-1"
                        onClick={() => handleEditFee(fee)}
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

      <FeeModal
        isOpen={modalOpen}
        mode={modalMode}
        onClose={handleModalClose}
        initialData={selectedFee}
        onSave={fetchFees}
      />
    </div>
  )
}