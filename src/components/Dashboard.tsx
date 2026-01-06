import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";
import { DollarSign, CreditCard, TrendingUp, Percent, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  CartesianGrid,
  ReferenceLine,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Label,
  Sector
} from "recharts";
import { useState } from "react";
import { StatsCards } from "./StatsCards";

const monthlyData = [
  { month: 'Jan', income: 150000000, expenses: 180000000 },
  { month: 'Feb', income: 170000000, expenses: 165000000 },
  { month: 'Mar', income: 160000000, expenses: 175000000 },
  { month: 'Apr', income: 180000000, expenses: 190000000 },
  { month: 'May', income: 190000000, expenses: 220000000 },
  { month: 'Jun', income: 200000000, expenses: 210000000 },
  { month: 'Jul', income: 210000000, expenses: 195000000 },
  { month: 'Aug', income: 220000000, expenses: 180000000 },
  { month: 'Sep', income: 240000000, expenses: 170000000 },
  { month: 'Oct', income: 230000000, expenses: 185000000 },
  { month: 'Nov', income: 210000000, expenses: 175000000 },
  { month: 'Dec', income: 220000000, expenses: 165000000 },
];

const budgetCategories = [
  { name: "Technology", value: 55, color: "#3B82F6" },
  { name: "Maintenance", value: 25, color: "#F97316" },
  { name: "Academic", value: 20, color: "#22C55E" }
];

const feesData = [
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid", paymentMethod: "Bank Account" },
  { name: "Sarah Johnson", class: "Senior 2 A", amount: "850000", date: "10/5/2025", status: "Pending", paymentMethod: "Bank Account" },
  { name: "Michael Brown", class: "Senior 3 C", amount: "850000", date: "10/5/2025", status: "Paid", paymentMethod: "Bank Account" },
  { name: "Emily Davis", class: "Senior 1 A", amount: "850000", date: "10/5/2025", status: "Failed", paymentMethod: "Bank Account" },
  { name: "Robert Wilson", class: "Senior 2 B", amount: "850000", date: "10/5/2025", status: "Paid", paymentMethod: "Bank Account" },
];

const staffPayroll = [
  { name: "Dushimire Aine", department: "Science", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", department: "Science", amount: "850000", date: "10/5/2025", status: "Pending" },
  { name: "Dushimire Aine", department: "Science", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", department: "Science", amount: "850000", date: "10/5/2025", status: "Failed" },
  { name: "Dushimire Aine", department: "Science", amount: "850000", date: "10/5/2025", status: "Paid" },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'text-blue-600';
    case 'pending':
      return 'text-orange-500';
    case 'failed':
      return 'text-red-500';
    default:
      return 'text-gray-600';
  }
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 mb-2">{label}</p>
        {payload.map((pld, index) => (
          <p key={index} className="text-sm" style={{ color: pld.color }}>
            {pld.name}: {(pld.value / 1000000).toFixed(1)}M
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central"
      className="text-sm font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString()} Rwf`;
  };

  const formatYAxis = (value: number) => `${(value / 1000000)}M`;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <Header />
      <StatsCards />
      
      {/* School Fees Management Table */}
      <Card className="bg-white border-0 shadow-sm mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">School Fees Management</h3>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Student Names</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Class</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {feesData.map((student, index) => (
                  <tr key={index} className="border-b border-gray-50">
                    <td className="py-3">{student.name}</td>
                    <td className="py-3">{student.class}</td>
                    <td className="py-3">{student.amount}</td>
                    <td className="py-3">{student.date}</td>
                    <td className="py-3">
                      <span className={getStatusColor(student.status)}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3">{student.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Income Expenses Chart */}
      <Card className="bg-white border-0 shadow-sm mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Income Expenses chart</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Expenses</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start mb-6">
            <div className="text-gray-500 text-sm">This Month</div>
            <div>
              {/* <div className="text-2xl font-semibold">220,342,123</div>
              <div className="text-gray-500 text-sm">May</div> */}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={formatYAxis}
                  domain={[140000000, 260000000]}
                />
                <CartesianGrid 
                  vertical={false} 
                  horizontal={true}
                  stroke="#E5E7EB"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  name="Income"
                  stroke="#22C55E" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorIncome)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  name="Expenses"
                  stroke="#EF4444" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorExpenses)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Budget Overview */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Budget Overview</h3>
            <div className="relative h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetCategories}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    onMouseEnter={onPieEnter}
                    activeIndex={activeIndex}
                    activeShape={(props) => {
                      const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, name, value } = props;
                      return (
                        <g>
                          <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="text-sm font-medium">
                            {name}
                          </text>
                          <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={fill} className="text-sm">
                            {value}%
                          </text>
                          <Sector
                            cx={cx}
                            cy={cy}
                            innerRadius={innerRadius}
                            outerRadius={outerRadius + 10}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            fill={fill}
                          />
                        </g>
                      );
                    }}
                  >
                    {budgetCategories.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="transition-all duration-200 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute bottom-0 left-0 w-full">
                <div className="flex items-center justify-center gap-6">
                  {budgetCategories.map((category, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-80"
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(-1)}
                    >
                      <div 
                        className={`w-3 h-3 rounded-full ring-offset-white ${activeIndex === index ? `ring-2 ring-${category.color} ring-offset-2` : ''}`}
                        style={{ backgroundColor: category.color }}
                      />
                      <span className={`text-sm ${activeIndex === index ? 'font-medium' : 'text-gray-600'}`}>
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Money Usage */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Money Usage</h3>
            <div className="space-y-6">
              {budgetCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{category.name}</span>
                    <span className="text-sm font-medium">{category.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${category.value}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Payroll Table */}
      <Card className="bg-white border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Staff Payroll</h3>
            <Button variant="outline" className="text-blue-600">View All</Button>
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Total amount: 1000000 Rwf
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-3 text-sm font-medium text-gray-600">Staff Name</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Department</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Amount</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {staffPayroll.map((staff, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 text-sm">{staff.name}</td>
                    <td className="py-3 text-sm text-gray-600">{staff.department}</td>
                    <td className="py-3 text-sm">{staff.amount} Rwf</td>
                    <td className="py-3 text-sm text-gray-600">{staff.date}</td>
                    <td className="py-3">
                      <span className={`text-sm ${getStatusColor(staff.status)}`}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-600">Bank Account</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
