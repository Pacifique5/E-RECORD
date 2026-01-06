'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const StatCard = ({ title, value, icon, trend }: { title: string; value: string; icon: string; trend?: string }) => (
  <div className="bg-white p-6 rounded-lg">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-normal text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl font-semibold text-[#1A75FF]">{value}</h3>
        {trend && (
          <div className="mt-2">
            <span className="text-green-500 text-sm flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {trend}
            </span>
          </div>
        )}
      </div>
      <div className={`p-2 rounded-lg ${
        icon === 'school' ? 'bg-blue-50' : 
        icon === 'users' ? 'bg-orange-50' : 
        'bg-green-50'
      }`}>
        {icon === 'school' ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21H21M6 18V10M10 18V10M14 18V10M18 18V10M20 7L12.424 2.265C12.2702 2.16886 12.0922 2.11914 11.911 2.11914C11.7298 2.11914 11.5518 2.16886 11.398 2.265L4 7M2 8H22" stroke="#1A75FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : icon === 'users' ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#FF9533" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#FF9533" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.25 18.75C2.25 16.75 6 16.75 8 14.75C9 13.75 6 13.75 6 9.75C6 7.25 7.25 5.75 9.75 5.75C12.25 5.75 13.5 7.25 13.5 9.75C13.5 13.75 10.5 13.75 11.5 14.75C13.5 16.75 17.25 16.75 17.25 18.75M12.75 14C13.75 13 17.25 13 17.25 9C17.25 6.5 16 5 13.5 5M21.75 18.75C21.75 16.75 18 16.75 16 14.75" stroke="#00BA34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  </div>
);

const SchoolRequestTable = () => (
  <div className="bg-white rounded-lg p-6 mt-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold">Schools Request</h2>
      <button className="bg-[#1A75FF] text-white px-4 py-2 rounded font-medium shadow hover:bg-blue-700 transition-colors">View All</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="pb-3 text-sm font-medium text-gray-600">School Names</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Email</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Phone Number</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Location</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-4 text-sm">Rwanda coding academy</td>
              <td className="py-4 text-sm">rca@ac.rw</td>
              <td className="py-4 text-sm">0798888888</td>
              <td className="py-4 text-sm">Kigali Rwanda</td>
              <td className="py-4">
                <div className="flex gap-2">
                  <button className="px-4 py-1 bg-[#1A75FF] text-white text-sm rounded-md hover:bg-blue-700">View</button>
                  <button className="px-4 py-1 bg-[#00BA34] text-white text-sm rounded-md hover:bg-green-700">Accept</button>
                  <button className="px-4 py-1 bg-[#F04438] text-white text-sm rounded-md hover:bg-red-700">Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const RegisteredSchoolsTable = () => (
  <div className="bg-white rounded-lg p-6 mt-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold">Registered Schools</h2>
      <button className="bg-[#1A75FF] text-white px-4 py-2 rounded font-medium shadow hover:bg-blue-700 transition-colors">View All</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="pb-3 text-sm font-medium text-gray-600">School Names</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Email</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Subscription amount</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Joining Date</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-4 text-sm">Rwanda coding academy</td>
              <td className="py-4 text-sm">rca@ac.rw</td>
              <td className="py-4 text-sm">850000</td>
              <td className="py-4 text-sm">10/5/2025</td>
              <td className="py-4">
                <span className="text-[#1A75FF] text-sm">Paid</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ActiveUsersTable = () => (
  <div className="bg-white rounded-lg p-6 mt-8">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-lg font-semibold">Active Users</h2>
        <p className="text-sm text-gray-600">Total users: 1000000</p>
      </div>
      <button className="bg-[#1A75FF] text-white px-4 py-2 rounded font-medium shadow hover:bg-blue-700 transition-colors">View All</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="pb-3 text-sm font-medium text-gray-600">User Name</th>
            <th className="pb-3 text-sm font-medium text-gray-600">School</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Role</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Joining Date</th>
            <th className="pb-3 text-sm font-medium text-gray-600">Email</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-4 text-sm">Dushimire Aine</td>
              <td className="py-4 text-sm">Rwanda coding academy</td>
              <td className="py-4 text-sm">Accountant</td>
              <td className="py-4 text-sm">10/5/2025</td>
              <td className="py-4 text-sm">ainedushimire@ac.rw</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const UserGrowthChart = ({ data }: { data: any[] }) => (
  <div className="bg-white rounded-lg p-6 mt-8">
    <h2 className="text-lg font-semibold mb-4">User Growth</h2>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#1A75FF" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const SchoolRegistrationChart = ({ data }: { data: any[] }) => (
  <div className="bg-white rounded-lg p-6 mt-8">
    <h2 className="text-lg font-semibold mb-4">School Registrations</h2>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="schools" fill="#FF9533" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const PaymentDistributionChart = ({ data }: { data: any[] }) => {
  const COLORS = ['#1A75FF', '#FF9533', '#00BA34'];

  return (
    <div className="bg-white rounded-lg p-6 mt-8">
      <h2 className="text-lg font-semibold mb-4">Payment Distribution</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const UserActivityChart = ({ data }: { data: any[] }) => (
  <div className="bg-white rounded-lg p-6 mt-8">
    <h2 className="text-lg font-semibold mb-4">User Activity by Role</h2>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="students" stackId="1" stroke="#1A75FF" fill="#1A75FF" />
          <Area type="monotone" dataKey="teachers" stackId="1" stroke="#FF9533" fill="#FF9533" />
          <Area type="monotone" dataKey="admins" stackId="1" stroke="#00BA34" fill="#00BA34" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    userGrowth: [],
    schoolRegistrations: [],
    paymentDistribution: [],
    userActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1A75FF]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="font-inter">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total School" value="100" icon="school" trend="15%" />
        <StatCard title="Total Users" value="1000000" icon="users" trend="15%" />
        <StatCard title="Total Payments" value="1000000 Rwf" icon="payments" trend="15%" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <UserGrowthChart data={dashboardData.userGrowth} />
        <SchoolRegistrationChart data={dashboardData.schoolRegistrations} />
        <PaymentDistributionChart data={dashboardData.paymentDistribution} />
        <UserActivityChart data={dashboardData.userActivity} />
      </div>

      <SchoolRequestTable />
      <RegisteredSchoolsTable />
      <ActiveUsersTable />
    </div>
  );
} 