import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { FeesManagement } from "@/components/FeesManagement";
import { ExpenseManagement } from "@/components/ExpenseManagement";
import { BudgetPlanning } from "@/components/BudgetPlanning";
import { StaffPayroll } from "@/components/StaffPayroll";
import { Inventory } from "@/components/Inventory";
import { FinancialReport } from "@/components/FinancialReport";
import { Notifications } from "@/components/Notifications";
import { Settings } from "@/components/Settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "fees":
        return <FeesManagement />;
      case "expense":
        return <ExpenseManagement />;
      case "budget":
        return <BudgetPlanning />;
      case "payroll":
        return <StaffPayroll />;
      case "inventory":
        return <Inventory />;
      case "financial":
        return <FinancialReport />;
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-hidden ml-72 pt-[73px]">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
