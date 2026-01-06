import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Stats data at the top
const statsCards = [
  {
    value: "1000000",
    suffix: "Rwf",
    label: "Total School Expenses",
    color: "text-blue-600"
  },
  {
    value: "1000000",
    suffix: "Rwf",
    label: "Pending approval",
    color: "text-orange-600"
  },
  {
    value: "85",
    suffix: "%",
    label: "Budget Used",
    color: "text-blue-600"
  },
  {
    value: "10",
    label: "Total transactions",
    color: "text-green-600"
  }
];

// Sample expense data
const expenseData = Array(12).fill({
  date: "10/5/2025",
  vendor: "Tyaza Ubwenge",
  purpose: "Buying teacher materials",
  amount: "850000",
  status: "Paid",
});

const categories = [
  "Electronics",
  "Stationery",
  "Maintenance",
  "Utilities",
  "Transportation",
  "Others"
];

const statuses = [
  "Paid",
  "Pending",
  "Cancelled"
];

export const ExpenseManagement = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showEditExpense, setShowEditExpense] = useState(false);
  const [showViewExpense, setShowViewExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [viewingExpense, setViewingExpense] = useState(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setShowAddExpense(false);
    setShowEditExpense(false);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowEditExpense(true);
  };

  const handleView = (expense) => {
    setViewingExpense(expense);
    setShowViewExpense(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6">
              <div className="text-center">
                <div className={`text-xl font-semibold ${stat.color} mb-1`}>
                  {stat.value}{stat.suffix && <span className="text-sm ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Expense Management Section */}
        <div className="bg-white rounded-lg">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold">Expenses Management</h2>
              <div className="flex gap-3">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Export Report
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600"
                  onClick={() => setShowAddExpense(true)}
                >
                  Add new Expense
                </Button>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expense" 
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-[280px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-[160px] bg-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px] bg-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Vendor</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Purpose</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseData.map((expense, index) => (
                    <tr key={index} className="border-b border-gray-50 last:border-0">
                      <td className="py-4 text-sm">{expense.date}</td>
                      <td className="py-4 text-sm">{expense.vendor}</td>
                      <td className="py-4 text-sm">{expense.purpose}</td>
                      <td className="py-4 text-sm">{expense.amount}</td>
                      <td className="py-4 text-sm">
                        <span className="text-blue-600">{expense.status}</span>
                      </td>
                      <td className="py-4 text-sm">
                        <div className="flex gap-2">
                          <Button 
                            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-1 h-8 text-sm"
                            onClick={() => handleView(expense)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-blue-600 text-blue-600 px-4 py-1 h-8 text-sm"
                            onClick={() => handleEdit(expense)}
                          >
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-4 pt-4">
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-600 flex items-center">
                  ← Previous
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-white bg-blue-600 rounded">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded">
                  3
                </button>
                <span className="text-gray-600 px-1">...</span>
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded">
                  67
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded">
                  68
                </button>
                <button className="px-2 py-1 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showAddExpense && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowAddExpense(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Card className="max-w-2xl w-full mx-auto bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Add New Expenses</h2>
                  <Button 
                    variant="ghost" 
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowAddExpense(false)}
                  >
                    ✕
                  </Button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vendor
                      </label>
                      <Input 
                        placeholder="Enter vendor name"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <Input 
                        type="number"
                        placeholder="Enter amount"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
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
                      Description
                    </label>
                    <textarea 
                      className="w-full min-h-[100px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter expense description"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-blue-600 text-blue-600"
                      onClick={() => setShowAddExpense(false)}
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

      {/* Edit Expense Modal */}
      {showEditExpense && editingExpense && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowEditExpense(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Card className="max-w-2xl w-full mx-auto bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Edit Expenses</h2>
                  <Button 
                    variant="ghost" 
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowEditExpense(false)}
                  >
                    ✕
                  </Button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vendor
                      </label>
                      <Input 
                        placeholder="Enter vendor name"
                        className="w-full"
                        defaultValue={editingExpense.vendor}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <Input 
                        type="number"
                        placeholder="Enter amount"
                        className="w-full"
                        defaultValue={editingExpense.amount}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <Select defaultValue={editingExpense.status.toLowerCase()}>
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
                      Description
                    </label>
                    <textarea 
                      className="w-full min-h-[100px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter expense description"
                      defaultValue={editingExpense.purpose}
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-blue-600 text-blue-600"
                      onClick={() => setShowEditExpense(false)}
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

      {/* View Expense Modal */}
      {showViewExpense && viewingExpense && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowViewExpense(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Card className="max-w-2xl w-full mx-auto bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">View Expenses</h2>
                  <Button 
                    variant="ghost" 
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowViewExpense(false)}
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vendor
                      </label>
                      <Input 
                        value={viewingExpense.vendor}
                        className="w-full bg-gray-50"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <Input 
                        type="text"
                        value={viewingExpense.amount}
                        className="w-full bg-gray-50"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <Input 
                        value="Electronics"
                        className="w-full bg-gray-50"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <Input 
                        value={viewingExpense.status}
                        className="w-full bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea 
                      className="w-full min-h-[100px] px-3 py-2 rounded-md border border-gray-300 bg-gray-50"
                      value={viewingExpense.purpose}
                      readOnly
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-blue-600 text-blue-600"
                      onClick={() => setShowViewExpense(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
