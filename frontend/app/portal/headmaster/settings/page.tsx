"use client";

import { useState } from "react";
import GeneralSettings from "@/components/portal/general-settings"
import PersonalSettings from "@/components/portal/personal-settings"
import NotificationSettings from "@/components/portal/notification-settings"
import DataBackup from "@/components/portal/data-backup"

export default function Settings() {
  const [accountants, setAccountants] = useState([
    { name: "Dushimire aine", email: "ainedushimire@gmail.com", createdAt: "20/10/2025" },
  ]);
  const [newAccountant, setNewAccountant] = useState({ name: "", email: "", createdAt: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editAccountant, setEditAccountant] = useState({ name: "", email: "", createdAt: "" });

  const handleAdd = () => {
    if (newAccountant.name && newAccountant.email && newAccountant.createdAt) {
      setAccountants([...accountants, newAccountant]);
      setNewAccountant({ name: "", email: "", createdAt: "" });
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditAccountant(accountants[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updated = [...accountants];
      updated[editingIndex] = editAccountant;
      setAccountants(updated);
      setEditingIndex(null);
      setEditAccountant({ name: "", email: "", createdAt: "" });
    }
  };

  const handleDelete = (index: number) => {
    setAccountants(accountants.filter((_, i) => i !== index));
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
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-base font-medium shadow hover:bg-blue-700 transition"
              onClick={handleAdd}
              type="button"
            >
              Add an accountant
            </button>
          </div>
          <div className="overflow-x-auto mb-4 rounded-lg shadow">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-base font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-gray-700">Created at</th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {accountants.map((acc, idx) => (
                  <tr key={idx} className="border-b hover:bg-blue-50/30">
                    {editingIndex === idx ? (
                      <>
                        <td className="px-6 py-3 text-base text-gray-800">
                          <input type="text" value={editAccountant.name} onChange={e => setEditAccountant({ ...editAccountant, name: e.target.value })} className="px-2 py-1 border rounded" />
                        </td>
                        <td className="px-6 py-3 text-base text-gray-800">
                          <input type="text" value={editAccountant.email} onChange={e => setEditAccountant({ ...editAccountant, email: e.target.value })} className="px-2 py-1 border rounded" />
                        </td>
                        <td className="px-6 py-3 text-base text-gray-800">
                          <input type="text" value={editAccountant.createdAt} onChange={e => setEditAccountant({ ...editAccountant, createdAt: e.target.value })} className="px-2 py-1 border rounded" />
                        </td>
                        <td className="px-6 py-3 text-base">
                          <button className="bg-green-600 text-white px-4 py-1 rounded mr-2" onClick={handleSaveEdit} type="button">Save</button>
                          <button className="bg-gray-400 text-white px-4 py-1 rounded" onClick={() => setEditingIndex(null)} type="button">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-3 text-base text-gray-800">{acc.name}</td>
                        <td className="px-6 py-3 text-base text-gray-800">{acc.email}</td>
                        <td className="px-6 py-3 text-base text-gray-800">{acc.createdAt}</td>
                        <td className="px-6 py-3 text-base">
                          <button className="bg-blue-600 text-white px-4 py-1 rounded mr-2 hover:bg-blue-700 transition" onClick={() => handleEdit(idx)} type="button">Edit</button>
                          <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition" onClick={() => handleDelete(idx)} type="button">Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                <tr>
                  <td className="px-6 py-3 text-base">
                    <input type="text" value={newAccountant.name} onChange={e => setNewAccountant({ ...newAccountant, name: e.target.value })} className="px-2 py-1 border rounded" placeholder="Name" />
                  </td>
                  <td className="px-6 py-3 text-base">
                    <input type="text" value={newAccountant.email} onChange={e => setNewAccountant({ ...newAccountant, email: e.target.value })} className="px-2 py-1 border rounded" placeholder="Email" />
                  </td>
                  <td className="px-6 py-3 text-base">
                    <input type="text" value={newAccountant.createdAt} onChange={e => setNewAccountant({ ...newAccountant, createdAt: e.target.value })} className="px-2 py-1 border rounded" placeholder="Created at" />
                  </td>
                  <td></td>
                </tr>
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
