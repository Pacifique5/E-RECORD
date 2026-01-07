"use client"

import { useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, DollarSign, Receipt, PieChart, Users, Package, FileText, Bell, Settings } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const navigation = useMemo(() => [
    { id: "dashboard", name: "Dashboard", href: "/portal/accountant", icon: LayoutDashboard },
    { id: "fees", name: "Fees Management", href: "/portal/accountant/fees-management", icon: DollarSign },
    { id: "expenses", name: "Expense Management", href: "/portal/accountant/expense-management", icon: Receipt },
    { id: "budget", name: "Budget Planning", href: "/portal/accountant/budget-planning", icon: PieChart },
    { id: "payroll", name: "Staff Payroll", href: "/portal/accountant/staff-payroll", icon: Users },
    { id: "inventory", name: "Inventory", href: "/portal/accountant/inventory", icon: Package },
    { id: "financial", name: "Financial Report", href: "/portal/accountant/financial-report", icon: FileText },
    { id: "notifications", name: "Notifications", href: "/portal/accountant/notifications", icon: Bell },
    { id: "settings", name: "Settings", href: "/portal/accountant/settings", icon: Settings },
  ], [])

  return (
    <div className="w-96 bg-slate-900 border-r border-slate-800 rounded-r-3xl">
      <div className="p-8">
        <Link href="/portal/accountant" className="text-3xl font-bold text-white">
          E-Record
        </Link>
        <div className="mt-4">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium">Accountant</span>
        </div>
      </div>

      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white hover:translate-x-1"
                  }`}
                >
                  <item.icon className="mr-4 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
