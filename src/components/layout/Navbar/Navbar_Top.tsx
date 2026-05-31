"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUser, FiMenu, FiX, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

interface NavbarTopProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const NavbarTop = ({ isOpen, setIsOpen, isLoggedIn, setIsLoggedIn }: NavbarTopProps) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>(['Laptop', 'Smartphone', 'T-shirt']);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchFocused(false);
        setShowMobileSearch(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSearch = (query: string) => {
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev].slice(0, 5));
    }
    console.log('Searching for:', query);
  };

  if (!mounted) {
    return (
      <div className="hidden md:block px-4 lg:px-16 py-3 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex-shrink-0 cursor-pointer">
              <span className="text-2xl font-bold text-primary">GolpoStore</span>
            </Link>
            <div className="flex-1 relative">
              <div className="relative">
                <div className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white h-[50px]"></div>
              </div>
            </div>
            <div className="bg-primary text-white px-5 py-2.5 rounded-xl w-[100px] h-[46px]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block px-4 lg:px-16 py-3 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 cursor-pointer"
            >
              <Link href="/">
                <span className="text-2xl font-bold text-primary">
                  GolpoStore
                </span>
              </Link>
            </motion.div>

            <div className="flex-1 relative">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <motion.input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search products... (Try 'Laptop', 'Phone', 'Fashion')"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchValue)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all text-base"
                  whileFocus={{ borderColor: "#FF6B35", boxShadow: "0 0 0 3px rgba(255,107,53,0.1)" }}
                />
                <AnimatePresence>
                  {searchValue && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      onClick={() => setSearchValue('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="text-lg" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {searchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                  >
                    <div className="p-4">
                      {searchHistory.length > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-600">Recent Searches</span>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSearchHistory([])}
                              className="text-xs text-accent hover:text-primary"
                            >
                              Clear All
                            </motion.button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {searchHistory.map((item, idx) => (
                              <motion.button
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => {
                                  setSearchValue(item);
                                  handleSearch(item);
                                }}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                              >
                                {item}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-semibold text-gray-600 mb-2 block">Popular Categories</span>
                        <div className="grid grid-cols-2 gap-2">
                          {['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Toys'].map((cat) => (
                            <motion.button
                              key={cat}
                              whileHover={{ x: 5 }}
                              onClick={() => {
                                setSearchValue(cat);
                                handleSearch(cat);
                              }}
                              className="text-left text-gray-600 hover:text-primary py-1 text-sm"
                            >
                              {cat}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <FiUser className="text-lg" />
                <span>Sign Up</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-white border-b border-gray-100">
        <AnimatePresence mode="wait">
          {!showMobileSearch ? (
            <motion.div
              key="normal"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4 py-3 flex items-center justify-between gap-3"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                    >
                      <FiX className="text-2xl" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                    >
                      <FiMenu className="text-2xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.div 
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
              >
                <Link href="/">
                  <span className="text-xl font-bold text-primary">GolpoStore</span>
                </Link>
              </motion.div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMobileSearch(true)}
                  className="text-gray-700 p-2"
                >
                  <FiSearch className="text-xl" />
                </motion.button>
                <Link href="/signup">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="bg-primary text-white p-2 rounded-lg cursor-pointer"
                  >
                    <FiUser className="text-lg" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="px-4 py-3 flex items-center gap-3"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileSearch(false)}
                className="text-gray-700"
              >
                <FiArrowLeft className="text-2xl" />
              </motion.button>
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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