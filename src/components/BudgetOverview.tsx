interface BudgetItem {
  category: string;
  percentage: number;
  color: string;
}

const budgetData: BudgetItem[] = [
  { category: "Academic", percentage: 55, color: "bg-green-500" },
  { category: "Maintenance", percentage: 25, color: "bg-orange-500" },
  { category: "Technology", percentage: 20, color: "bg-blue-500" }
];

export const BudgetOverview = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Budget Overview</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
          Add new category
        </button>
      </div>

      <div className="space-y-4">
        {budgetData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{item.category}</span>
              <span className="text-sm text-gray-900">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className={`${item.color} h-2 rounded-full`} 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 