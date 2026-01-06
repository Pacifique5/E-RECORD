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

// Sample inventory data
const inventoryData = [
  { 
    name: "Laptops",
    category: "Technology",
    quantity: 20,
    status: "In Stock",
    lastUpdated: "10/5/2025"
  },
  { 
    name: "Projectors",
    category: "Technology",
    quantity: 10,
    status: "Low Stock",
    lastUpdated: "10/5/2025"
  },
  { 
    name: "Textbooks",
    category: "Academic",
    quantity: 100,
    status: "In Stock",
    lastUpdated: "10/5/2025"
  },
  { 
    name: "Notebooks",
    category: "Academic",
    quantity: 5,
    status: "Low Stock",
    lastUpdated: "10/5/2025"
  },
  { 
    name: "Cleaning Supplies",
    category: "Maintenance",
    quantity: 0,
    status: "Out of Stock",
    lastUpdated: "10/5/2025"
  },
  { 
    name: "Printers",
    category: "Technology",
    quantity: 8,
    status: "In Stock",
    lastUpdated: "10/5/2025"
  },
  { 
    name: "Tablets",
    category: "Technology",
    quantity: 15,
    status: "In Stock",
    lastUpdated: "10/5/2025"
  },
  { 
    name: "Whiteboards",
    category: "Academic",
    quantity: 12,
    status: "In Stock",
    lastUpdated: "10/5/2025"
  },
  { 
    name: "Markers",
    category: "Academic",
    quantity: 3,
    status: "Low Stock",
    lastUpdated: "10/5/2025"
  },
  { 
    name: "Chairs",
    category: "Maintenance",
    quantity: 50,
    status: "In Stock",
    lastUpdated: "10/5/2025"
  }
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

export const InventoryManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter inventory based on search, category and status
  const filteredInventory = inventoryData.filter(item => {
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
      <div className="p-8">
        <Card className="bg-white border-0 shadow-sm">
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
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Item Name</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Category</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Quantity</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Last Updated</th>
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
                          <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 h-7">
                            View
                          </Button>
                          <Button variant="outline" className="border-blue-600 text-blue-600 text-xs py-1 h-7">
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
      </div>
    </div>
  );
}; 