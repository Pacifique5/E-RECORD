"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface SchoolModalProps {
  isOpen: boolean
  mode: "request" | "info"
  onClose: () => void
  initialData?: any
  onAccept?: (data: any) => void
  onReject?: (data: any) => void
  onRemove?: (data: any) => void
}

export default function SchoolModal({ isOpen, mode, onClose, initialData, onAccept, onReject, onRemove }: SchoolModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    paymentStatus: "",
    systemStatus: "Active",
    logo: "",
  })

  useEffect(() => {
    if (isOpen) {
      setFormData(
        initialData || {
          name: "",
          email: "",
          phone: "",
          location: "",
          paymentStatus: "",
          systemStatus: "Active",
          logo: "",
        }
      )
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const isReadOnly = true
  const isRequest = mode === "request"
  const title = isRequest ? "School Requests" : "School Information"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-xl font-semibold mb-6">{title}</h2>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <input
                type="text"
                name="paymentStatus"
                value={formData.paymentStatus}
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {!isRequest && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">System Status</label>
                <input
                  type="text"
                  name="systemStatus"
                  value={formData.systemStatus}
                  readOnly={isReadOnly}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Logo</label>
              <div className="flex items-center h-12">
                {formData.logo ? (
                  <img src={formData.logo} alt="School Logo" className="h-10 w-10 object-contain" />
                ) : (
                  <span className="inline-block h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83" /></svg>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            {isRequest ? (
              <>
                <button
                  type="button"
                  onClick={() => onReject && onReject(formData)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
                >
                  Reject Request
                </button>
                <button
                  type="button"
                  onClick={() => onAccept && onAccept(formData)}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700"
                >
                  Accept Request
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onRemove && onRemove(formData)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
                >
                  Remove school
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
} 