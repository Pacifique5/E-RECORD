"use client"

import { Building2, User, Mail, Phone, Calendar, MapPin, Hash, CheckCircle } from "lucide-react"
import useAuth from '@/hooks/use-auth'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">Your account and school information</p>
      </div>

      {/* User Profile Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600 capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              <p className="text-xs text-gray-500">Email Address</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.phoneNumber || "Not provided"}
              </p>
              <p className="text-xs text-gray-500">Phone Number</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
              </p>
              <p className="text-xs text-gray-500">Member Since</p>
            </div>
          </div>
        </div>
      </div>

      {/* School Information Section */}
      {user?.school ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Building2 className="h-6 w-6 mr-3 text-blue-500" />
              School Information
            </h2>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <Building2 className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-lg font-medium text-gray-900">{user.school.name}</p>
                <p className="text-sm text-gray-500">School Name</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Hash className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-lg font-mono font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded">
                  {user.school.code}
                </p>
                <p className="text-sm text-gray-500 mt-1">School Code</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {user.school.createdAt ? new Date(user.school.createdAt).toLocaleDateString() : ""}
                </p>
                <p className="text-sm text-gray-500">Registration Date</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">Active & Operational</p>
                <p className="text-sm text-gray-500">System Status</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Academic Year Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700">
                  {new Date().getFullYear()} Academic Year
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700">First Term Active</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No School Associated</h3>
            <p className="text-gray-600">You don't have a school associated with your account yet.</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <User className="h-5 w-5 text-blue-500" />
            <span className="font-medium text-gray-900">Edit Profile</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail className="h-5 w-5 text-green-500" />
            <span className="font-medium text-gray-900">Change Email</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="h-5 w-5 text-orange-500" />
            <span className="font-medium text-gray-900">Update Phone</span>
          </button>
        </div>
      </div>
    </div>
  )
}