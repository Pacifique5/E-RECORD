"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

function money(amount: number) {
  return `${Math.round(amount)} Rwf`
}

export default function FinancialInformation() {
  const [activeTab, setActiveTab] = useState("profit-loss")
  const [netCash, setNetCash] = useState(0)
  const [incomeShare, setIncomeShare] = useState(0)
  const [expenseShare, setExpenseShare] = useState(0)
  const [profitLossData, setProfitLossData] = useState<{ category: string; amount: string; type: string }[]>([])
  const [cashFlowData, setCashFlowData] = useState<{ period: string; inflow: string; outflow: string; net: string }[]>([])
  const [balanceSheetAssets, setBalanceSheetAssets] = useState<{ asset: string; amount: string }[]>([])
  const [balanceSheetLiabilities, setBalanceSheetLiabilities] = useState<{ liability: string; amount: string }[]>([])

  useEffect(() => {
    Promise.all([
      apiFetch("/dashboard/financial-summary"),
      apiFetch("/dashboard/charts/income-expenses").catch(() => []),
    ])
      .then(([summary, months]) => {
        const income = Number(summary?.totalIncome || 0)
        const expenses = Number(summary?.totalExpenses || 0)
        const payroll = Number(summary?.totalPayroll || 0)
        const net = Number(summary?.netProfit || 0)
        const base = income + expenses + payroll
        setNetCash(net)
        setIncomeShare(base ? Math.round((income / base) * 100) : 0)
        setExpenseShare(base ? Math.round(((expenses + payroll) / base) * 100) : 0)
        setProfitLossData([
          { category: "School Fees", amount: money(income), type: "income" },
          { category: "Term Expenses", amount: money(expenses), type: "expense" },
          { category: "Staff Payroll", amount: money(payroll), type: "expense" },
          { category: "Net Profit", amount: money(net), type: "profit" },
        ])
        setCashFlowData(
          (Array.isArray(months) ? months : []).map((month: { month: string; income: number; expenses: number }) => ({
            period: month.month,
            inflow: money(Number(month.income || 0)),
            outflow: money(Number(month.expenses || 0)),
            net: money(Number(month.income || 0) - Number(month.expenses || 0)),
          }))
        )
        setBalanceSheetAssets([{ asset: "School Fees", amount: money(income) }])
        setBalanceSheetLiabilities([
          { liability: "Expenses", amount: money(expenses) },
          { liability: "Payroll", amount: money(payroll) },
        ])
      })
      .catch(() => setNetCash(0))
  }, [])

  const tabs = [
    { id: "profit-loss", label: "Profit and Loss Statement" },
    { id: "cash-flow", label: "Cash Flow Statement" },
    { id: "balance-sheet", label: "Balance Sheet" },
    { id: "custom-reports", label: "Custom Reports" },
  ]

  return (
    <div className="rounded-lg bg-white p-4 sm:p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">Financial Information</h2>
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      {activeTab === "profit-loss" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {profitLossData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className={`py-3 px-4 text-sm ${item.type === "profit" ? "font-bold" : "text-gray-900"}`}>{item.category}</td>
                    <td
                      className={`py-3 px-4 text-sm font-medium ${
                        item.type === "income"
                          ? "text-green-600"
                          : item.type === "expense"
                          ? "text-red-600"
                          : item.type === "profit"
                          ? "text-green-600 font-bold"
                          : "text-gray-900"
                      }`}
                    >
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Income</span>
                <span className="text-sm font-medium text-gray-900">{incomeShare}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: `${incomeShare}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Expenses</span>
                <span className="text-sm font-medium text-gray-900">{expenseShare}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-red-500" style={{ width: `${expenseShare}%` }}></div>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Action</h3>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700">Export Report</button>
                <button className="bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md text-sm hover:bg-blue-50">Print Report</button>
                <button className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md text-sm hover:bg-gray-50">Share via gmail</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "cash-flow" && (
        <div>
          <div className="overflow-x-auto">
          <table className="mb-8 w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Periods</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Inflow</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Outflow</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Net Cash</th>
              </tr>
            </thead>
            <tbody>
              {cashFlowData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{item.period}</td>
                  <td className="py-3 px-4 text-sm font-medium text-green-600">{item.inflow}</td>
                  <td className="py-3 px-4 text-sm font-medium text-red-600">{item.outflow}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{item.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700">Export Report</button>
            <button className="bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md text-sm hover:bg-blue-50">Print Report</button>
            <button className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md text-sm hover:bg-gray-50">Share via gmail</button>
          </div>
        </div>
      )}
      {activeTab === "balance-sheet" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Assets</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {balanceSheetAssets.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">{item.asset}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Liability</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {balanceSheetLiabilities.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">{item.liability}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-6 text-lg font-semibold">
            Net Cash : {new Intl.NumberFormat("en-RW", { maximumFractionDigits: 0 }).format(netCash)} Rwf
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700">Export Report</button>
            <button className="bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md text-sm hover:bg-blue-50">Print Report</button>
            <button className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md text-sm hover:bg-gray-50">Share via gmail</button>
          </div>
        </div>
      )}
      {activeTab === "custom-reports" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <div className="font-semibold mb-4">Report Preparement</div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Select report fields</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-2">
                <option>Report field</option>
              </select>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Academic</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Select time range</label>
              <div className="flex space-x-2">
                <input type="text" className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="yyyy/mm/dd" />
                <input type="text" className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="yyyy/mm/dd" />
              </div>
            </div>
            <div className="mb-6 flex flex-wrap gap-3">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700">Download Report</button>
              <button className="bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md text-sm hover:bg-blue-50">Preview</button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700">Export Report</button>
              <button className="bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md text-sm hover:bg-blue-50">Print Report</button>
              <button className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-md text-sm hover:bg-gray-50">Share via gmail</button>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-4">Preview</div>
            <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      )}
    </div>
  )
}
