"use client"

import InventoryStats from "@/components/portal/inventory-stats"
import InventoryCategoryStats from "@/components/portal/inventory-category-stats"
import InventoryTable from "@/components/portal/inventory-table"

export default function InventoryPage() {
  return (
    <main className="flex-1 space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
      <InventoryStats />
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Inventory Products Overview</h2>
        <InventoryCategoryStats />
      </div>
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-700">Inventory Management</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            Export Report
          </button>
        </div>
        <InventoryTable />
      </section>
    </main>
  )
}
