"use client"

import StudentsTable from "@/components/portal/students-table"

export default function StudentsPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Students</h1>
      <StudentsTable />
    </div>
  )
}
