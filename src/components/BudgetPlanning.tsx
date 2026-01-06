import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import { TrendingUp } from "lucide-react";
import { useState } from "react";

const statsData = [
  { title: "Total School Budget", value: "1000000", currency: "Rwf", change: "15%", icon: "📊" },
  { title: "Total Spend", value: "1000000", currency: "Rwf", change: "15%", icon: "💳" },
  { title: "Total Remaining", value: "1000000", currency: "Rwf", change: "15%", icon: "💰" },
];

const budgetCategories = [
  { name: "Academic", percentage: 55, color: "bg-green-500" },
  { name: "Maintenance", percentage: 25, color: "bg-orange-500" },
  { name: "Technology", percentage: 20, color: "bg-blue-500" },
];

export const BudgetPlanning = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setShowAddCategory(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </span>
                      {stat.currency && (
                        <span className="text-lg text-blue-600 font-medium">
                          {stat.currency}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-3">
                      <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-sm text-blue-600">{stat.change}</span>
                    </div>
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Budget Overview</h3>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowAddCategory(true)}
              >
                Add new category
              </Button>
            </div>
            
            <div className="w-[900px]">
              {budgetCategories.map((category, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{category.name}</span>
                    <span className="text-sm text-gray-900">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`${category.color} h-2 rounded-full`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add Category Modal */}
        {showAddCategory && (
          <>
            <div 
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setShowAddCategory(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Card className="max-w-lg w-full mx-auto bg-white">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Add New Budget Category</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <Input 
                          placeholder="Enter category name"
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
                          Description
                        </label>
                        <textarea 
                          className="w-full px-3 py-2 border rounded-md bg-white text-sm"
                          rows={4}
                          placeholder="Category Description"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        onClick={() => setShowAddCategory(false)}
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
