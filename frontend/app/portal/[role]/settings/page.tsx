"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import useAuth from "@/hooks/use-auth"
import AddAccountantModal from "@/components/portal/modals/add-accountant-modal"
import EditAccountantModal from "@/components/portal/modals/edit-accountant-modal"
import { apiFetch } from "@/lib/api"
import LoadingSpinner from "@/components/loading-spinner"

interface AccountantUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  createdAt: string
}

export default function SettingsPage() {
  const { user } = useAuth()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedAccountant, setSelectedAccountant] = useState<AccountantUser | null>(null)
  const [accountants, setAccountants] = useState<AccountantUser[]>([])
  const [loading, setLoading] = useState(false)
  const isHeadmaster = user?.role === "headmaster"

  const fetchAccountants = async () => {
    if (!isHeadmaster) return

    try {
      setLoading(true)
      const response = await apiFetch("/users?role=accountant")
      setAccountants(response.users || [])
    } catch (error) {
      console.error("Failed to fetch accountants:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccountants()
  }, [user])

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Settings</h1>
      </div>

      <div className="space-y-8">
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
                src={user?.school?.logo ? `http://localhost:3001${user.school.logo}` : "/placeholder-logo.png"}
                alt={`${user?.school?.name || "School"} logo`}
                className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                onError={(event) => {
                  event.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzM3NzNmZiIvPgo8cGF0aCBkPSJNMjAgMjBoMjR2MjRIMjBWMjB6IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <input type="text" value="2024-2025" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <input type="text" value="Term 1" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input type="text" value="Kigali Rwanda" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
            </div>
          </div>
        </div>

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
              <input type="email" value={user?.email || ""} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" value={user?.phoneNumber || ""} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input type="text" value="Kigali Rwanda" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
            </div>
          </div>
        </div>

        {isHeadmaster && (
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
              <table className="w-full min-w-[640px]">
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
                      <td colSpan={4} className="py-4">
                        <LoadingSpinner />
                      </td>
                    </tr>
                  ) : accountants.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        No accountants found. Click &quot;Add an accountant&quot; to create one.
                      </td>
                    </tr>
                  ) : (
                    accountants.map((accountant) => (
                      <tr key={accountant.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          {accountant.firstName} {accountant.lastName}
                        </td>
                        <td className="py-3 px-4">{accountant.email}</td>
                        <td className="py-3 px-4">{new Date(accountant.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedAccountant(accountant)
                                setIsEditModalOpen(true)
                              }}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                if (!confirm("Are you sure you want to delete this accountant?")) return
                                try {
                                  await apiFetch(`/users/${accountant.id}`, { method: "DELETE" })
                                  fetchAccountants()
                                } catch (error) {
                                  console.error("Failed to delete accountant:", error)
                                  alert("Failed to delete accountant")
                                }
                              }}
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

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification email</label>
              <input type="email" value={user?.email || ""} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sms Notification Number</label>
              <input type="tel" value={user?.phoneNumber || ""} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
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

      <AddAccountantModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={fetchAccountants} />
      <EditAccountantModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedAccountant(null)
        }}
        onSuccess={() => {
          fetchAccountants()
          setSelectedAccountant(null)
        }}
        accountant={selectedAccountant}
      />
    </div>
  )
}
