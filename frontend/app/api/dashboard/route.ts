import { NextResponse } from 'next/server';

// Mock data - Replace with actual database queries
const getUserGrowthData = () => {
  return [
    { month: 'Jan', users: 4000 },
    { month: 'Feb', users: 5000 },
    { month: 'Mar', users: 6000 },
    { month: 'Apr', users: 8000 },
    { month: 'May', users: 10000 },
    { month: 'Jun', users: 12000 },
  ];
};

const getSchoolRegistrationData = () => {
  return [
    { month: 'Jan', schools: 5 },
    { month: 'Feb', schools: 8 },
    { month: 'Mar', schools: 12 },
    { month: 'Apr', schools: 15 },
    { month: 'May', schools: 20 },
    { month: 'Jun', schools: 25 },
  ];
};

const getPaymentDistributionData = () => {
  return [
    { name: 'Monthly', value: 400 },
    { name: 'Quarterly', value: 300 },
    { name: 'Annual', value: 300 },
  ];
};

const getUserActivityData = () => {
  return [
    { month: 'Jan', students: 4000, teachers: 2400, admins: 2400 },
    { month: 'Feb', students: 5000, teachers: 3000, admins: 2800 },
    { month: 'Mar', students: 6000, teachers: 3600, admins: 3200 },
    { month: 'Apr', students: 8000, teachers: 4200, admins: 3600 },
    { month: 'May', students: 10000, teachers: 4800, admins: 4000 },
    { month: 'Jun', students: 12000, teachers: 5400, admins: 4400 },
  ];
};

export async function GET() {
  try {
    const data = {
      userGrowth: getUserGrowthData(),
      schoolRegistrations: getSchoolRegistrationData(),
      paymentDistribution: getPaymentDistributionData(),
      userActivity: getUserActivityData(),
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 