"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Bell, LayoutGrid, DollarSign, FileText, BarChart2, Users2, Package, FileBarChart2, Settings, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HeaderUserActions } from '@/components/HeaderUserActions'
import React, { useState } from 'react'

const navigation = [
  {
    name: "Dashboard",
    href: "/portal/accountant",
    icon: LayoutGrid,
  },
  {
    name: "Fees Management",
    href: "/portal/accountant/fees",
    icon: DollarSign,
  },
  {
    name: "Expense Management",
    href: "/portal/accountant/expenses",
    icon: FileText,
  },
  {
    name: "Budget Planning",
    href: "/portal/accountant/budget",
    icon: BarChart2,
  },
  {
    name: "Staff Payroll",
    href: "/portal/accountant/payroll",
    icon: Users2,
  },
  {
    name: "Inventory",
    href: "/portal/accountant/inventory",
    icon: Package,
  },
  {
    name: "Financial Report",
    href: "/portal/accountant/reports",
    icon: FileBarChart2,
  },
  {
    name: "Notifications",
    href: "/portal/accountant/notifications",
    icon: Bell,
  },
  {
    name: "Settings",
    href: "/portal/accountant/settings",
    icon: Settings,
  },
]

export default function AccountantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const user = {
    name: 'fique paci',
    role: 'Accountant',
    avatar: '/mp.jpg',
  }
  const years = [2023, 2024, 2025, 2026, 2027]
  const terms = ['First Term', 'Second Term', 'Third Term']
  const [selectedYear, setSelectedYear] = useState(2025)
  const [yearDropdown, setYearDropdown] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState('First Term')
  const [termDropdown, setTermDropdown] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <div className="flex flex-col items-start">
            <Link href="/portal/accountant" className="text-xl font-semibold text-blue-600">
              E-Record
            </Link>
            <span className="bg-[#1A75FF] text-white rounded-full px-5 py-1 font-medium text-sm mt-2">
              Accountant
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome to our platform fique
            </h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 border border-gray-200 text-sm text-gray-600 font-medium"
                    onClick={() => setYearDropdown((open) => !open)}
                  >
                    <span>{selectedYear}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  {yearDropdown && (
                    <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-40">
                      {years.map((y) => (
                        <div
                          key={y}
                          className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${y === selectedYear ? 'bg-blue-100 font-semibold' : ''}`}
                          onClick={() => { setSelectedYear(y); setYearDropdown(false); }}
                        >
                          {y}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 border border-gray-200 text-sm text-gray-600 font-medium"
                    onClick={() => setTermDropdown((open) => !open)}
                  >
                    <span>{selectedTerm}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  {termDropdown && (
                    <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-40">
                      {terms.map((term) => (
                        <div
                          key={term}
                          className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${term === selectedTerm ? 'bg-blue-100 font-semibold' : ''}`}
                          onClick={() => { setSelectedTerm(term); setTermDropdown(false); }}
                        >
                          {term}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <HeaderUserActions user={user} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
