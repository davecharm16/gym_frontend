import React from "react";

type StatCardProps = {
  icon?: React.ReactNode;
  label: string;
  value: number | string;
};

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md px-4 py-5 w-full h-[200px] bg-white text-center space-y-2">
      <div className="text-gray-700">{icon}</div>
      <p className="text-sm text-gray-600 tracking-wide">{label}</p>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
};

export default StatCard;
