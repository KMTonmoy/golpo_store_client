// context/AuthProvider.tsx
'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import axios from 'axios';

// Types
interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string, name?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
}

interface UserData {
  email: string;
  name: string;
  photo: string;
  role: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Updated createUser to accept name parameter
  const createUser = async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      // Create user in Firebase
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name if provided
      if (name && result.user) {
        await updateProfile(result.user, {
          displayName: name,
          photoURL: '',
        });
      }
      
      // Save user to database (with name)
      await saveUser(result.user, name);
      
      router.push('/');
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await saveUser(result.user);
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUser(result.user);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await axios.get(`${API_URL}/api/logout`, {
        withCredentials: true,
      });
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name: string, photo: string) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
        // Refresh user state
        const updatedUser = auth.currentUser;
        setUser({ ...updatedUser });
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Updated saveUser to accept optional name parameter
  const saveUser = async (user: User, customName?: string) => {
    try {
      const existingUserResponse = await axios.get(
        `${API_URL}/api/users/${user?.email}`
      );
      const existingUser = existingUserResponse.data;

      // If user exists, return it (don't overwrite)
      if (existingUser) {
        return existingUser;
      }

      const currentUser: UserData = {
        email: user?.email || '',
        name: customName || user?.displayName || '',
        photo: user?.photoURL || '',
        role: 'user',
      };
      const { data } = await axios.put(`${API_URL}/api/user`, currentUser);
      return data;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo: AuthContextType = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;