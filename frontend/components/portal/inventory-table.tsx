"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { apiFetch } from "@/lib/api"
import InventoryModal from "./modals/inventory-modal"

type InventoryItem = {
  id: string
  name: string
  category: string
  quantity: number
  unitCost: number
  description?: string
  supplier?: string
  updatedAt?: string
}

function stockStatus(quantity: number) {
  if (quantity <= 0) return "Out of Stock"
  if (quantity <= 5) return "Low Stock"
  return "In Stock"
}

export default function InventoryTable() {
  const [modalOpen, setModalOpen] = useState(false)
  const [items, setItems] = useState<InventoryItem[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [status, setStatus] = useState("All Status")
  const [selectedItem, setSelectedItem] = useState<{
    name: string
    category: string
    quantity: number | string
    price: number | string
    status: string
    description: string
    supplierName: string
  } | null>(null)

  useEffect(() => {
    apiFetch("/inventory")
      .then((data: InventoryItem[]) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
  }, [])

  const categories = ["All Categories", ...Array.from(new Set(items.map((item) => item.category).filter(Boolean)))]
  const filtered = items.filter((item) => {
    const itemStatus = stockStatus(Number(item.quantity || 0))
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All Categories" || item.category === category
    const matchesStatus = status === "All Status" || itemStatus === status
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="rounded-lg bg-white p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search item"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            {categories.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px]">
          <thead>
            <tr className="border-b border-gray-200">
              {["Item Name", "Category", "Quantity", "Status", "Last Updated", "Action"].map((heading) => (
                <th key={heading} className="text-left py-3 px-4 text-sm font-medium text-gray-600">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-gray-500">No inventory items found.</td>
              </tr>
            ) : (
              filtered.map((item) => {
                const itemStatus = stockStatus(Number(item.quantity || 0))
                return (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.quantity}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          itemStatus === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : itemStatus === "Low Stock"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {itemStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("en-US") : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                        onClick={() => {
                          setSelectedItem({
                            name: item.name,
                            category: item.category,
                            quantity: item.quantity,
                            price: item.unitCost,
                            status: itemStatus,
                            description: item.description || "",
                            supplierName: item.supplier || "",
                          })
                          setModalOpen(true)
                        }}
                      >
                        VIEW
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <InventoryModal
        isOpen={modalOpen}
        mode="view"
        onClose={() => setModalOpen(false)}
        initialData={selectedItem}
      />
    </div>
  )
}
