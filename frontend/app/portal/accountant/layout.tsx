"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Bell, LayoutGrid, DollarSign, FileText, BarChart2, Users2, Package, FileBarChart2, Settings, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HeaderUserActions } from '@/components/HeaderUserActions'
import useAuth from '@/hooks/use-auth'
import React, { useState, useRef, useEffect } from 'react'

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
  const { user } = useAuth()
  
  const userInfo = {
    name: user?.firstName || 'User',
    role: 'Accountant',
    avatar: '/mp.jpg',
  }
  const years = [2023, 2024, 2025, 2026, 2027]
  const terms = ['First Term', 'Second Term', 'Third Term']
  const [selectedYear, setSelectedYear] = useState(2025)
  const [yearDropdown, setYearDropdown] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState('First Term')
  const [termDropdown, setTermDropdown] = useState(false)

  const yearRef = useRef<HTMLDivElement | null>(null)
  const termRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (yearDropdown && yearRef.current && !yearRef.current.contains(target)) {
        setYearDropdown(false)
      }
      if (termDropdown && termRef.current && !termRef.current.contains(target)) {
        setTermDropdown(false)
        setSelectedTerm('First Term')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [yearDropdown, termDropdown])

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-96 bg-slate-900 border-r border-slate-800 flex flex-col rounded-r-3xl">
        <div className="p-6">
          <div className="flex flex-col items-start">
            <Link href="/portal/accountant" className="text-xl font-semibold text-white">
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
                  "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white hover:translate-x-1"
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
              Welcome to our platform {user?.firstName || 'User'}
            </h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div ref={yearRef} className="relative">
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
                <div ref={termRef} className="relative">
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
                <HeaderUserActions user={userInfo} />
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
