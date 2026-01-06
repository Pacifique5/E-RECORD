import { DollarSign, ImageIcon, TrendingUp, BarChart3, Tag } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  trendColor: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconTextColor: string;
  showUsedLabel?: boolean;
  suffix?: string;
}

const StatCard = ({ 
  title, 
  value, 
  trend, 
  trendColor,
  icon, 
  iconBgColor, 
  iconTextColor,
  showUsedLabel,
  suffix = "Rwf" 
}: StatCardProps) => (
  <div className="bg-white rounded-lg p-6">
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-xl font-semibold flex items-center gap-1">
            {value}
            <span className="text-gray-500 text-sm font-normal">{suffix}</span>
          </h3>
        </div>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      {showUsedLabel ? (
        <span className="text-sm px-3 py-1 bg-orange-100 text-orange-600 rounded-md w-fit">
          Used
        </span>
      ) : (
        <div className="flex items-center gap-1">
          <TrendingUp className={`w-4 h-4 ${trendColor}`} />
          <span className={`text-sm ${trendColor}`}>{trend}%</span>
        </div>
      )}
    </div>
  </div>
);

export const StatsCards = () => {
  const stats = [
    {
      title: "Total School Fees",
      value: "1000000",
      trend: 15,
      trendColor: "text-blue-500",
      icon: <DollarSign className="w-5 h-5 text-blue-500" />,
      iconBgColor: "bg-blue-50",
      iconTextColor: "text-blue-500"
    },
    {
      title: "Staff Payments",
      value: "1000000",
      trend: 15,
      trendColor: "text-green-500",
      icon: <ImageIcon className="w-5 h-5 text-green-500" />,
      iconBgColor: "bg-green-50",
      iconTextColor: "text-green-500"
    },
    {
      title: "Term Expenses",
      value: "1000000",
      trend: 15,
      trendColor: "text-red-500",
      icon: <Tag className="w-5 h-5 text-red-500" />,
      iconBgColor: "bg-red-50",
      iconTextColor: "text-red-500"
    },
    {
      title: "Total Budget Usage",
      value: "85",
      trend: 0,
      icon: <BarChart3 className="w-5 h-5 text-orange-500" />,
      iconBgColor: "bg-orange-50",
      iconTextColor: "text-orange-500",
      showUsedLabel: true,
      suffix: "%"
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}; 