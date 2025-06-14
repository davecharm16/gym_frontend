import React from 'react';

type StatCardProps = {
  icon?: React.ReactNode;
  label: string;
  value: number | string;
};

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg px-6 py-4 w-full max-w-xs text-center shadow-sm">
      <div className="text-gray-700 mb-1">{icon}</div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatCard;
