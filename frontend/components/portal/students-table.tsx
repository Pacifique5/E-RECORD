"use client"

import { useEffect, useState } from "react"
import { Edit, Eye, Plus, Search } from "lucide-react"
import { apiFetch } from "@/lib/api"
import LoadingSpinner from "@/components/loading-spinner"
import { STUDENT_CLASSES, UPPER_CLASSES } from "@/lib/student-options"
import StudentModal, { StudentRecord } from "./modals/student-modal"

export default function StudentsTable() {
  const [students, setStudents] = useState<StudentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("All Classes")
  const [modalOpen, setModalOpen] = useState(false)
  const [mode, setMode] = useState<"add" | "edit" | "view">("add")
  const [selected, setSelected] = useState<StudentRecord | null>(null)

  const loadStudents = () => {
    apiFetch("/students")
      .then((data: StudentRecord[]) => setStudents(Array.isArray(data) ? data : []))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const filtered = students.filter((student) => {
    const name = `${student.firstName} ${student.lastName}`.toLowerCase()
    const query = search.toLowerCase()
    const matchesSearch =
      name.includes(query) ||
      (student.studentCode || "").toLowerCase().includes(query) ||
      student.fatherName.toLowerCase().includes(query) ||
      student.motherName.toLowerCase().includes(query)
    const matchesClass = classFilter === "All Classes" || student.classLevel === classFilter
    return matchesSearch && matchesClass
  })

  const open = (nextMode: "add" | "edit" | "view", student?: StudentRecord) => {
    setMode(nextMode)
    setSelected(student || null)
    setModalOpen(true)
  }

  if (loading) return <LoadingSpinner />

  const ordinary = students.filter((student) => !UPPER_CLASSES.includes(student.classLevel)).length
  const cards = [
    { title: "Total Students", value: students.length, color: "text-blue-600" },
    { title: "Ordinary Level", value: ordinary, color: "text-gray-900" },
    { title: "Advanced Level", value: students.length - ordinary, color: "text-green-600" },
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
          Register Student
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search student or parent"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={classFilter}
          onChange={(event) => setClassFilter(event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option>All Classes</option>
          {STUDENT_CLASSES.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr className="border-b border-gray-200">
              {["Student Name", "Student ID", "Class", "Combination", "Father", "Father Phone", "Mother", "Mother Phone", "Actions"].map((heading) => (
                <th key={heading} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-sm text-gray-500">
                  {students.length === 0 ? "No students registered yet." : "No students match your search."}
                </td>
              </tr>
            ) : (
              filtered.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{student.firstName} {student.lastName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{student.studentCode}</td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">{student.classLevel}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{student.combination || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{student.fatherName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{student.fatherPhone}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{student.motherName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{student.motherPhone}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800" title="View" onClick={() => open("view", student)}>
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800" title="Edit" onClick={() => open("edit", student)}>
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

      <StudentModal
        isOpen={modalOpen}
        mode={mode}
        initialData={selected}
        onClose={() => setModalOpen(false)}
        onSave={loadStudents}
      />
    </div>
    </div>
  )
}
