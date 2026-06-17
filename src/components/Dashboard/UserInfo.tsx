// components/Dashboard/UserInfo.tsx
'use client';

import React from 'react';
import { User } from 'firebase/auth';
import { FiUser } from 'react-icons/fi';

interface UserInfoProps {
  user: User | null;
  role: string | null;
  isCollapsed: boolean;
}

const UserInfo = ({ user, role, isCollapsed }: UserInfoProps) => {
  return (
    <div className={`mb-6 pb-4 border-b border-gray-100 ${isCollapsed ? 'text-center' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <FiUser className="text-orange-600 text-xl" />
          )}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 truncate">
              {user?.displayName || user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500 capitalize">{role || 'user'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;