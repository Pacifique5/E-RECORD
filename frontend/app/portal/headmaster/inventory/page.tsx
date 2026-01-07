"use client"

import InventoryStats from "../../../../components/portal/inventory-stats"
import InventoryCategoryStats from "../../../../components/portal/inventory-category-stats"
import InventoryTable from "../../../../components/portal/inventory-table"

export default function InventoryPage() {
  return (
    <div className="bg-white rounded-lg">
      <div className="p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Inventory Management</h2>
        <div className="space-y-8">
      <InventoryStats />
      <div>
            <h3 className="text-2xl font-semibold mb-8 text-blue-700">Inventory Products Overview</h3>
        <InventoryCategoryStats />
      </div>
      <section>
        <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-blue-700">Inventory Items</h3>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Export Report</button>
          </div>
        </div>
        <InventoryTable />
      </section>
        </div>
      </div>
    </div>
  )
}
