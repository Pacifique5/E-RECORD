"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { apiFetch } from "@/lib/api"
import { paymentMethodLabel } from "@/lib/payment-method"

type FeeRow = {
  id: string
  studentName: string
  amount: number | string
  amountPaid: number | string
  status: string
  paidDate?: string
  dueDate?: string
  type?: string
  paymentMethod?: string
}

type PayrollRow = {
  id: string
  staffName: string
  position?: string
  netSalary: number | string
  status: string
  paidDate?: string
  payrollMonth?: string
  paymentMethod?: string
}

function formatDate(value?: string) {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-US")
}

function statusClass(status: string) {
  return status.toLowerCase() === "paid" ? "text-blue-600" : "text-gray-600"
}

export function DashboardFeesTable({ role }: { role: string }) {
  const [rows, setRows] = useState<FeeRow[]>([])

  useEffect(() => {
    apiFetch("/financial/fees")
      .then((data: FeeRow[]) => setRows(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setRows([]))
  }, [])

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900">School Fees Management</h2>
        <Link href={`/portal/${role}/fees`} className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700">
          View All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["Student Names", "Class", "Amount", "Date", "Status", "Payment Method"].map((heading) => (
                <th key={heading} className="text-left py-3 pr-4 text-sm font-medium text-gray-500">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-gray-500">No fees recorded yet.</td>
              </tr>
            ) : (
              rows.map((fee) => (
                <tr key={fee.id} className="border-b border-gray-50">
                  <td className="py-3 pr-4 text-sm text-gray-800">{fee.studentName}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">—</td>
                  <td className="py-3 pr-4 text-sm text-gray-800">{Math.round(Number(fee.amountPaid || fee.amount || 0))}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{formatDate(fee.paidDate || fee.dueDate)}</td>
                  <td className={`py-3 pr-4 text-sm capitalize ${statusClass(fee.status)}`}>{fee.status}</td>
                  <td className="py-3 text-sm text-gray-600">{paymentMethodLabel(fee.paymentMethod)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function DashboardPayrollTable({ role }: { role: string }) {
  const [rows, setRows] = useState<PayrollRow[]>([])

  useEffect(() => {
    apiFetch("/financial/payrolls")
      .then((data: PayrollRow[]) => setRows(Array.isArray(data) ? data : []))
      .catch(() => setRows([]))
  }, [])

  const total = rows.reduce((sum, row) => sum + Number(row.netSalary || 0), 0)

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Staff Payroll</h2>
          <p className="text-sm text-gray-500 mt-1">Total amount : {Math.round(total)} Rwf</p>
        </div>
        <Link href={`/portal/${role}/payroll`} className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700">
          View All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["Staff Name", "Department", "Amount", "Date", "Status", "Payment Method"].map((heading) => (
                <th key={heading} className="text-left py-3 pr-4 text-sm font-medium text-gray-500">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-gray-500">No payroll records found.</td>
              </tr>
            ) : (
              rows.slice(0, 6).map((row) => (
                <tr key={row.id} className="border-b border-gray-50">
                  <td className="py-3 pr-4 text-sm text-gray-800">{row.staffName}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{row.position || "—"}</td>
                  <td className="py-3 pr-4 text-sm text-gray-800">{Math.round(Number(row.netSalary || 0))}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{formatDate(row.paidDate || row.payrollMonth)}</td>
                  <td className={`py-3 pr-4 text-sm capitalize ${statusClass(row.status)}`}>{row.status}</td>
                  <td className="py-3 text-sm text-gray-600">{paymentMethodLabel(row.paymentMethod)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
