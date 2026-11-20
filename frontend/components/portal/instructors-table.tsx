"use client"

import { useEffect, useState } from "react"
import { Edit, Eye, Plus, Search } from "lucide-react"
import { apiFetch } from "@/lib/api"
import LoadingSpinner from "@/components/loading-spinner"
import { isScienceSubject, SUBJECTS, subjectLabel } from "@/lib/instructor-options"
import InstructorModal, { InstructorRecord } from "./modals/instructor-modal"

export default function InstructorsTable() {
  const [instructors, setInstructors] = useState<InstructorRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("All Subjects")
  const [modalOpen, setModalOpen] = useState(false)
  const [mode, setMode] = useState<"add" | "edit" | "view">("add")
  const [selected, setSelected] = useState<InstructorRecord | null>(null)

  const loadInstructors = () => {
    apiFetch("/instructors")
      .then((data: InstructorRecord[]) => setInstructors(Array.isArray(data) ? data : []))
      .catch(() => setInstructors([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadInstructors()
  }, [])

  const filtered = instructors.filter((instructor) => {
    const name = `${instructor.firstName} ${instructor.lastName}`.toLowerCase()
    const query = search.toLowerCase()
    const matchesSearch =
      name.includes(query) ||
      (instructor.instructorCode || "").toLowerCase().includes(query) ||
      instructor.phone.toLowerCase().includes(query) ||
      subjectLabel(instructor.subject).toLowerCase().includes(query)
    const matchesSubject = subjectFilter === "All Subjects" || instructor.subject === subjectFilter
    return matchesSearch && matchesSubject
  })

  const open = (nextMode: "add" | "edit" | "view", instructor?: InstructorRecord) => {
    setMode(nextMode)
    setSelected(instructor || null)
    setModalOpen(true)
  }

  if (loading) return <LoadingSpinner />

  const science = instructors.filter((instructor) => isScienceSubject(instructor.subject)).length
  const cards = [
    { title: "Total Instructors", value: instructors.length, color: "text-blue-600" },
    { title: "Science", value: science, color: "text-gray-900" },
    { title: "Languages & Humanities", value: instructors.length - science, color: "text-green-600" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-xl border border-gray-100 bg-white px-5 py-4 text-center">
            <p className={`text-2xl font-semibold ${card.color}`}>{card.value}</p>
            <p className="mt-1 text-sm text-gray-500">{card.title}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-white p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-end gap-2">
          <button
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            onClick={() => open("add")}
          >
            <Plus className="h-4 w-4" />
            Register Instructor
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search instructor or subject"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={subjectFilter}
            onChange={(event) => setSubjectFilter(event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option>All Subjects</option>
            {SUBJECTS.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-gray-200">
                {["Instructor Name", "Instructor ID", "Phone", "Other Phone", "Subject", "Actions"].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                    {instructors.length === 0 ? "No instructors registered yet." : "No instructors match your search."}
                  </td>
                </tr>
              ) : (
                filtered.map((instructor) => (
                  <tr key={instructor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{instructor.firstName} {instructor.lastName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{instructor.instructorCode}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{instructor.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{instructor.alternatePhone || "—"}</td>
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{subjectLabel(instructor.subject)}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800" title="View" aria-label="View" onClick={() => open("view", instructor)}>
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:text-green-800" title="Edit" aria-label="Edit" onClick={() => open("edit", instructor)}>
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

        <InstructorModal
          isOpen={modalOpen}
          mode={mode}
          initialData={selected}
          onClose={() => setModalOpen(false)}
          onSave={loadInstructors}
        />
      </div>
    </div>
  )
}
