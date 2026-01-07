"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import SchoolModal from "@/components/portal/modals/school-modal";

// Stats Card Component
const StatsCard = ({ value, label, color }: { value: string; label: string; color: string }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <span className={`text-2xl font-semibold ${color}`}>{value}</span>
        <span className="text-gray-600 mt-1">{label}</span>
      </div>
    </div>
  );
};

// School Registration Trend Chart Component
const RegistrationTrendChart = () => {
  const data = [
    { month: 'Jan', schools: 5 },
    { month: 'Feb', schools: 8 },
    { month: 'Mar', schools: 12 },
    { month: 'Apr', schools: 15 },
    { month: 'May', schools: 20 },
    { month: 'Jun', schools: 25 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
      <h2 className="text-lg font-semibold mb-4">School Registration Trend</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="schools" fill="#1A75FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// School Request Table Component
const SchoolRequestTable = ({ onViewRequest, onAccept, onReject }: any) => {
  const [showAll, setShowAll] = useState(false);
  const schools = Array(20).fill({
    name: 'Rwanda coding academy',
    email: 'rca@ac.rw',
    phone: '079888888',
    location: 'Kigali Rwanda',
    paymentStatus: 'Paid',
    logo: '',
  });
  const visibleSchools = showAll ? schools : schools.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Schools Request ({schools.length})</h2>
        <button onClick={() => setShowAll(v => !v)} className="bg-[#1A75FF] text-white px-4 py-2 rounded font-medium shadow hover:bg-blue-700 transition-colors">
          {showAll ? 'Show less' : 'Load more'}
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search School"
            className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A75FF] focus:border-transparent"
          />
          <svg
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A75FF] focus:border-transparent font-inter text-gray-700">
          <option value="">Select an option</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4 font-medium">School Names</th>
              <th className="text-left py-4 px-4 font-medium">Email</th>
              <th className="text-left py-4 px-4 font-medium">Phone Number</th>
              <th className="text-left py-4 px-4 font-medium">Location</th>
              <th className="text-left py-4 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleSchools.map((school, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-4">{school.name}</td>
                <td className="py-4 px-4">{school.email}</td>
                <td className="py-4 px-4">{school.phone}</td>
                <td className="py-4 px-4">{school.location}</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button className="px-4 py-1 bg-[#1A75FF] text-white rounded hover:bg-blue-600" onClick={() => onViewRequest(school)}>View</button>
                    <button className="px-4 py-1 bg-[#00BA34] text-white rounded hover:bg-green-600" onClick={() => onAccept(school)}>Accept</button>
                    <button className="px-4 py-1 bg-[#F04438] text-white rounded hover:bg-red-600" onClick={() => onReject(school)}>Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Active Schools Table Component
const ActiveSchoolsTable = ({ onViewInfo, onRemove }: any) => {
  const [showAll, setShowAll] = useState(false);
  const schools = Array(20).fill({
    name: 'Rwanda coding academy',
    email: 'rca@ac.rw',
    phone: '079888888',
    location: 'Kigali Rwanda',
    paymentStatus: 'Paid',
    systemStatus: 'Active',
    logo: '',
  });
  const visibleSchools = showAll ? schools : schools.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Active Schools</h2>
        <button onClick={() => setShowAll(v => !v)} className="bg-[#1A75FF] text-white px-4 py-2 rounded font-medium shadow hover:bg-blue-700 transition-colors">
          {showAll ? 'Show less' : 'Load more'}
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search School"
            className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A75FF] focus:border-transparent"
          />
          <svg
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A75FF] focus:border-transparent font-inter text-gray-700">
          <option value="">Select an option</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4 font-medium">School Names</th>
              <th className="text-left py-4 px-4 font-medium">Email</th>
              <th className="text-left py-4 px-4 font-medium">Phone Number</th>
              <th className="text-left py-4 px-4 font-medium">Location</th>
              <th className="text-left py-4 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleSchools.map((school, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-4">{school.name}</td>
                <td className="py-4 px-4">{school.email}</td>
                <td className="py-4 px-4">{school.phone}</td>
                <td className="py-4 px-4">{school.location}</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button className="px-4 py-1 bg-[#1A75FF] text-white rounded hover:bg-blue-600" onClick={() => onViewInfo(school)}>View</button>
                    <button className="px-4 py-1 bg-[#F04438] text-white rounded hover:bg-red-600" onClick={() => onRemove(school)}>Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Registered Schools Table Component
const RegisteredSchoolsTable = () => {
  const schools = Array(5).fill({
    name: 'Rwanda coding academy',
    email: 'rca@ac.rw',
    subscription: '850000',
    joiningDate: '10/5/2025',
    status: 'Paid',
    systemStatus: 'Active'
  });

  return (
    <div className="bg-white rounded-lg shadow-sm mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Registered Schools</h2>
        <button className="bg-[#1A75FF] text-white px-4 py-2 rounded font-medium shadow hover:bg-blue-700 transition-colors">Load more</button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search School"
            className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A75FF] focus:border-transparent"
          />
          <svg
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <div className="flex space-x-4">
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A75FF] focus:border-transparent font-inter text-gray-700">
            <option value="">Select an option</option>
          </select>
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A75FF] focus:border-transparent font-inter text-gray-700">
            <option value="">Select an option</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4 font-medium">School Names</th>
              <th className="text-left py-4 px-4 font-medium">Email</th>
              <th className="text-left py-4 px-4 font-medium">Subscription amount</th>
              <th className="text-left py-4 px-4 font-medium">Joining Date</th>
              <th className="text-left py-4 px-4 font-medium">Status</th>
              <th className="text-left py-4 px-4 font-medium">System status</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-4">{school.name}</td>
                <td className="py-4 px-4">{school.email}</td>
                <td className="py-4 px-4">{school.subscription}</td>
                <td className="py-4 px-4">{school.joiningDate}</td>
                <td className="py-4 px-4">
                  <span className="text-[#1A75FF]">{school.status}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-[#00BA34]">{school.systemStatus}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function SchoolsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'request' | 'info'>("request");
  const [selectedSchool, setSelectedSchool] = useState<any>(null);

  // Handlers for modal actions
  const handleViewRequest = (school: any) => {
    setModalMode("request");
    setSelectedSchool(school);
    setModalOpen(true);
  };
  const handleViewInfo = (school: any) => {
    setModalMode("info");
    setSelectedSchool(school);
    setModalOpen(true);
  };
  const handleAccept = (school: any) => {
    // TODO: Implement accept logic (API call, etc.)
    setModalOpen(false);
  };
  const handleReject = (school: any) => {
    // TODO: Implement reject logic (API call, etc.)
    setModalOpen(false);
  };
  const handleRemove = (school: any) => {
    // TODO: Implement remove logic (API call, etc.)
    setModalOpen(false);
  };

  return (
    <div className="font-inter">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard value="100" label="Total Schools" color="text-blue-600" />
        <StatsCard value="80" label="Active Schools" color="text-green-600" />
        <StatsCard value="20" label="Pending Requests" color="text-orange-600" />
      </div>

      <RegistrationTrendChart />
      <SchoolRequestTable
        onViewRequest={handleViewRequest}
        onAccept={handleAccept}
        onReject={handleReject}
      />
      <ActiveSchoolsTable
        onViewInfo={handleViewInfo}
        onRemove={handleRemove}
      />
      <RegisteredSchoolsTable />
      <SchoolModal
        isOpen={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        initialData={selectedSchool}
        onAccept={handleAccept}
        onReject={handleReject}
        onRemove={handleRemove}
      />
    </div>
  );
} 