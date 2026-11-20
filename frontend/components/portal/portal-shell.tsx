"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  LayoutGrid,
  DollarSign,
  FileText,
  BarChart2,
  Users2,
  Package,
  FileBarChart2,
  Settings,
  BookOpen,
  GraduationCap,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { HeaderUserActions } from "@/components/HeaderUserActions"
import BrandLogo from "@/components/brand-logo"
import useAuth from "@/hooks/use-auth"
import type { PortalRole } from "@/lib/portal-role"
import { TERM_OPTIONS, termValue } from "@/lib/academic"
import { AcademicPeriodProvider, useAcademicPeriod } from "@/components/portal/academic-period"

const ROLE_LABEL: Record<PortalRole, string> = {
  headmaster: "Headmaster",
  accountant: "Accountant",
}

const YEARS = [2023, 2024, 2025, 2026, 2027]
const TERMS = TERM_OPTIONS.map((item) => item.label)

function navFor(role: PortalRole) {
  const base = `/portal/${role}`
  return [
    { name: "Dashboard", href: base, icon: LayoutGrid },
    { name: "Students", href: `${base}/students`, icon: GraduationCap },
    { name: "Instructors", href: `${base}/instructors`, icon: BookOpen },
    { name: "Fees Management", href: `${base}/fees`, icon: DollarSign },
    { name: "Expense Management", href: `${base}/expenses`, icon: FileText },
    { name: "Budget Planning", href: `${base}/budget`, icon: BarChart2 },
    { name: "Staff Payroll", href: `${base}/payroll`, icon: Users2 },
    { name: "Inventory", href: `${base}/inventory`, icon: Package },
    { name: "Financial Report", href: `${base}/reports`, icon: FileBarChart2 },
    { name: "Notifications", href: `${base}/notifications`, icon: Bell },
    { name: "Settings", href: `${base}/settings`, icon: Settings },
  ]
}

function FilterMenu({
  value,
  options,
  onChange,
}: {
  value: string | number
  options: Array<string | number>
  onChange: (value: string | number) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="flex items-center space-x-2 bg-white rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 text-sm text-gray-600 font-medium"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value}</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 min-w-full bg-white border border-gray-200 rounded shadow-lg z-40">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-50 whitespace-nowrap ${
                option === value ? "bg-blue-100 font-semibold" : ""
              }`}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PortalShell({
  role,
  children,
}: {
  role: PortalRole
  children: React.ReactNode
}) {
  return (
    <AcademicPeriodProvider>
      <PortalFrame role={role}>{children}</PortalFrame>
    </AcademicPeriodProvider>
  )
}

function PortalFrame({
  role,
  children,
}: {
  role: PortalRole
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user } = useAuth()
  const { year, termLabel, setYear, setTerm } = useAcademicPeriod()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigation = navFor(role)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:max-w-none lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full max-lg:invisible"
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-6 py-6">
          <div className="flex flex-col items-start">
            <BrandLogo href={`/portal/${role}`} className="h-9 w-auto" />
            <span className="mt-3 rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
              {ROLE_LABEL[role]}
            </span>
          </div>
          <button
            type="button"
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={cn(
                  "flex items-center space-x-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <button
              type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-700 lg:hidden"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800 sm:text-base">
              <span className="hidden sm:inline">Welcome to our platform </span>
              {user?.firstName || "User"}
            </h1>
            <div className="hidden items-center gap-3 md:flex">
              <FilterMenu value={year} options={YEARS} onChange={(value) => setYear(Number(value))} />
              <FilterMenu value={termLabel} options={TERMS} onChange={(value) => setTerm(termValue(String(value)))} />
            </div>
            <HeaderUserActions
              user={{
                name: user?.firstName || "User",
                role: ROLE_LABEL[role],
              }}
            />
          </div>
          <div className="flex items-center gap-2 px-4 pb-3 md:hidden">
            <FilterMenu value={year} options={YEARS} onChange={(value) => setYear(Number(value))} />
            <FilterMenu value={termLabel} options={TERMS} onChange={(value) => setTerm(termValue(String(value)))} />
          </div>
        </header>

        <main key={`${year}-${termLabel}`} className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
