import React from "react";

type StatCardProps = {
  icon?: React.ReactNode;
  label: string;
  value: number | string;
};

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-md px-6 py-8 w-[400px] text-center bg-white space-y-3">
      <div className="text-gray-700">{icon}</div>
      <p className="text-md text-gray-600 tracking-wide">{label}</p>
      <p className="text-4xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
};

export default StatCard;
