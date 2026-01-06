"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import InventoryModal from "./modals/inventory-modal"

export default function InventoryTable() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
  const [selectedItem, setSelectedItem] = useState(null)

  const items = [
    {
      name: "Laptops",
      category: "Technology",
      quantity: 20,
      status: "In Stock",
      lastUpdated: "10/5/2025",
      supplierName: "Dushimire Aine",
      amount: 800000,
      description: "High performance laptops for staff.",
    },
    {
      name: "Projectors",
      category: "Technology",
      quantity: 10,
      status: "Low Stock",
      lastUpdated: "10/5/2025",
      supplierName: "John Doe",
      amount: 500000,
      description: "Projectors for classrooms.",
    },
    {
      name: "Textbooks",
      category: "Academic",
      quantity: 100,
      status: "In Stock",
      lastUpdated: "10/5/2025",
      supplierName: "Book Supplier Ltd.",
      amount: 200000,
      description: "Academic textbooks for students.",
    },
    {
      name: "Notebooks",
      category: "Academic",
      quantity: 5,
      status: "Low Stock",
      lastUpdated: "10/5/2025",
      supplierName: "Paper Co.",
      amount: 10000,
      description: "Notebooks for students.",
    },
    {
      name: "Cleaning Supplies",
      category: "Maintenance",
      quantity: 0,
      status: "Out of Stock",
      lastUpdated: "10/5/2025",
      supplierName: "Cleaners Inc.",
      amount: 50000,
      description: "Cleaning materials for school.",
    },
    {
      name: "Printers",
      category: "Technology",
      quantity: 8,
      status: "In Stock",
      lastUpdated: "10/5/2025",
      supplierName: "Office Equip.",
      amount: 300000,
      description: "Printers for admin use.",
    },
    {
      name: "Tablets",
      category: "Technology",
      quantity: 15,
      status: "In Stock",
      lastUpdated: "10/5/2025",
      supplierName: "Tech World",
      amount: 600000,
      description: "Tablets for digital learning.",
    },
  ]

  const openViewModal = (item: any) => {
    console.log("View modal opened", item)
    setModalMode("view")
    const itemData = {
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      price: item.amount || item.price || "",
      status: item.status,
      description: item.description || "",
      supplierName: item.supplierName || "",
    }
    setSelectedItem(itemData)
    setModalOpen(true)
  }

  const handleSave = (data: any) => {
    console.log("Saving inventory data:", data)
    // Here you would implement the actual save functionality
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search item"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Technology</option>
            <option>Academic</option>
            <option>Maintenance</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Item Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Quantity</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Updated</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-sm text-gray-900">{item.name}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{item.category}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{item.quantity}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.status === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Low Stock"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{item.lastUpdated}</td>
                <td className="py-3 px-4">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                      onClick={() => openViewModal(item)}
                    >
                      VIEW
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center mt-6 space-x-2">
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Previous</button>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Next</button>
      </div>

      <InventoryModal
        isOpen={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        initialData={selectedItem}
        onSave={handleSave}
      />
    </div>
  )
}
