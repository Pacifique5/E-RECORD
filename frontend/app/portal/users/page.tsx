"use client";

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    apiFetch('/users')
      .then((data) => mounted && setUsers(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="overflow-auto bg-white rounded shadow-sm">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{(u.firstName || '') + ' ' + (u.lastName || '')}</td>
                  <td className="px-4 py-2">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
