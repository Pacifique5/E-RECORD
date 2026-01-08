"use client";

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    apiFetch('/inventory')
      .then((data) => mounted && setItems(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Inventory</h2>
      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="overflow-auto bg-white rounded shadow-sm">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Item</th>
                <th className="px-4 py-2 text-left">Quantity</th>
+                <th className="px-4 py-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="px-4 py-2">{r.quantity}</td>
+                  <td className="px-4 py-2">{r.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
