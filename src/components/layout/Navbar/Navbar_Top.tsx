"use client";

import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUser, FiMenu, FiX, FiArrowLeft, FiChevronDown, FiUser as FiUserIcon, FiSettings, FiLogOut, FiPackage, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import { AuthContext } from '@/Provider/AuthProvider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface NavbarTopProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsMobileMenuOpen?: (value: boolean) => void;
}

const NavbarTop = ({ isOpen, setIsOpen, setIsMobileMenuOpen }: NavbarTopProps) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  // ✅ Safe access to auth context
  const user = authContext?.user || null;
  const logOut = authContext?.logOut || null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>(['Laptop', 'Smartphone', 'T-shirt']);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchFocused(false);
        setShowMobileSearch(false);
        setIsDropdownOpen(false);
        setIsMobileDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSearch = (query: string) => {
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev].slice(0, 5));
    }
    router.push(`/products?search=${query}`);
    setShowMobileSearch(false);
  };

  const handleLogout = async () => {
    if (!logOut) {
      toast.error('Logout function not available');
      return;
    }
    
    try {
      await logOut();
      toast.success('Logged out successfully');
      router.push('/');
      setIsDropdownOpen(false);
      setIsMobileDropdownOpen(false);
      if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleProfileClick = () => {
    router.push('/profile');
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const handleOrdersClick = () => {
    router.push('/orders');
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const handleWishlistClick = () => {
    router.push('/wishlist');
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  // Get first letter of display name or email
  const getDisplayLetter = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Get display name for showing
  const getDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  if (!mounted) {
    return (
      <div className="hidden md:block px-4 lg:px-16 py-3 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/"><span className="text-2xl font-bold text-primary">GolpoStore</span></Link>
            <div className="flex-1"><div className="w-full h-[50px] bg-gray-100 rounded-xl animate-pulse"></div></div>
            <div className="w-[100px] h-[46px] bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block px-4 lg:px-16 py-3 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/">
              <span className="text-2xl font-bold text-primary">GolpoStore</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search products..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchValue)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all text-base"
                />
              </div>

              <AnimatePresence>
                {searchFocused && (
                  <motion.div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border z-50 p-4">
                    {searchHistory.length > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-600">Recent Searches</span>
                          <button onClick={() => setSearchHistory([])} className="text-xs text-accent">Clear All</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {searchHistory.map((item, idx) => (
                            <button key={idx} onClick={() => { setSearchValue(item); handleSearch(item); }} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Popular Categories</span>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {['Electronics', 'Fashion', 'Home & Living', 'Sports'].map((cat) => (
                          <button key={cat} onClick={() => { setSearchValue(cat); handleSearch(cat); }} className="text-left text-gray-600 hover:text-primary py-1 text-sm">
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Section - Show First Letter */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 transition-all">
                  {/* Avatar with first letter */}
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                    {getDisplayLetter()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{getDisplayName()}</span>
                  <FiChevronDown className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b bg-gray-50">
                        <p className="font-semibold text-gray-800">{user.displayName || getDisplayName()}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <button onClick={handleProfileClick} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <FiUserIcon className="text-lg" /> <span>My Profile</span>
                        </button>
                        <button onClick={handleDashboardClick} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <FiSettings className="text-lg" /> <span>Dashboard</span>
                        </button>
                        <button onClick={handleOrdersClick} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <FiPackage className="text-lg" /> <span>My Orders</span>
                        </button>
                        <button onClick={handleWishlistClick} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <FiHeart className="text-lg" /> <span>Wishlist</span>
                        </button>
                      </div>
                      <div className="border-t"></div>
                      <div className="py-2">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <FiLogOut className="text-lg" /> <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/signup">
                <div className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-all cursor-pointer">
                  <FiUser className="text-lg" /> <span>Sign Up</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden bg-white border-b border-gray-100">
        <AnimatePresence mode="wait">
          {!showMobileSearch ? (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4 py-3 flex items-center justify-between gap-3"
            >
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                <FiMenu className="text-2xl" />
              </button>
              
              <Link href="/">
                <span className="text-xl font-bold text-primary">GolpoStore</span>
              </Link>
              
              <div className="flex items-center gap-2">
                <button onClick={() => setShowMobileSearch(true)} className="text-gray-700 p-2">
                  <FiSearch className="text-xl" />
                </button>
                
                {user ? (
                  <div className="relative" ref={mobileDropdownRef}>
                    <button 
                      onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)} 
                      className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm"
                    >
                      {getDisplayLetter()}
                    </button>
                    
                    <AnimatePresence>
                      {isMobileDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden"
                        >
                          <div className="px-4 py-3 border-b bg-gray-50">
                            <p className="font-semibold text-gray-800">{user.displayName || getDisplayName()}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          <div className="py-2">
                            <button onClick={handleProfileClick} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                              <FiUserIcon className="text-lg" /> <span>My Profile</span>
                            </button>
                            <button onClick={handleDashboardClick} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                              <FiSettings className="text-lg" /> <span>Dashboard</span>
                            </button>
                            <button onClick={handleOrdersClick} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                              <FiPackage className="text-lg" /> <span>My Orders</span>
                            </button>
                            <button onClick={handleWishlistClick} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                              <FiHeart className="text-lg" /> <span>Wishlist</span>
                            </button>
                          </div>
                          <div className="border-t"></div>
                          <div className="py-2">
                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                              <FiLogOut className="text-lg" /> <span>Logout</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href="/signup">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <FiUser className="text-sm" />
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="px-4 py-3 flex items-center gap-3"
            >
              <button onClick={() => setShowMobileSearch(false)} className="text-gray-700">
                <FiArrowLeft className="text-2xl" />
              </button>
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchValue)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NavbarTop;