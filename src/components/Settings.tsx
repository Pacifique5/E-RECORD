
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";

export const Settings = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Settings</h1>
        </div>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name
                </label>
                <Input 
                  defaultValue="Rwanda coding academy"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Logo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year
                </label>
                <Input 
                  defaultValue="2024-2025"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Term
                </label>
                <Input 
                  defaultValue="Term 1"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Input 
                  defaultValue="Kigali Rwanda"
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Names
                </label>
                <Input 
                  defaultValue="Dushimire aine"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <Input 
                  defaultValue="Accountant"
                  className="w-full"
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input 
                  defaultValue="aidushimire@gmail.com"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input 
                  defaultValue="0788888888"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Input 
                  defaultValue="Kigali Rwanda"
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification email
                </label>
                <Input 
                  defaultValue="aidushimire@gmail.com"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sms Notification Number
                </label>
                <Input 
                  defaultValue="0788888888"
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed Notifications
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>All</option>
                <option>Important only</option>
                <option>None</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Data Backup</h2>
            <div className="flex space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Backup Now
              </Button>
              <Button variant="outline">
                Restore Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
