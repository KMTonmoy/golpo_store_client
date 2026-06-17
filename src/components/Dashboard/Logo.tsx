// components/Dashboard/Logo.tsx
'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  isCollapsed: boolean;
}

const Logo = ({ isCollapsed }: LogoProps) => {
  return (
    <div className={`p-5 border-b border-gray-100 ${isCollapsed ? 'text-center' : ''}`}>
      {!isCollapsed ? (
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            GolpoStore
          </span>
        </Link>
      ) : (
        <Link href="/dashboard">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">G</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Logo;