// src/pages/ProfileManagement.tsx
import { useState } from 'react';
import Monthly from './profile-management/screens/Monthly';
import Session from './profile-management/screens/Session';

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'session'>('monthly');

  return (
    <div className="p-3 mt-6">
      <h1 className="text-2xl font-bold mb-4">Profile Management</h1>

      <div className="flex gap-6 border-b pb-2 mb-6">
        <button
          className={`pb-1 ${activeTab === 'session' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('session')}
        >
          Session
        </button>
        <button
          className={`pb-1 ${activeTab === 'monthly' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly
        </button>
      </div>

      {activeTab === 'session' && <Session />}
      {activeTab === 'monthly' && <Monthly />}
    </div>
  );
};

export default ProfileManagement;
