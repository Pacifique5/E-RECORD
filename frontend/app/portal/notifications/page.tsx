"use client";

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function NotificationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    apiFetch('/notifications')
      .then((data) => mounted && setItems(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="overflow-auto bg-white rounded shadow-sm">
          <ul className="divide-y">
            {items.map((n) => (
              <li key={n.id} className="px-4 py-3">
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-gray-600">{n.message}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
