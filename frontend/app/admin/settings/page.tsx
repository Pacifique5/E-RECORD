'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const PersonalSettings = () => (
  <div className="bg-white rounded-lg p-6 mb-8">
    <h2 className="text-lg font-semibold mb-6">Personal Settings</h2>
    
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Full Names</label>
          <input
            type="text"
            value="Dushimire aine"
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
          <input
            type="text"
            value="System Admin"
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value="aidushimire@gmail.com"
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
          <input
            type="tel"
            value="0788888888"
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
          <input
            type="text"
            value="Kigali Rwanda"
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>
      </div>
    </div>
  </div>
);

const NotificationSettings = () => (
  <div className="bg-white rounded-lg p-6 mb-8">
    <h2 className="text-lg font-semibold mb-6">Notifications</h2>
    
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Notification email</label>
          <input
            type="email"
            value="aidushimire@gmail.com"
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Sms Notification Number</label>
          <input
            type="tel"
            value="0788888888"
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Allowed Notifications</label>
        <select className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-gray-700">
          <option value="">Select an option</option>
          <option>All</option>
        </select>
      </div>
    </div>
  </div>
);

const DataBackupSettings = () => (
  <div className="bg-white rounded-lg p-6 mb-8">
    <h2 className="text-lg font-semibold mb-6">Data Backup</h2>
    
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Backup Frequency</label>
      <select className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-gray-700">
        <option value="">Select an option</option>
        <option>Daily</option>
      </select>
    </div>
  </div>
);

const InsecureLoginAttempts = () => (
  <div className="bg-white rounded-lg p-6">
    <h2 className="text-lg font-semibold mb-6">Insecure Login attempts</h2>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="pb-3 text-sm font-medium text-gray-600">Email</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Login attempts</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Login Time</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-4 text-sm">ainedushimire@gmail.com</td>
              <td className="py-4 text-sm">20</td>
              <td className="py-4 text-sm">20/1/2025</td>
              <td className="py-4">
                <button className="px-4 py-1 bg-[#F04438] text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                  Unauthorize
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 text-center">
        <div className="text-xs text-gray-400 mb-1">This Hour</div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{payload[0].value.toLocaleString()}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    );
  }
  return null;
};

const UsageChart = () => {
  const data = [
    { time: '0-2:00', hours: 140 },
    { time: '2-4:00', hours: 170 },
    { time: '4-6:00', hours: 160 },
    { time: '6-8:00', hours: 155 },
    { time: '8-10:00', hours: 180 },
    { time: '10-12:00', hours: 220342123 },
    { time: '12-14:00', hours: 220 },
    { time: '14-16:00', hours: 210 },
    { time: '16-18:00', hours: 250 },
    { time: '18-20:00', hours: 230 },
    { time: '20-22:00', hours: 180 },
    { time: '22-0:00', hours: 190 },
  ];

  return (
    <div className="bg-white rounded-lg p-6 mt-8">
      <h2 className="text-lg font-semibold mb-6">Most Hours to Used in System</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="hours" stroke="#1A75FF" fill="#1A75FF" fillOpacity={0.1} />
            <Line type="monotone" dataKey="hours" stroke="#1A75FF" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default function Settings() {
  return (
    <div className="font-inter">
      <PersonalSettings />
      <NotificationSettings />
      <DataBackupSettings />
      <InsecureLoginAttempts />
      <UsageChart />
    </div>
  );
} 