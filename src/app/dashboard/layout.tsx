// app/dashboard/layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import AuthProvider from '@/Provider/AuthProvider';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 transition-all duration-300">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
};

export default DashboardLayout;