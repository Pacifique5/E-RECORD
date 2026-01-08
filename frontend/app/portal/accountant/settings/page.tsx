"use client"

import { useState } from "react"
import { Building2, User, Shield, Bell, Palette, Globe } from "lucide-react"
import useAuth from '@/hooks/use-auth'

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("account")

  const tabs = [
    { id: "account", label: "Account Information", icon: User },
    { id: "school", label: "School Information", icon: Building2 },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "language", label: "Language & Region", icon: Globe },
  ]

  const TabButton = ({ tab, isActive, onClick }: { tab: any; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full px-4 py-3 text-left rounded-lg transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <tab.icon className="h-5 w-5" />
      <span className="font-medium">{tab.label}</span>
    </button>
  )

  const AccountTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={user?.firstName || ""}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={user?.lastName || ""}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
              value={user?.phoneNumber || "Not provided"}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Created</label>
            <input
              type="text"
              value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const SchoolTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">School Information</h3>
        {user?.school ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
              <input
                type="text"
                value={user.school.name}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Code</label>
              <input
                type="text"
                value={user.school.code}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.school.status === 'approved' 
                    ? 'bg-green-100 text-green-800' 
                    : user.school.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.school.status.charAt(0).toUpperCase() + user.school.status.slice(1)}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
              <input
                type="text"
                value={user.school.createdAt ? new Date(user.school.createdAt).toLocaleDateString() : ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No School Associated</h4>
            <p className="text-gray-600">You don't have a school associated with your account yet.</p>
          </div>
        )}
      </div>
    </div>
  )

  const SecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-600">Update your account password</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Change
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const NotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">System Updates</h4>
              <p className="text-sm text-gray-600">Get notified about system updates</p>
            </div>
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  )

  const AppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Theme</h4>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Light</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">Dark</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">Auto</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const LanguageTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Language & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>English</option>
              <option>French</option>
              <option>Kinyarwanda</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>Africa/Kigali</option>
              <option>UTC</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountTab />
      case "school":
        return <SchoolTab />
      case "security":
        return <SecurityTab />
      case "notifications":
        return <NotificationsTab />
      case "appearance":
        return <AppearanceTab />
      case "language":
        return <LanguageTab />
      default:
        return <AccountTab />
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and application preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}