"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import useAuth from "@/hooks/use-auth";

interface Accountant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export default function Settings() {
  const { user } = useAuth();
  const [accountants, setAccountants] = useState<Accountant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccountant, setNewAccountant] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "",
    phoneNumber: ""
  });

  useEffect(() => {
    fetchAccountants();
  }, []);

  const fetchAccountants = async () => {
    try {
      const response = await apiFetch('/users?role=accountant');
      setAccountants(response.users || []);
    } catch (err) {
      console.error('Failed to fetch accountants:', err);
    }
  };

  const handleAddAccountant = async () => {
    if (!newAccountant.firstName || !newAccountant.lastName || !newAccountant.email || !newAccountant.password) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await apiFetch('/auth/add-accountant', {
        method: 'POST',
        body: JSON.stringify(newAccountant),
      });

      setNewAccountant({ firstName: "", lastName: "", email: "", password: "", phoneNumber: "" });
      setShowAddForm(false);
      fetchAccountants(); // Refresh the list
    } catch (err: any) {
      const msg = err?.body?.message || err?.message || 'Failed to add accountant';
      setError(Array.isArray(msg) ? msg.join(', ') : String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Settings</h2>
        <section className="mb-14">
          <h3 className="text-2xl font-semibold mb-8 text-blue-700">General Settings</h3>
          <div className="grid grid-cols-3 gap-10 items-start">
            <div className="col-span-2 space-y-8">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">School Name</label>
                <input type="text" defaultValue="Rwanda coding academy" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Academic Year</label>
                  <input type="text" defaultValue="2024-2025" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Term</label>
                  <input type="text" defaultValue="Term 1" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Location</label>
                  <input type="text" defaultValue="Kigali Rwanda" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-2">
              <label className="block text-base font-medium text-gray-700 mb-2">School Logo</label>
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-600 shadow text-white text-3xl font-bold select-none">
                R
              </div>
            </div>
          </div>
        </section>
        <section className="mb-14">
          <h3 className="text-2xl font-semibold mb-8 text-blue-700">Personal Settings</h3>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Full Names</label>
              <input type="text" defaultValue="Dushimire aine" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Role</label>
              <input type="text" defaultValue="Headmaster" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Location</label>
              <input type="text" defaultValue="Kigali Rwanda" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Email</label>
              <input type="text" defaultValue="aidushimire@gmail.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="text" defaultValue="0788888888" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
            </div>
          </div>
        </section>
        <section className="mb-14">
          <h3 className="text-2xl font-semibold mb-8 text-blue-700">Accountant Management</h3>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-base font-medium shadow hover:bg-blue-700 transition"
              onClick={() => setShowAddForm(!showAddForm)}
              type="button"
            >
              {showAddForm ? 'Cancel' : 'Add an accountant'}
            </button>
          </div>

          {showAddForm && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg border">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Add New Accountant</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={newAccountant.firstName}
                    onChange={(e) => setNewAccountant({ ...newAccountant, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={newAccountant.lastName}
                    onChange={(e) => setNewAccountant({ ...newAccountant, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newAccountant.email}
                    onChange={(e) => setNewAccountant({ ...newAccountant, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (optional)</label>
                  <input
                    type="tel"
                    value={newAccountant.phoneNumber}
                    onChange={(e) => setNewAccountant({ ...newAccountant, phoneNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={newAccountant.password}
                  onChange={(e) => setNewAccountant({ ...newAccountant, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="Enter password (min. 6 characters)"
                  required
                  minLength={6}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddAccountant}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
                  type="button"
                >
                  {loading ? 'Adding...' : 'Add Accountant'}
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto mb-4 rounded-lg shadow">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-base font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-gray-700">Created at</th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {accountants.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No accountants added yet. Click "Add an accountant" to get started.
                    </td>
                  </tr>
                ) : (
                  accountants.map((acc) => (
                    <tr key={acc.id} className="border-b hover:bg-blue-50/30">
                      <td className="px-6 py-3 text-base text-gray-800">
                        {acc.firstName} {acc.lastName}
                      </td>
                      <td className="px-6 py-3 text-base text-gray-800">{acc.email}</td>
                      <td className="px-6 py-3 text-base text-gray-800">
                        {new Date(acc.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 text-base">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mb-14">
          <h3 className="text-2xl font-semibold mb-8 text-blue-700">Notifications</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Notification email</label>
              <input type="text" defaultValue="aidushimire@gmail.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Sms Notification Number</label>
              <input type="text" defaultValue="0788888888" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
            </div>
          </div>
          <div className="mt-8 w-1/2">
            <label className="block text-base font-medium text-gray-700 mb-2">Allowed Notifications</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition">
              <option>All</option>
            </select>
          </div>
        </section>
        <section>
          <h3 className="text-2xl font-semibold mb-8 text-blue-700">Data Backup</h3>
          <div className="w-1/2">
            <label className="block text-base font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition">
              <option>Daily</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  )
}
