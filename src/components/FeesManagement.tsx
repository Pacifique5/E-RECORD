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
  CartesianGrid,
  Legend
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
  { title: "Total School Fees Paid", value: "1000000", currency: "Rwf", color: "text-blue-600" },
  { title: "Total School UnPaid Fees", value: "1000000", currency: "Rwf", color: "text-red-600" },
  { title: "Total Student Paid", value: "1000000", currency: "", color: "text-blue-600" },
  { title: "Total Student UnPaid", value: "1000000", currency: "", color: "text-red-600" },
];

const chartData = [
  { name: 'Senior One', paid: 150000, unpaid: 100000 },
  { name: 'Senior Two', paid: 150000, unpaid: 95000 },
  { name: 'Senior Three', paid: 150000, unpaid: 100000 },
  { name: 'Senior Four', paid: 150000, unpaid: 95000 },
  { name: 'Senior Five', paid: 150000, unpaid: 85000 },
  { name: 'Senior Six', paid: 150000, unpaid: 90000 },
];

const students = [
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Dushimire Aine", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "John Doe", class: "Senior 2 A", amount: "850000", date: "10/5/2025", status: "Unpaid" },
  { name: "Jane Smith", class: "Senior 1 A", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Robert Johnson", class: "Senior 3 B", amount: "850000", date: "10/5/2025", status: "Paid" },
  { name: "Emily Brown", class: "Senior 2 C", amount: "850000", date: "10/5/2025", status: "Unpaid" },
  { name: "Michael Wilson", class: "Senior 1 B", amount: "850000", date: "10/5/2025", status: "Paid" },
];

const classes = [
  "Senior One",
  "Senior Two",
  "Senior Three",
  "Senior Four",
  "Senior Five",
  "Senior Six"
];

const paymentStatuses = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Unpaid" },
  { value: "partial", label: "Partial" }
];

export const FeesManagement = () => {
  const [visibleBars, setVisibleBars] = useState({
    paid: true,
    unpaid: true
  });

  const [showAddFees, setShowAddFees] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Senior One");
  const [selectedStatus, setSelectedStatus] = useState("all");

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
    totalItems: students.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const currentStudents = paginatedData(students);

  const toggleBar = (dataKey: keyof typeof visibleBars) => {
    setVisibleBars(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString()} Rwf`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setShowAddFees(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-8 space-y-8">
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

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Promotions Payment Statistics</h3>
              <div className="flex items-center space-x-4 text-sm">
                <button
                  onClick={() => toggleBar('paid')}
                  className={`flex items-center space-x-2 ${visibleBars.paid ? 'opacity-100' : 'opacity-50'}`}
                >
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-600">Paid Students</span>
                </button>
                <button
                  onClick={() => toggleBar('unpaid')}
                  className={`flex items-center space-x-2 ${visibleBars.unpaid ? 'opacity-100' : 'opacity-50'}`}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">UnPaid Students</span>
                </button>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  barGap={0}
                  barCategoryGap="20%"
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
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
                  {visibleBars.paid && (
                    <Bar 
                      dataKey="paid" 
                      fill="#2563eb" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  )}
                  {visibleBars.unpaid && (
                    <Bar 
                      dataKey="unpaid" 
                      fill="#ef4444" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">School Fees Management</h3>
              <div className="flex space-x-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Export Report
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600"
                  onClick={() => setShowAddFees(true)}
                >
                  Add new Fees
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search student" 
                  className="pl-10 w-64"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((className) => (
                      <SelectItem key={className} value={className}>
                        {className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                  {currentStudents.map((student, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-4 text-sm text-gray-900">{student.name}</td>
                      <td className="py-4 text-sm text-gray-600">{student.class}</td>
                      <td className="py-4 text-sm text-gray-900 font-medium">{student.amount}</td>
                      <td className="py-4 text-sm text-gray-600">{student.date}</td>
                      <td className="py-4">
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-600">Bank Account</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
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

        {showAddFees && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowAddFees(false)} />
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Card className="max-w-2xl w-full mx-auto bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Add New Fees</h2>
                    <Button 
                      variant="ghost" 
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowAddFees(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Student Name
                        </label>
                        <Input 
                          placeholder="Enter student name"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Student Promotion
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select promotion" />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.map((className) => (
                              <SelectItem key={className} value={className}>
                                {className}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Student Class
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a">A</SelectItem>
                            <SelectItem value="b">B</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fees Amount Paid
                        </label>
                        <Input 
                          type="number"
                          placeholder="Enter amount"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmation Document
                      </label>
                      <Input 
                        type="file"
                        className="w-full"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <p className="text-xs text-gray-500 mt-1">Upload a supporting document</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="border-blue-600 text-blue-600"
                        onClick={() => setShowAddFees(false)}
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
