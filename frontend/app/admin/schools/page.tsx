"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { apiFetch } from '@/lib/api';
import SchoolModal from "@/components/portal/modals/school-modal";

interface School {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  status: string;
  isActive: boolean;
  createdAt: string;
}

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
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSchoolRequests();
    // Set up auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchSchoolRequests, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchSchoolRequests = async () => {
    try {
      const data = await apiFetch('/schools/requests');
      setSchools(Array.isArray(data) ? data : []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch school requests:', error);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (school: School) => {
    try {
      setSuccessMessage(null);
      setErrorMessage(null);
      
      const response = await apiFetch(`/schools/${school.id}/accept`, { method: 'POST' });
      
      // Show success message with school code
      setSuccessMessage(response.message || `School "${school.name}" approved successfully!`);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
      
      await fetchSchoolRequests(); // Refresh the list immediately
      onAccept(school);
    } catch (error: any) {
      console.error('Failed to accept school request:', error);
      setErrorMessage(error.message || 'Failed to accept school request');
      setTimeout(() => setErrorMessage(null), 10000);
    }
  };

  const handleReject = async (school: School) => {
    try {
      setSuccessMessage(null);
      setErrorMessage(null);
      
      const response = await apiFetch(`/schools/${school.id}/reject`, { method: 'POST' });
      
      // Show success message
      setSuccessMessage(response.message || `School "${school.name}" rejected successfully.`);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
      
      await fetchSchoolRequests(); // Refresh the list immediately
      onReject(school);
    } catch (error: any) {
      console.error('Failed to reject school request:', error);
      setErrorMessage(error.message || 'Failed to reject school request');
      setTimeout(() => setErrorMessage(null), 10000);
    }
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleSchools = showAll ? filteredSchools : filteredSchools.slice(0, 5);

  if (loading) {
    return <div className="bg-white rounded-lg shadow-sm mt-8 p-6">Loading school requests...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Schools Request ({schools.length})</h2>
        <div className="flex space-x-2">
          <button 
            onClick={fetchSchoolRequests}
            className="bg-gray-500 text-white px-4 py-2 rounded font-medium shadow hover:bg-gray-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button onClick={() => setShowAll(v => !v)} className="bg-[#1A75FF] text-white px-4 py-2 rounded font-medium shadow hover:bg-blue-700 transition-colors">
            {showAll ? 'Show less' : 'Load more'}
          </button>
        </div>
      </div>
      {lastUpdated && (
        <div className="mb-4 text-sm text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg relative">
          <div className="flex items-start justify-between">
            <div className="flex">
              <span className="text-lg mr-2">✅</span>
              <div>
                <strong>Success!</strong>
                <div className="mt-1">{successMessage}</div>
                {successMessage.includes('School code:') && (
                  <div className="mt-3 p-2 bg-white border border-green-300 rounded">
                    <div className="text-sm font-medium text-green-800 mb-1">
                      Give this code to the headmaster:
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-lg font-bold text-green-900">
                        {successMessage.match(/School code: (\w+)/)?.[1]}
                      </span>
                      <button
                        onClick={() => {
                          const code = successMessage.match(/School code: (\w+)/)?.[1];
                          if (code) navigator.clipboard.writeText(code);
                        }}
                        className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded hover:bg-green-300"
                      >
                        Copy Code
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-green-600 hover:text-green-800 ml-4"
              title="Close"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          ❌ {errorMessage}
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search School"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
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
            {visibleSchools.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  {schools.length === 0 ? 'No school requests found' : 'No schools match your search'}
                </td>
              </tr>
            ) : (
              visibleSchools.map((school) => (
                <tr key={school.id} className="border-b">
                  <td className="py-4 px-4">{school.name}</td>
                  <td className="py-4 px-4">{school.email}</td>
                  <td className="py-4 px-4">{school.phoneNumber || 'N/A'}</td>
                  <td className="py-4 px-4">{`${school.city || ''} ${school.country || ''}`.trim() || school.address}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="px-4 py-1 bg-[#1A75FF] text-white rounded hover:bg-blue-600" onClick={() => onViewRequest(school)}>View</button>
                      <button className="px-4 py-1 bg-[#00BA34] text-white rounded hover:bg-green-600" onClick={() => handleAccept(school)}>Accept</button>
                      <button className="px-4 py-1 bg-[#F04438] text-white rounded hover:bg-red-600" onClick={() => handleReject(school)}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Active Schools Table Component
const ActiveSchoolsTable = ({ onViewInfo, onRemove, refreshTrigger }: any) => {
  const [showAll, setShowAll] = useState(false);
  const [activeSchools, setActiveSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchActiveSchools();
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchActiveSchools, 30000);
    return () => clearInterval(interval);
  }, []);

  // Refresh when trigger changes (when school is approved)
  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchActiveSchools();
    }
  }, [refreshTrigger]);

  const fetchActiveSchools = async () => {
    try {
      const data = await apiFetch('/schools');
      setActiveSchools(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch active schools:', error);
      setActiveSchools([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchools = activeSchools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleSchools = showAll ? filteredSchools : filteredSchools.slice(0, 5);

  if (loading) {
    return <div className="bg-white rounded-lg shadow-sm mt-8 p-6">Loading active schools...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Active Schools ({activeSchools.length})</h2>
        <div className="flex space-x-2">
          <button 
            onClick={fetchActiveSchools}
            className="bg-gray-500 text-white px-4 py-2 rounded font-medium shadow hover:bg-gray-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button onClick={() => setShowAll(v => !v)} className="bg-[#1A75FF] text-white px-4 py-2 rounded font-medium shadow hover:bg-blue-700 transition-colors">
            {showAll ? 'Show less' : 'Load more'}
          </button>
        </div>
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
            {visibleSchools.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  {activeSchools.length === 0 ? 'No active schools found' : 'No schools match your search'}
                </td>
              </tr>
            ) : (
              visibleSchools.map((school) => (
                <tr key={school.id} className="border-b">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="font-medium">{school.name}</span>
                      <div className="ml-2 flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-mono">
                          {school.code}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(school.code);
                            // You could add a toast notification here
                          }}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded hover:bg-blue-200"
                          title="Copy school code"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{school.email}</td>
                  <td className="py-4 px-4">{school.phoneNumber || 'N/A'}</td>
                  <td className="py-4 px-4">{`${school.city || ''} ${school.country || ''}`.trim() || school.address}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="px-4 py-1 bg-[#1A75FF] text-white rounded hover:bg-blue-600" onClick={() => onViewInfo(school)}>View</button>
                      <button className="px-4 py-1 bg-[#F04438] text-white rounded hover:bg-red-600" onClick={() => onRemove(school)}>Deactivate</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
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
  const [stats, setStats] = useState({
    totalSchools: 0,
    activeSchools: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [allSchools, requests] = await Promise.all([
        apiFetch('/schools'),
        apiFetch('/schools/requests'),
      ]);

      setStats({
        totalSchools: Array.isArray(allSchools) ? allSchools.length : 0,
        activeSchools: Array.isArray(allSchools) ? allSchools.filter(s => s.isActive).length : 0,
        pendingRequests: Array.isArray(requests) ? requests.length : 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

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
    fetchStats(); // Refresh stats immediately
    setRefreshTrigger(prev => prev + 1); // Trigger active schools refresh
    setModalOpen(false);
  };
  const handleReject = (school: any) => {
    fetchStats(); // Refresh stats immediately
    setModalOpen(false);
  };
  const handleRemove = (school: any) => {
    fetchStats(); // Refresh stats
    setModalOpen(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="font-inter">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard value={stats.totalSchools.toString()} label="Total Schools" color="text-blue-600" />
        <StatsCard value={stats.activeSchools.toString()} label="Active Schools" color="text-green-600" />
        <StatsCard value={stats.pendingRequests.toString()} label="Pending Requests" color="text-orange-600" />
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
        refreshTrigger={refreshTrigger}
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