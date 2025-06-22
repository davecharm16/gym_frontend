import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

type StatCardProps = {
  icon?: React.ReactNode;
  label: string;
  value: number | string;
  percentage?: number;
};

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  percentage,
}) => {
  const isPositive = percentage !== undefined && percentage >= 0;
  const formattedPercentage = percentage?.toFixed(2);

  return (
    <div className="flex flex-col border border-gray-200  bg-white p-5  w-full h-[200px] justify-between">
    
      {/* Icon + Label */}
      <div className="flex items-center gap-3">
        <div className="text-gray-600">{icon}</div>
        <p className="text-sm text-gray-500 m-0 p-0 leading-none">{label}</p>
      </div>

      {/* Value + % Growth */}
      <div className="flex items-center justify-between mt-auto">
        <p className="text-2xl font-bold text-gray-900">{value}</p>

        {percentage !== undefined && (
          <div
            className={`flex items-center px-2 py-1 rounded-md text-sm font-medium ${
              isPositive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isPositive ? (
              <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} />
            ) : (
              <ArrowDownwardIcon fontSize="small" sx={{ mr: 0.5 }} />
            )}
            {formattedPercentage}%
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
