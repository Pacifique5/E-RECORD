"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { apiFetch } from "@/lib/api"
import { COMBINATIONS, STUDENT_CLASSES, UPPER_CLASSES } from "@/lib/student-options"
import { classInYear } from "@/lib/academic"
import { birthDate, joinErrors, personName, phoneNumber } from "@/lib/validation"
import { useAcademicPeriod } from "@/components/portal/academic-period"

export interface StudentRecord {
  id?: string
  firstName: string
  lastName: string
  studentCode?: string
  gender: string
  dateOfBirth: string
  fatherName: string
  fatherPhone: string
  motherName: string
  motherPhone: string
  classLevel: string
  entryClass?: string
  entryYear?: number
  combination?: string | null
}

const emptyStudent = (): StudentRecord => ({
  firstName: "",
  lastName: "",
  gender: "male",
  dateOfBirth: "",
  fatherName: "",
  fatherPhone: "",
  motherName: "",
  motherPhone: "",
  classLevel: "S1",
  entryYear: new Date().getFullYear(),
  combination: "",
})

export default function StudentModal({
  isOpen,
  mode,
  onClose,
  initialData,
  onSave,
}: {
  isOpen: boolean
  mode: "add" | "edit" | "view"
  onClose: () => void
  initialData?: StudentRecord | null
  onSave?: () => void
}) {
  const [formData, setFormData] = useState<StudentRecord>(emptyStudent())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { year } = useAcademicPeriod()

  useEffect(() => {
    if (!isOpen) return
    setFormData(initialData
      ? {
          ...emptyStudent(),
          ...initialData,
          classLevel: initialData.entryClass || initialData.classLevel,
          entryYear: initialData.entryYear || year,
          combination: initialData.combination || "",
        }
      : { ...emptyStudent(), entryYear: year })
    setError("")
  }, [isOpen, initialData, year])

  if (!isOpen) return null

  const isReadOnly = mode === "view"
  const classThisYear = classInYear(formData.classLevel, Number(formData.entryYear), year)
  const needsCombination = UPPER_CLASSES.includes(formData.classLevel) || UPPER_CLASSES.includes(classThisYear || "")
  const title = mode === "add" ? "Register Student" : mode === "edit" ? "Edit Student" : "Student Details"

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((current) => {
      const next = { ...current, [name]: value }
      if (name === "classLevel" && !UPPER_CLASSES.includes(value)) next.combination = ""
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const message = joinErrors([
      personName(formData.firstName, "First name"),
      personName(formData.lastName, "Last name"),
      birthDate(formData.dateOfBirth),
      personName(formData.fatherName, "Father's name"),
      phoneNumber(formData.fatherPhone, "Father's phone"),
      personName(formData.motherName, "Mother's name"),
      phoneNumber(formData.motherPhone, "Mother's phone"),
      needsCombination && !formData.combination ? "Select the combination for S4, S5, and S6." : "",
    ])
    if (message) {
      setError(message)
      return
    }
    setLoading(true)
    setError("")
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      fatherName: formData.fatherName.trim(),
      fatherPhone: formData.fatherPhone.trim(),
      motherName: formData.motherName.trim(),
      motherPhone: formData.motherPhone.trim(),
      classLevel: formData.classLevel,
      entryYear: Number(formData.entryYear),
      combination: needsCombination ? formData.combination : null,
    }
    try {
      if (mode === "add") {
        await apiFetch("/students", { method: "POST", body: JSON.stringify(payload) })
      } else if (mode === "edit" && initialData?.id) {
        await apiFetch(`/students/${initialData.id}`, { method: "PUT", body: JSON.stringify(payload) })
      }
      onSave?.()
      onClose()
    } catch (err: any) {
      const message = err?.body?.message || err?.message || "Could not save this student"
      setError(Array.isArray(message) ? message.join(", ") : String(message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-4 shadow-lg sm:p-6">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        <h2 className="mb-6 text-xl font-semibold">{title}</h2>
        {formData.studentCode && <p className="mb-4 text-sm text-gray-500">Student ID: {formData.studentCode}</p>}
        {error && <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">{error}</div>}

        <form onSubmit={handleSubmit}>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Student details</h3>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="First name">
              <input name="firstName" value={formData.firstName} onChange={handleChange} required readOnly={isReadOnly} className={inputClass} />
            </Field>
            <Field label="Last name">
              <input name="lastName" value={formData.lastName} onChange={handleChange} required readOnly={isReadOnly} className={inputClass} />
            </Field>
            <Field label="Gender">
              <select name="gender" value={formData.gender} onChange={handleChange} disabled={isReadOnly} className={inputClass}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Field>
            <Field label="Date of birth">
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth?.slice(0, 10) || ""} onChange={handleChange} required readOnly={isReadOnly} className={inputClass} />
            </Field>
          </div>

          <h3 className="mb-3 text-sm font-semibold text-gray-900">Parents</h3>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Father's name">
              <input name="fatherName" value={formData.fatherName} onChange={handleChange} required readOnly={isReadOnly} className={inputClass} />
            </Field>
            <Field label="Father's phone">
              <input name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} required readOnly={isReadOnly} className={inputClass} />
            </Field>
            <Field label="Mother's name">
              <input name="motherName" value={formData.motherName} onChange={handleChange} required readOnly={isReadOnly} className={inputClass} />
            </Field>
            <Field label="Mother's phone">
              <input name="motherPhone" value={formData.motherPhone} onChange={handleChange} required readOnly={isReadOnly} className={inputClass} />
            </Field>
          </div>

          <h3 className="mb-3 text-sm font-semibold text-gray-900">Class</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Year joining">
              <select name="entryYear" value={formData.entryYear} onChange={handleChange} disabled={isReadOnly} className={inputClass}>
                {[2023, 2024, 2025, 2026, 2027].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Class joining">
              <select name="classLevel" value={formData.classLevel} onChange={handleChange} disabled={isReadOnly} className={inputClass}>
                {STUDENT_CLASSES.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </Field>
            {needsCombination && (
              <Field label="Combination">
                <select name="combination" value={formData.combination || ""} onChange={handleChange} disabled={isReadOnly} required className={inputClass}>
                  <option value="">Select combination</option>
                  {COMBINATIONS.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </Field>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" disabled={loading}>
              Cancel
            </button>
            {mode !== "view" && (
              <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                {loading ? "Saving..." : mode === "add" ? "Register Student" : "Save"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )
}
