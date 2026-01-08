"use client";

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function ExpensesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    apiFetch('/financial/expenses')
      .then((data) => mounted && setItems(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Expenses</h2>
      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="overflow-auto bg-white rounded shadow-sm">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-2">{r.title}</td>
                  <td className="px-4 py-2">{r.amount}</td>
                  <td className="px-4 py-2">{r.date?.slice?.(0, 10) || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
