import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import { Search, ChevronDown } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from "recharts";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statsData = [
  { title: "Total Payroll", value: "1000000", currency: "Rwf", color: "text-blue-600" },
  { title: "Paid This Month", value: "1000000", currency: "Rwf", color: "text-green-600" },
  { title: "Pending Payments", value: "1000000", currency: "Rwf", color: "text-orange-600" },
  { title: "Total Staff", value: "10", currency: "", color: "text-gray-900" },
];

const chartData = [
  { month: 'Jan', amount: 150000 },
  { month: 'Feb', amount: 150000 },
  { month: 'Mar', amount: 150000 },
  { month: 'Apr', amount: 150000 },
  { month: 'May', amount: 150000 },
  { month: 'Jun', amount: 150000 },
  { month: 'July', amount: 150000 },
  { month: 'Aug', amount: 150000 },
  { month: 'Sept', amount: 150000 },
  { month: 'Oct', amount: 150000 },
  { month: 'Nov', amount: 150000 },
  { month: 'Dec', amount: 150000 },
];

const staff = [
  { name: "John Smith", department: "Teacher", amount: "900000", date: "10/5/2025", status: "Paid" },
  { name: "Sarah Johnson", department: "Administrator", amount: "1000000", date: "10/5/2025", status: "Pending" },
  { name: "Michael Brown", department: "Teacher", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Emily Davis", department: "Nurse", amount: "750000", date: "10/5/2025", status: "Paid" },
  { name: "Robert Wilson", department: "Security", amount: "600000", date: "10/5/2025", status: "Pending" },
  { name: "Lisa Anderson", department: "Teacher", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "David Taylor", department: "IT Staff", amount: "950000", date: "10/5/2025", status: "Paid" },
  { name: "Jennifer Martin", department: "Librarian", amount: "700000", date: "10/5/2025", status: "Paid" },
  { name: "James Wilson", department: "Discipline staff", amount: "650000", date: "10/5/2025", status: "Paid" },
  { name: "Maria Garcia", department: "Cook", amount: "550000", date: "10/5/2025", status: "Paid" },
  { name: "William Lee", department: "Teacher", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Emma Thompson", department: "Counselor", amount: "800000", date: "10/5/2025", status: "Pending" },
  { name: "Daniel Kim", department: "Physical Education", amount: "750000", date: "10/5/2025", status: "Paid" },
  { name: "Sophie Chen", department: "Language Teacher", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Omar Hassan", department: "Science Teacher", amount: "900000", date: "10/5/2025", status: "Paid" }
];

const departments = [
  { value: "all", label: "All Departments" },
  { value: "science", label: "Science" },
  { value: "mathematics", label: "Mathematics" },
  { value: "languages", label: "Languages" },
  { value: "arts", label: "Arts" },
  { value: "sports", label: "Sports" }
];

const payrollStatuses = [
  { value: "all", label: "All Status" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" }
];

const paymentModes = [
  { value: "bank", label: "Bank payments" },
  { value: "cash", label: "Cash" },
  { value: "mobile", label: "Mobile Money" }
];

const positions = [
  "Teacher",
  "Administrator",
  "Nurse",
  "Security",
  "IT Staff",
  "Librarian",
  "Discipline staff",
  "Cook",
  "Counselor",
  "Physical Education",
  "Language Teacher",
  "Science Teacher"
];

const statuses = [
  "Paid",
  "Pending",
  "Failed"
];

export const StaffPayroll = () => {
  const ITEMS_PER_PAGE = 10;
  const {
    currentPage,
    totalPages,
    visiblePages,
    goToPage,
    nextPage,
    previousPage,
    paginatedData
  } = usePagination({
    totalItems: staff.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const currentStaff = paginatedData(staff);

  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddPayroll, setShowAddPayroll] = useState(false);

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString()} Rwf`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setShowAddPayroll(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value} {stat.currency && <span className="text-sm">{stat.currency}</span>}
                  </div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white border-0 shadow-sm mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Payroll Trend Overview</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  barCategoryGap="20%"
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                    formatter={(value: number) => [formatCurrency(value)]}
                    labelStyle={{ color: '#374151', fontWeight: 600 }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#2563eb" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm mt-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Staff Payroll</h3>
                <p className="text-sm text-gray-600">Total amount : 1000000 Rwf</p>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Export Report
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setShowAddPayroll(true)}
                >
                  Add new Payroll
                </Button>
                <Button variant="outline" className="border-blue-600 text-blue-600">
                  Generate payroll
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search staff" 
                  className="pl-10 w-64"
                />
              </div>
              <div className="flex space-x-2">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {payrollStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Staff Name</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Department</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStaff.map((member, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-4 text-sm text-gray-900">{member.name}</td>
                      <td className="py-4 text-sm text-gray-600">{member.department}</td>
                      <td className="py-4 text-sm text-gray-900 font-medium">{member.amount}</td>
                      <td className="py-4 text-sm text-gray-600">{member.date}</td>
                      <td className="py-4">
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {member.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-600">Bank Account</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={previousPage}
                      className="cursor-pointer"
                      aria-disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  
                  {visiblePages.map((pageNum, idx) => (
                    <PaginationItem key={idx}>
                      {pageNum === -1 ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => goToPage(pageNum)}
                          isActive={pageNum === currentPage}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={nextPage}
                      className="cursor-pointer"
                      aria-disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        {showAddPayroll && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowAddPayroll(false)} />
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Card className="max-w-2xl w-full mx-auto bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Add New Payroll</h2>
                    <Button 
                      variant="ghost" 
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowAddPayroll(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Staff Name
                        </label>
                        <Input 
                          placeholder="Enter staff name"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Position
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map((position) => (
                              <SelectItem key={position} value={position.toLowerCase()}>
                                {position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Salary Amount
                        </label>
                        <Input 
                          type="number"
                          placeholder="Enter amount"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Status
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status.toLowerCase()}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Details
                      </label>
                      <textarea 
                        className="w-full min-h-[100px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter payment details or notes"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="border-blue-600 text-blue-600"
                        onClick={() => setShowAddPayroll(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
