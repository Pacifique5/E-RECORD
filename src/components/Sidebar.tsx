import { LayoutGrid, DollarSign, ImageIcon, ChartBar, Users2, Package, FileText, Bell, Settings } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "fees", label: "Fees Management", icon: DollarSign },
  { id: "expense", label: "Expense Management", icon: ImageIcon },
  { id: "budget", label: "Budget Planning", icon: ChartBar },
  { id: "payroll", label: "Staff Payroll", icon: Users2 },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "financial", label: "Financial Report", icon: FileText },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-100">
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-blue-600 font-semibold text-2xl">E-Record</span>
        </div>
        <div className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md inline-block">
          Accountant
        </div>
      </div>

      <nav className="p-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3 text-base rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
