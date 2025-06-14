// src/pages/ProfileManagement.tsx
import { useState } from 'react';
import Monthly from './profile-management/screens/Monthly';
import Session from './profile-management/screens/Session';

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'session'>('session');

  return (
    <div className="p-3 mt-12">
      <h2 className="text-sm font-bold mb-6">Profile Management</h2>

      <div className="flex gap-6 border-b pb-2 m-6">
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
