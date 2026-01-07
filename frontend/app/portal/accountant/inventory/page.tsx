"use client"

import InventoryStats from "../../../../components/portal/inventory-stats"
import InventoryCategoryStats from "../../../../components/portal/inventory-category-stats"
import InventoryTable from "../../../../components/portal/inventory-table"

export default function InventoryPage() {
  return (
    <main className="flex-1 p-8 space-y-8">
      <InventoryStats />
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Inventory Products Overview</h2>
        <InventoryCategoryStats />
      </div>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Inventory Management</h2>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Export Report</button>
            {/* The Add Item button is inside InventoryTable for modal logic */}
          </div>
        </div>
        <InventoryTable />
      </section>
    </main>
  )
}
