"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Eye, AlertTriangle } from "lucide-react"
import { apiFetch } from "@/lib/api"

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  minQuantity: number
  unit: string
  unitPrice: number
  totalValue: number
  supplier?: string
  location?: string
  notes?: string
  createdAt: string
}

export default function InventoryManagement() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showLowStock, setShowLowStock] = useState(false)

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const data = await apiFetch('/inventory')
      setItems(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch inventory:', error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.supplier && item.supplier.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesLowStock = !showLowStock || item.quantity <= item.minQuantity
    
    return matchesSearch && matchesLowStock
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const isLowStock = (item: InventoryItem) => item.quantity <= item.minQuantity

  const lowStockCount = items.filter(isLowStock).length

  if (loading) {
    return <div className="p-6">Loading inventory...</div>
  }

  return (
    <div className="bg-white rounded-lg p-6">
      {lowStockCount > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-yellow-800">
              {lowStockCount} item{lowStockCount > 1 ? 's' : ''} running low on stock
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end mb-6 space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
          Export Report
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Item
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Office Supplies</option>
            <option>Classroom Equipment</option>
            <option>Maintenance</option>
            <option>Technology</option>
          </select>
          <button
            onClick={() => setShowLowStock(!showLowStock)}
            className={`px-3 py-2 text-sm rounded-md border ${
              showLowStock 
                ? 'bg-yellow-100 text-yellow-800 border-yellow-300' 
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {showLowStock ? 'Show All' : 'Low Stock Only'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Item Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Quantity</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Unit Price</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Value</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Supplier</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  {items.length === 0 ? 'No inventory items found' : 'No items match your search'}
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    <div className="flex items-center">
                      {isLowStock(item) && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                      )}
                      {item.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{item.category}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    <span className={isLowStock(item) ? 'text-red-600 font-medium' : ''}>
                      {item.quantity} {item.unit}
                    </span>
                    <div className="text-xs text-gray-500">Min: {item.minQuantity}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(item.totalValue)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{item.supplier || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      isLowStock(item) 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {isLowStock(item) ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center mt-6 space-x-2">
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">← Previous</button>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Next →</button>
      </div>
    </div>
  )
}