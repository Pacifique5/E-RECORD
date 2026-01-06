"use client";

import { useState } from "react";
import GeneralSettings from "@/components/portal/general-settings"
import PersonalSettings from "@/components/portal/personal-settings"
import NotificationSettings from "@/components/portal/notification-settings"
import DataBackup from "@/components/portal/data-backup"

export default function Settings() {
  return (
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
            <input type="text" defaultValue="Accountant" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
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
        <h3 className="text-2xl font-semibold mb-8 text-blue-700">Notification Settings</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive notifications about important updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
            <div>
              <h4 className="font-medium text-gray-900">SMS Notifications</h4>
              <p className="text-sm text-gray-500">Receive important alerts via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-2xl font-semibold mb-8 text-blue-700">Data Backup</h3>
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Backup Schedule</h4>
            <p className="text-sm text-gray-500 mb-4">Automatically backup your data every week</p>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-base font-medium shadow hover:bg-blue-700 transition">
              Backup Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
