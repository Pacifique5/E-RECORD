"use client"

import { useState, useEffect } from "react"
import { User, Plus, Edit, Trash2 } from "lucide-react"
import useAuth from '@/hooks/use-auth'
import AddAccountantModal from '@/components/portal/modals/add-accountant-modal'
import { apiFetch } from '@/lib/api'

interface AccountantUser {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

export default function SettingsPage() {
  const { user } = useAuth()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [accountants, setAccountants] = useState<AccountantUser[]>([])
  const [loading, setLoading] = useState(false)

  const fetchAccountants = async () => {
    if (user?.role !== 'headmaster') return
    
    try {
      setLoading(true)
      const response = await apiFetch('/users?role=accountant')
      setAccountants(response.users || [])
    } catch (error) {
      console.error('Failed to fetch accountants:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccountants()
  }, [user])

  const handleAddSuccess = () => {
    fetchAccountants() // Refresh the list
  }

  const handleDeleteAccountant = async (accountantId: string) => {
    if (!confirm('Are you sure you want to delete this accountant?')) return

    try {
      await apiFetch(`/users/${accountantId}`, { method: 'DELETE' })
      fetchAccountants() // Refresh the list
    } catch (error) {
      console.error('Failed to delete accountant:', error)
      alert('Failed to delete accountant')
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
              <input
                type="text"
                value={user?.school?.name || ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Logo</label>
              <img
                src={user?.school?.logo ? `http://localhost:3001${user.school.logo}` : '/placeholder-logo.png'}
                alt={`${user?.school?.name || 'School'} logo`}
                className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                onError={(e) => {
                  // Fallback to a default image if the logo fails to load
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzM3NzNmZiIvPgo8cGF0aCBkPSJNMjAgMjBoMjR2MjRIMjBWMjB6IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <input
                type="text"
                value="2024-2025"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <input
                type="text"
                value="Term 1"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value="Kigali Rwanda"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Personal Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Names</label>
              <input
                type="text"
                value={`${user?.firstName || ""} ${user?.lastName || ""}`}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={user?.phoneNumber || ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value="Kigali Rwanda"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Accountant Management - Only for Headmaster */}
        {user?.role === 'headmaster' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Accountant Management</h2>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Add an accountant</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Created at</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        Loading accountants...
                      </td>
                    </tr>
                  ) : accountants.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        No accountants found. Click "Add an accountant" to create one.
                      </td>
                    </tr>
                  ) : (
                    accountants.map((accountant) => (
                      <tr key={accountant.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">{accountant.firstName} {accountant.lastName}</td>
                        <td className="py-3 px-4">{accountant.email}</td>
                        <td className="py-3 px-4">
                          {new Date(accountant.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteAccountant(accountant.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sms Notification Number</label>
              <input
                type="tel"
                value={user?.phoneNumber || ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Notifications</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>All</option>
              <option>Important Only</option>
              <option>None</option>
            </select>
          </div>
        </div>

        {/* Data Backup */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Backup</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Accountant Modal */}
      <AddAccountantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  )
}