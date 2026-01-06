"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import PayrollModal from "./modals/payroll-modal"

export default function StaffPayrollTable() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
  const [selectedStaff, setSelectedStaff] = useState(null)

  const staffPayroll = [
    {
      name: "Dushimire Aine",
      department: "Science",
      amount: "850000 Rwf",
      date: "10/5/2025",
      status: "Paid",
      paymentMethod: "Bank Account",
    },
    {
      name: "Dushimire Aine",
      department: "Science",
      amount: "850000 Rwf",
      date: "10/5/2025",
      status: "Pending",
      paymentMethod: "Bank Account",
    },
    {
      name: "Dushimire Aine",
      department: "Science",
      amount: "850000 Rwf",
      date: "10/5/2025",
      status: "Paid",
      paymentMethod: "Bank Account",
    },
    {
      name: "Dushimire Aine",
      department: "Science",
      amount: "850000 Rwf",
      date: "10/5/2025",
      status: "Failed",
      paymentMethod: "Bank Account",
    },
    {
      name: "Dushimire Aine",
      department: "Science",
      amount: "850000 Rwf",
      date: "10/5/2025",
      status: "Paid",
      paymentMethod: "Bank Account",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-blue-600"
      case "Pending":
        return "text-orange-600"
      case "Failed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const openAddModal = () => {
    setModalMode("add")
    setSelectedStaff(null)
    setModalOpen(true)
  }

  const openViewModal = (staffMember: any) => {
    setModalMode("view")
    const staffData = {
      staffName: staffMember.name,
      position: staffMember.department,
      amount: staffMember.amount,
      status: staffMember.status,
      details: "Payment processed via bank transfer",
    }
    setSelectedStaff(staffData)
    setModalOpen(true)
  }

  const handleSave = (data: any) => {
    console.log("Saving payroll data:", data)
    // Here you would implement the actual save functionality
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <div className="text-lg font-semibold text-gray-900">Staff Payroll</div>
          <div className="text-sm text-gray-600 mt-1">Total amount : 1000000 Rwf</div>
        </div>
        <div className="flex space-x-3 mt-2 md:mt-0">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Export Report</button>
          <button
            className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50"
            onClick={openAddModal}
          >
            Add new Staff
          </button>
          <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50">Generate payroll</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-3 mt-2 md:mt-0">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Department</option>
            <option>Teacher</option>
            <option>Discipline staff</option>
            <option>Doctor</option>
            <option>Cook</option>
            <option>Cleanliness</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-500">Staff Name</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Department</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Amount</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Payment Method</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staffPayroll.map((staff, index) => (
              <tr key={index}>
                <td className="py-3 text-sm text-gray-900">{staff.name}</td>
                <td className="py-3 text-sm text-gray-600">{staff.department}</td>
                <td className="py-3 text-sm text-gray-900">{staff.amount}</td>
                <td className="py-3 text-sm text-gray-600">{staff.date}</td>
                <td className="py-3">
                  <span className={`text-sm font-medium ${getStatusColor(staff.status)}`}>
                    {staff.status}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-600">{staff.paymentMethod}</td>
                <td className="py-3 text-sm">
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                      onClick={() => openViewModal(staff)}
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
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Next →</button>
      </div>

      <PayrollModal
        isOpen={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        initialData={selectedStaff}
        onSave={handleSave}
      />
    </div>
  )
}
