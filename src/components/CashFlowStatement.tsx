import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

const cashFlowData = [
  { period: "January", inflow: 100000, outflow: 100000, netCash: 100000 },
  { period: "February", inflow: 100000, outflow: 100000, netCash: 100000 },
  { period: "March", inflow: 100000, outflow: 100000, netCash: 100000 },
  { period: "April", inflow: 100000, outflow: 100000, netCash: 100000 },
];

type ReportType = "profit-loss" | "cash-flow" | "balance-sheet" | "custom";

interface CashFlowStatementProps {
  onReportChange: (report: ReportType) => void;
}

export const CashFlowStatement = ({ onReportChange }: CashFlowStatementProps) => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedTerm, setSelectedTerm] = useState("First Term");

  return (
    <div className="space-y-6">
      {/* Cash Flow Table */}
      <div className="bg-white rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 text-gray-600">Periods</th>
              <th className="text-left py-4 px-6 text-gray-600">Inflow</th>
              <th className="text-left py-4 px-6 text-gray-600">Outflow</th>
              <th className="text-left py-4 px-6 text-gray-600">Net Cash</th>
            </tr>
          </thead>
          <tbody>
            {cashFlowData.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6">{row.period}</td>
                <td className="py-4 px-6 text-green-600">{row.inflow}</td>
                <td className="py-4 px-6 text-red-600">{row.outflow}</td>
                <td className="py-4 px-6">{row.netCash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 