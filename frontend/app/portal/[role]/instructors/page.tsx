"use client"

import InstructorsTable from "@/components/portal/instructors-table"

export default function InstructorsPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Instructors</h1>
      <InstructorsTable />
    </div>
  )
}
