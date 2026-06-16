'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCamera, 
  FiSave, 
  FiEdit2, 
  FiLoader,
  FiCheckCircle,
  FiXCircle,
  FiLogOut
} from 'react-icons/fi';
 import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { imageUpload } from '../api/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface UserData {
  _id: string;
  email: string;
  name: string;
  photo: string;
  role: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

const ProfilePage = () => {
  const { user, updateUserProfile, logOut } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) return;
      
      try {
        const response = await axios.get(`${API_URL}/api/users/${user.email}`);
        if (response.data) {
          setUserData(response.data);
          setFormData({
            name: response.data.name || '',
            phone: response.data.phone || '',
            address: response.data.address || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploadingPhoto(true);
    try {
      // Upload to ImgBB
      const imageUrl = await imageUpload(file);
      
      // Update Firebase profile
      await updateUserProfile(formData.name || userData?.name || '', imageUrl);
      
      // Update database
      await axios.put(`${API_URL}/api/user`, {
        email: user?.email,
        name: formData.name || userData?.name,
        photo: imageUrl,
        role: 'user',
      });
      
      // Update local state
      setUserData(prev => prev ? { ...prev, photo: imageUrl } : null);
      
      toast.success('Profile photo updated successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      // Update Firebase profile
      await updateUserProfile(formData.name, userData?.photo || '');
      
      // Update database
      await axios.put(`${API_URL}/api/user`, {
        email: user?.email,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        photo: userData?.photo || '',
        role: 'user',
      });
      
      // Update local state
      setUserData(prev => prev ? { 
        ...prev, 
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      } : null);
      
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const getInitials = () => {
    const name = formData.name || userData?.name || user?.displayName || user?.email?.charAt(0) || 'U';
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500 mt-2">Manage your personal information</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-primary to-accent"></div>

          {/* Profile Photo Section */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col items-center -mt-16">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-lg">
                  {userData?.photo ? (
                    <img
                      src={userData.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-white text-4xl font-bold">
                      {getInitials()}
                    </div>
                  )}
                </div>
                
                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  {uploadingPhoto ? (
                    <FiLoader className="w-4 h-4 animate-spin" />
                  ) : (
                    <FiCamera className="w-4 h-4" />
                  )}
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              {/* User Name */}
              <h2 className="text-2xl font-bold text-gray-800 mt-4">
                {formData.name || userData?.name || user?.displayName || 'User'}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
              <p className="text-sm text-gray-400 mt-1 capitalize">Role: {userData?.role || 'User'}</p>
            </div>

            {/* Edit/Save Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: userData?.name || '',
                        phone: userData?.phone || '',
                        address: userData?.address || '',
                      });
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={updating}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {updating ? (
                      <FiLoader className="w-4 h-4 animate-spin" />
                    ) : (
                      <FiSave className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Information */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                {/* Name */}
                <div className="flex flex-col md:flex-row md:items-center py-2 border-b border-gray-100">
                  <div className="md:w-1/3 flex items-center gap-2 text-gray-600">
                    <FiUser className="text-primary" />
                    <span className="font-medium">Full Name</span>
                  </div>
                  <div className="md:w-2/3 mt-1 md:mt-0">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <p className="text-gray-700">{formData.name || userData?.name || 'Not set'}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col md:flex-row md:items-center py-2 border-b border-gray-100">
                  <div className="md:w-1/3 flex items-center gap-2 text-gray-600">
                    <FiMail className="text-primary" />
                    <span className="font-medium">Email Address</span>
                  </div>
                  <div className="md:w-2/3 mt-1 md:mt-0">
                    <p className="text-gray-700">{user?.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col md:flex-row md:items-center py-2 border-b border-gray-100">
                  <div className="md:w-1/3 flex items-center gap-2 text-gray-600">
                    <FiPhone className="text-primary" />
                    <span className="font-medium">Phone Number</span>
                  </div>
                  <div className="md:w-2/3 mt-1 md:mt-0">
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-gray-700">{userData?.phone || 'Not set'}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col md:flex-row md:items-start py-2 border-b border-gray-100">
                  <div className="md:w-1/3 flex items-center gap-2 text-gray-600">
                    <FiMapPin className="text-primary" />
                    <span className="font-medium">Address</span>
                  </div>
                  <div className="md:w-2/3 mt-1 md:mt-0">
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <p className="text-gray-700">{userData?.address || 'Not set'}</p>
                    )}
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex flex-col md:flex-row md:items-center py-2">
                  <div className="md:w-1/3 flex items-center gap-2 text-gray-600">
                    <FiCheckCircle className="text-primary" />
                    <span className="font-medium">Member Since</span>
                  </div>
                  <div className="md:w-2/3 mt-1 md:mt-0">
                    <p className="text-gray-700">
                      {userData?.createdAt 
                        ? new Date(userData.createdAt).toLocaleDateString()
                        : 'Recently'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full md:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2"
              >
                <FiLogOut className="w-5 h-5" />
                Logout Account
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;