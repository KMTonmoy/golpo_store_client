"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import AdminDash from "@/components/Dashboard/DashboardHome/Admin/AdminDash";
import UserDash from "@/components/Dashboard/DashboardHome/User/UserDash";
import DashboardSkeleton from "@/components/common/Skeleton/DashboardSkeleton";

const DashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();

  if (authLoading || roleLoading || role === null) {
    return <DashboardSkeleton />;
  }

  const isAdmin = role === "admin";

  return <div>{isAdmin ? <AdminDash /> : <UserDash />}</div>;
};

export default DashboardPage;
