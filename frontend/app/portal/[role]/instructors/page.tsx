"use client"

import InstructorsTable from "@/components/portal/instructors-table"

export default function InstructorsPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Instructors</h1>
        <p className="mt-1 text-sm text-gray-500">Register instructors, their phone numbers, and the subject they teach.</p>
      </div>
      <InstructorsTable />
    </div>
  )
}
