import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FinancialSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  currentCashBalance: number;
  chartData: Array<{
    name: string;
    income: number;
    expenses: number;
  }>;
}

export const FinancialSummary = ({
  totalIncome,
  totalExpenses,
  netProfit,
  currentCashBalance,
  chartData
}: FinancialSummaryProps) => {
  return (
    <div className="space-y-8 mb-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-2xl font-semibold text-green-600">{totalIncome.toLocaleString()} Rwf</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-2xl font-semibold text-red-600">{totalExpenses.toLocaleString()} Rwf</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Net Profit</p>
          <p className="text-2xl font-semibold text-yellow-600">{netProfit.toLocaleString()} Rwf</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Current Cash Balance</p>
          <p className="text-2xl font-semibold text-blue-600">{currentCashBalance.toLocaleString()} Rwf</p>
        </div>
      </div>

      {/* Income Expenses Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Income Expenses Chart</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#22c55e" name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}; 