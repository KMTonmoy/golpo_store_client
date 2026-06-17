// components/Dashboard/LogoutButton.tsx
'use client';

import React from 'react';
import { FiLogOut } from 'react-icons/fi';

interface LogoutButtonProps {
  isCollapsed: boolean;
  onLogout: () => void;
}

const LogoutButton = ({ isCollapsed, onLogout }: LogoutButtonProps) => {
  return (
    <div className="mt-6 pt-4 border-t border-gray-100">
      <button
        onClick={onLogout}
        className={`
          w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
          text-red-600 hover:bg-red-50
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        <FiLogOut className="text-xl" />
        {!isCollapsed && <span className="font-medium">Logout</span>}
      </button>
    </div>
  );
};

export default LogoutButton;