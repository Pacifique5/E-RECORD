"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { apiFetch } from "@/lib/api"
import { SUBJECTS } from "@/lib/instructor-options"
import { joinErrors, personName, phoneNumber } from "@/lib/validation"

export interface InstructorRecord {
  id?: string
  firstName: string
  lastName: string
  instructorCode?: string
  gender: string
  phone: string
  alternatePhone?: string | null
  subject: string
}

const emptyInstructor = (): InstructorRecord => ({
  firstName: "",
  lastName: "",
  gender: "male",
  phone: "",
  alternatePhone: "",
  subject: "mathematics",
})

export default function InstructorModal({
  isOpen,
  mode,
  onClose,
  initialData,
  onSave,
}: {
  isOpen: boolean
  mode: "add" | "edit" | "view"
  onClose: () => void
  initialData?: InstructorRecord | null
  onSave?: () => void
}) {
  const [formData, setFormData] = useState<InstructorRecord>(emptyInstructor())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isOpen) return
    setFormData(initialData ? { ...emptyInstructor(), ...initialData, alternatePhone: initialData.alternatePhone || "" } : emptyInstructor())
    setError("")
  }, [isOpen, initialData])

  if (!isOpen) return null

  const isReadOnly = mode === "view"
  const title = mode === "add" ? "Register Instructor" : mode === "edit" ? "Edit Instructor" : "Instructor Details"

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const message = joinErrors([
      personName(formData.firstName, "First name"),
      personName(formData.lastName, "Last name"),
      phoneNumber(formData.phone, "Phone"),
      phoneNumber(formData.alternatePhone || "", "Other phone", false),
    ])
    if (message) {
      setError(message)
      return
    }
    setLoading(true)
    setError("")
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      phone: formData.phone,
      alternatePhone: formData.alternatePhone?.trim() || null,
      subject: formData.subject,
    }
    try {
      if (mode === "add") {
        await apiFetch("/instructors", { method: "POST", body: JSON.stringify(payload) })
      } else if (mode === "edit" && initialData?.id) {
        await apiFetch(`/instructors/${initialData.id}`, { method: "PUT", body: JSON.stringify(payload) })
      }
      onSave?.()
      onClose()
    } catch (err: any) {
      const message = err?.body?.message || err?.message || "Could not save this instructor"
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
        {formData.instructorCode && <p className="mb-4 text-sm text-gray-500">Instructor ID: {formData.instructorCode}</p>}
        {error && <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">{error}</div>}

        <form onSubmit={handleSubmit}>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Instructor details</h3>
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
            <Field label="Phone">
              <input name="phone" value={formData.phone} onChange={handleChange} required readOnly={isReadOnly} className={inputClass} />
            </Field>
            <Field label="Other phone">
              <input name="alternatePhone" value={formData.alternatePhone || ""} onChange={handleChange} readOnly={isReadOnly} className={inputClass} />
            </Field>
          </div>

          <h3 className="mb-3 text-sm font-semibold text-gray-900">Teaching</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Subject">
              <select name="subject" value={formData.subject} onChange={handleChange} disabled={isReadOnly} required className={inputClass}>
                {SUBJECTS.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" disabled={loading}>
              Cancel
            </button>
            {mode !== "view" && (
              <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                {loading ? "Saving..." : mode === "add" ? "Register Instructor" : "Save"}
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
