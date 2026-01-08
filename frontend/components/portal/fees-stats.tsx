"use client"

import { useEffect, useState } from 'react';
import { feesApi, FeeStats } from '@/lib/fees-api';

export default function FeesStats() {
  const [stats, setStats] = useState<FeeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await feesApi.getFeeStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load fee statistics');
        console.error('Error fetching fee stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-6 animate-pulse">
            <div className="text-center">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const statsData = [
    { 
      title: "Total School Fees Paid", 
      value: formatCurrency(stats.totalPaid), 
      color: "text-green-600" 
    },
    { 
      title: "Total School UnPaid Fees", 
      value: formatCurrency(stats.totalUnpaid), 
      color: "text-red-600" 
    },
    { 
      title: "Total Students Paid", 
      value: stats.totalStudentsPaid.toString(), 
      color: "text-blue-600" 
    },
    { 
      title: "Total Students UnPaid", 
      value: stats.totalStudentsUnpaid.toString(), 
      color: "text-orange-600" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="text-center">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
