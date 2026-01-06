"use client"

import { useState } from "react"
import FeeModal from "./modals/fee-modal"

export default function SchoolFeesTable() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
  const [selectedStudent, setSelectedStudent] = useState(null)

  const students = [
    {
      name: "Dushimire Aine",
      class: "Senior 1 B",
      amount: 850000,
      date: "10/5/2025",
      status: "Paid",
      paymentMethod: "Bank Account",
    },
    {
      name: "Sarah Johnson",
      class: "Senior 2 A",
      amount: 850000,
      date: "10/5/2025",
      status: "Pending",
      paymentMethod: "Bank Account",
    },
    {
      name: "Michael Brown",
      class: "Senior 3 C",
      amount: 850000,
      date: "10/5/2025",
      status: "Paid",
      paymentMethod: "Bank Account",
    },
    {
      name: "Emily Davis",
      class: "Senior 1 A",
      amount: 850000,
      date: "10/5/2025",
      status: "Failed",
      paymentMethod: "Bank Account",
    },
    {
      name: "Robert Wilson",
      class: "Senior 2 B",
      amount: 850000,
      date: "10/5/2025",
      status: "Paid",
      paymentMethod: "Bank Account",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-blue-600 bg-blue-50"
      case "Pending":
        return "text-orange-600 bg-orange-50"
      case "Failed":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const openAddModal = () => {
    setModalMode("add")
    setSelectedStudent(null)
    setModalOpen(true)
  }

  const openEditModal = (student: any) => {
    setModalMode("edit")
    setSelectedStudent(student)
    setModalOpen(true)
  }

  const openViewModal = (student: any) => {
    setModalMode("view")
    setSelectedStudent(student)
    setModalOpen(true)
  }

  const handleSave = (data: any) => {
    console.log("Saving fee data:", data)
    // Here you would implement the actual save functionality
    // For example, send to an API or update state
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">School Fees Management</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3 text-sm font-medium text-gray-500">Student Names</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Class</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Amount</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Date</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Payment Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student, index) => (
              <tr key={index} className="text-sm text-gray-600">
                <td className="py-4">{student.name}</td>
                <td className="py-4">{student.class}</td>
                <td className="py-4">{student.amount}</td>
                <td className="py-4">{student.date}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="py-4">{student.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FeeModal
        isOpen={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        initialData={selectedStudent}
        onSave={handleSave}
      />
    </div>
  )
}
