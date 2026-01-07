"use client"

import { useState } from "react"

export default function FinancialInformation() {
  const [activeTab, setActiveTab] = useState("profit-loss")

  const tabs = [
    { id: "profit-loss", label: "Profit and Loss Statement" },
    { id: "cash-flow", label: "Cash Flow Statement" },
    { id: "balance-sheet", label: "Balance Sheet" },
    { id: "custom-reports", label: "Custom Reports" },
  ]

  // Data for each tab
  const profitLossData = [
    { category: "School Fees", amount: "850000", type: "income" },
    { category: "School Materials", amount: "850000", type: "expense" },
    { category: "School Fees", amount: "850000", type: "income" },
    { category: "School Fees", amount: "850000", type: "expense" },
    { category: "School Fees", amount: "850000", type: "income" },
    { category: "Net Profit", amount: "850000", type: "profit" },
  ]
  const cashFlowData = [
    { period: "January", inflow: "100000", outflow: "100000", net: "100000" },
    { period: "February", inflow: "100000", outflow: "100000", net: "100000" },
    { period: "March", inflow: "100000", outflow: "100000", net: "100000" },
    { period: "April", inflow: "100000", outflow: "100000", net: "100000" },
  ]
  const balanceSheetAssets = [
    { asset: "School Fees", amount: "850000" },
    { asset: "School Materials", amount: "850000" },
    { asset: "School Fees", amount: "850000" },
  ]
  const balanceSheetLiabilities = [
    { liability: "School Fees", amount: "850000" },
    { liability: "School Materials", amount: "850000" },
    { liability: "School Fees", amount: "850000" },
  ]
  // Custom Reports: just a placeholder for now

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Financial Information</h2>
      <div className="flex space-x-1 mb-6">
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
          <div className="lg:col-span-2">
            <table className="w-full">
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
                <span className="text-sm font-medium text-gray-900">55%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "55%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Expenses</span>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-red-500" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Action</h3>
              <div className="flex space-x-3">
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
          <table className="w-full mb-8">
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
          <div className="flex items-center space-x-3 mt-6">
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
          <div className="mb-6 text-lg font-semibold">Net Cash : 1000000</div>
          <div className="flex items-center space-x-3">
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
            <div className="flex space-x-3 mb-6">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700">Download Report</button>
              <button className="bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md text-sm hover:bg-blue-50">Preview</button>
            </div>
            <div className="flex items-center space-x-3">
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
