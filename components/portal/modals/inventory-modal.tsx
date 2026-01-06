"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface InventoryModalProps {
  isOpen: boolean
  mode: "add" | "edit" | "view"
  onClose: () => void
  initialData?: any
  onSave?: (data: any) => void
}

export default function InventoryModal({ isOpen, mode, onClose, initialData, onSave }: InventoryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    status: "",
    description: "",
    supplierName: "",
  })

  useEffect(() => {
    if (isOpen) {
      setFormData(
        initialData || {
          name: "",
          category: "",
          quantity: "",
          price: "",
          status: "",
          description: "",
          supplierName: "",
        }
      )
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) {
      onSave(formData)
    }
    onClose()
  }

  const isReadOnly = mode === "view"
  const title = mode === "add" ? "Add New Item" : mode === "edit" ? "Edit Item" : "View Item"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-xl font-semibold mb-6">{title}</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isReadOnly}
              >
                <option value="">Select category</option>
                <option value="Technology">Technology</option>
                <option value="Academic">Academic</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name</label>
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                placeholder="Enter supplier name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isReadOnly}
              >
                <option value="">Select status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low in Stock">Low in Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isReadOnly}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter item description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                readOnly={isReadOnly}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            {mode !== "view" && (
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
              >
                Save
              </button>
            )}
            {mode === "view" && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
              >
                Close
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
