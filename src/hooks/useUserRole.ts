// hooks/useUserRole.ts
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      setLoading(true);

      if (!user?.email) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/users/${user.email}`);
        if (response.data) {
          setRole(response.data.role || "user");
        } else {
          setRole("user");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return { role, loading };
};
