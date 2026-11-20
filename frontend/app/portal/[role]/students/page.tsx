"use client"

import StudentsTable from "@/components/portal/students-table"

export default function StudentsPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Students</h1>
        <p className="mt-1 text-sm text-gray-500">Register students with their parents, the class they join, and the combination from S4.</p>
      </div>
      <StudentsTable />
    </div>
  )
}
