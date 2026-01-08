"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Eye } from "lucide-react"
import { apiFetch } from "@/lib/api"

interface Payroll {
  id: string
  staffName: string
  staffId: string
  position: string
  baseSalary: number
  allowances: number
  deductions: number
  netSalary: number
  payrollMonth: string
  status: string
  paidDate?: string
  notes?: string
  createdAt: string
}

export default function StaffPayrollTable() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchPayrolls()
  }, [])

  const fetchPayrolls = async () => {
    try {
      const data = await apiFetch('/financial/payrolls')
      setPayrolls(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch payrolls:', error)
      setPayrolls([])
    } finally {
      setLoading(false)
    }
  }

  const filteredPayrolls = payrolls.filter(payroll =>
    payroll.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payroll.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payroll.position.toLowerCase().includes(searchTerm.toLowerCase())
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <div className="p-6">Loading payrolls...</div>
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-end mb-6 space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
          Generate Payroll
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Staff Payroll
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Departments</option>
            <option>Teaching</option>
            <option>Administration</option>
            <option>Support</option>
            <option>Management</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Processing</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Staff Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Staff ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Position</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Base Salary</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Net Salary</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Month</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayrolls.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  {payrolls.length === 0 ? 'No payroll records found' : 'No payroll records match your search'}
                </td>
              </tr>
            ) : (
              filteredPayrolls.map((payroll) => (
                <tr key={payroll.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{payroll.staffName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{payroll.staffId}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{payroll.position}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(payroll.baseSalary)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(payroll.netSalary)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{formatDate(payroll.payrollMonth)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(payroll.status)}`}>
                      {payroll.status}
                    </span>
                  </td>
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