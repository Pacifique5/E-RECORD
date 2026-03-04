"use client"

import { useState, useEffect } from 'react'
import { apiFetch } from '@/lib/api'

interface EditAccountantModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  accountant: {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber?: string
  } | null
}

export default function EditAccountantModal({ isOpen, onClose, onSuccess, accountant }: EditAccountantModalProps) {
  const [formData, setFormData] = useState({
    accountantName: '',
    email: '',
    phoneNumber: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (accountant) {
      setFormData({
        accountantName: `${accountant.firstName} ${accountant.lastName}`,
        email: accountant.email,
        phoneNumber: accountant.phoneNumber || '',
        password: ''
      })
    }
  }, [accountant])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accountant) return

    setLoading(true)
    setError(null)

    try {
      // Validate form
      if (!formData.accountantName || !formData.email) {
        setError('Please fill in all required fields')
        setLoading(false)
        return
      }

      // Split name into first and last name
      const nameParts = formData.accountantName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || nameParts[0] || ''

      // Update accountant user
      const updateData: any = {
        firstName,
        lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber
      }

      // Only include password if it's provided
      if (formData.password) {
        updateData.password = formData.password
      }

      await apiFetch(`/users/${accountant.id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
      })

      // Reset form and close modal
      setFormData({
        accountantName: '',
        email: '',
        phoneNumber: '',
        password: ''
      })
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to update accountant')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !accountant) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Accountant</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accountant Name
                </label>
                <input
                  type="text"
                  name="accountantName"
                  value={formData.accountantName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Dushimire aine"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="adushimire@gmail.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value="accountant"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                >
                  <option value="accountant">accountant</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0798380290"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default password
              </label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Leave empty to keep current password"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave empty if you don't want to change the password
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Edit accountant'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
