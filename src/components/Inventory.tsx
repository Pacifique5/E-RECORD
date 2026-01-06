import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const statsData = [
  { title: "Total Items", value: "50", color: "text-blue-600" },
  { title: "In Stock", value: "30", color: "text-green-600" },
  { title: "Low in Stock", value: "14", color: "text-orange-600" },
  { title: "Finished in Stock", value: "10", color: "text-red-600" },
];

const categoryStats = [
  { title: "Technology Items", value: "50", color: "text-blue-600" },
  { title: "Academic Items", value: "30", color: "text-green-600" },
  { title: "Maintenance", value: "14", color: "text-orange-600" },
];

const inventoryItems = [
  { name: "Laptops", category: "Technology", quantity: 20, status: "In Stock", lastUpdated: "10/5/2025" },
  { name: "Projectors", category: "Technology", quantity: 10, status: "Low Stock", lastUpdated: "10/5/2025" },
  { name: "Textbooks", category: "Academic", quantity: 100, status: "In Stock", lastUpdated: "10/5/2025" },
  { name: "Notebooks", category: "Academic", quantity: 5, status: "Low Stock", lastUpdated: "10/5/2025" },
  { name: "Cleaning Supplies", category: "Maintenance", quantity: 0, status: "Out of Stock", lastUpdated: "10/5/2025" },
  { name: "Printers", category: "Technology", quantity: 8, status: "In Stock", lastUpdated: "10/5/2025" },
  { name: "Tablets", category: "Technology", quantity: 15, status: "In Stock", lastUpdated: "10/5/2025" },
  { name: "Whiteboards", category: "Academic", quantity: 12, status: "In Stock", lastUpdated: "10/5/2025" },
  { name: "Markers", category: "Academic", quantity: 3, status: "Low Stock", lastUpdated: "10/5/2025" },
  { name: "Chairs", category: "Maintenance", quantity: 50, status: "In Stock", lastUpdated: "10/5/2025" }
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "technology", label: "Technology" },
  { value: "academic", label: "Academic" },
  { value: "maintenance", label: "Maintenance" }
];

const statuses = [
  { value: "all", label: "All Status" },
  { value: "in-stock", label: "In Stock" },
  { value: "low-stock", label: "Low Stock" },
  { value: "out-of-stock", label: "Out of Stock" }
];

export const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showViewItem, setShowViewItem] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const itemsPerPage = 7;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setShowAddItem(false);
    setShowEditItem(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowEditItem(true);
  };

  const handleView = (item) => {
    setViewingItem(item);
    setShowViewItem(true);
  };

  // Filter inventory based on search, category and status
  const filteredInventory = inventoryItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || 
      item.category.toLowerCase() === categories.find(cat => cat.value === selectedCategory)?.label.toLowerCase();

    const matchesStatus = selectedStatus === "all" || 
      item.status.toLowerCase().replace(/ /g, "-") === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredInventory.slice(start, start + itemsPerPage);

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
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryStats.map((stat, index) => (
            <Card key={index} className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search item"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex space-x-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setShowAddItem(true)}
                >
                  Add new item
                </Button>
              </div>
            </div>

            <div className="w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Item Name</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Category</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Quantity</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Last Updated</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-4 text-sm text-gray-900">{item.name}</td>
                      <td className="py-4 text-sm text-gray-600">{item.category}</td>
                      <td className="py-4 text-sm text-gray-900">{item.quantity}</td>
                      <td className="py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Low Stock"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-600">{item.lastUpdated}</td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <Button 
                            variant="default" 
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 h-7"
                            onClick={() => handleView(item)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-blue-600 text-blue-600 text-xs py-1 h-7"
                            onClick={() => handleEdit(item)}
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

            <div className="flex items-center justify-center space-x-2 mt-6">
              <Button
                variant="outline"
                className="text-sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant={currentPage === 1 ? "default" : "outline"}
                className={`text-sm ${currentPage === 1 ? "bg-blue-600" : ""}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </Button>
              <Button
                variant={currentPage === 2 ? "default" : "outline"}
                className={`text-sm ${currentPage === 2 ? "bg-blue-600" : ""}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </Button>
              <Button
                variant="outline"
                className="text-sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        {showAddItem && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowAddItem(false)} />
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Card className="max-w-2xl w-full mx-auto bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Add New Item</h2>
                    <Button 
                      variant="ghost" 
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowAddItem(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Item Name
                        </label>
                        <Input 
                          placeholder="Enter item name"
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
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <Input 
                          type="number"
                          placeholder="Enter quantity"
                          className="w-full"
                        />
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
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Unit Price
                        </label>
                        <Input 
                          type="number"
                          placeholder="Enter unit price"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea 
                        className="w-full min-h-[100px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter item description"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="border-blue-600 text-blue-600"
                        onClick={() => setShowAddItem(false)}
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

        {/* Edit Item Modal */}
        {showEditItem && editingItem && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowEditItem(false)} />
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Card className="max-w-2xl w-full mx-auto bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Edit Item</h2>
                    <Button 
                      variant="ghost" 
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowEditItem(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Item Name
                        </label>
                        <Input 
                          placeholder="Enter item name"
                          className="w-full"
                          defaultValue={editingItem.name}
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
                        <Select defaultValue={editingItem.category.toLowerCase()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Supplier Name
                        </label>
                        <Input 
                          placeholder="Enter supplier name"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock Status
                        </label>
                        <Select defaultValue={editingItem.status.toLowerCase().replace(/ /g, "-")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <Input 
                          type="number"
                          placeholder="Enter quantity"
                          className="w-full"
                          defaultValue={editingItem.quantity}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="border-blue-600 text-blue-600"
                        onClick={() => setShowEditItem(false)}
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

        {/* View Item Modal */}
        {showViewItem && viewingItem && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowViewItem(false)} />
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Card className="max-w-2xl w-full mx-auto bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">View Item</h2>
                    <Button 
                      variant="ghost" 
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowViewItem(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Item Name
                        </label>
                        <Input 
                          value={viewingItem.name}
                          className="w-full bg-gray-50"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount
                        </label>
                        <Input 
                          type="number"
                          value="800000"
                          className="w-full bg-gray-50"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <Input 
                          value={viewingItem.category}
                          className="w-full bg-gray-50"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Supplier Name
                        </label>
                        <Input 
                          value="Dushimire aine"
                          className="w-full bg-gray-50"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock Status
                        </label>
                        <Input 
                          value={viewingItem.status}
                          className="w-full bg-gray-50"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <Input 
                          type="number"
                          value={viewingItem.quantity}
                          className="w-full bg-gray-50"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="border-blue-600 text-blue-600"
                        onClick={() => setShowViewItem(false)}
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
    </div>
  );
};
