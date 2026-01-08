"use client"

import { useEffect, useState } from "react"
import { Building2, MapPin, Phone, Mail, Calendar, CheckCircle } from "lucide-react"
import useAuth from '@/hooks/use-auth'

export default function SchoolInfoCard() {
  const { user } = useAuth()
  
  if (!user?.school) {
    return null
  }

  const school = user.school

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Building2 className="h-5 w-5 mr-2 text-blue-500" />
          School Information
        </h2>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-green-600 capitalize">{school.status}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Building2 className="h-4 w-4 text-gray-400 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">{school.name}</p>
              <p className="text-xs text-gray-500">School Name</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
              {school.code}
            </div>
            <div>
              <p className="text-xs text-gray-500">School Code</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Calendar className="h-4 w-4 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-900">
                {new Date().getFullYear()} Academic Year
              </p>
              <p className="text-xs text-gray-500">Current Session</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
            <div>
              <p className="text-sm text-gray-900">Active & Approved</p>
              <p className="text-xs text-gray-500">System Status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}