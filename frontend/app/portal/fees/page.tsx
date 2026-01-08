"use client";

import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../../lib/api';

export default function FeesPage() {
  const [fees, setFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    apiFetch('/financial/fees')
      .then((data) => mounted && setFees(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Fees</h2>
      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="overflow-auto bg-white rounded shadow-sm">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f) => (
                <tr key={f.id} className="border-t">
                  <td className="px-4 py-2">{f.title}</td>
                  <td className="px-4 py-2">{f.amount}</td>
                  <td className="px-4 py-2">{f.dueDate?.slice?.(0, 10) || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
