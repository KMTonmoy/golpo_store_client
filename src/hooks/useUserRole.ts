// hooks/useUserRole.ts
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState('user');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_URL}/api/users/${user.email}`);
        if (data) {
          setUserData(data);
          setRole(data.role || 'user');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.email]);

  return {
    role,
    userData,
    loading,
    isAdmin: role === 'admin',
    isUser: role === 'user',
  };
};