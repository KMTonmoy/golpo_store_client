"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  FiHome,
  FiPackage,
  FiGrid,
  FiTag,
  FiHeart,
  FiPhone,
  FiTrendingUp,
  FiAward,
  FiTruck,
  FiUser,
  FiX
} from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import Link from 'next/link';
import NavbarTop from './Navbar_Top';
import NavbarBottom from './Navbar_Bottom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setCartCount(3);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants: Variants = {
    hidden: { y: -100 },
    visible: { 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20
      } 
    }
  };

  const mobileMenuVariants: Variants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0, 
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { 
      x: '100%', 
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, type: "spring" as const, stiffness: 100 }
    })
  };

  const menuItems = [
    { name: 'Home', icon: FiHome, href: '/' },
    { name: 'Products', icon: FiPackage, href: '/products' },
    { name: 'Categories', icon: FiGrid, href: '/categories' },
    { name: 'Offers', icon: FiTag, href: '/offers', badge: 'New' },
    { name: 'Wishlist', icon: FiHeart, href: '/wishlist' },
    { name: 'Contact', icon: FiPhone, href: '/contact' }
  ];

  const quickLinks = [
    { name: 'Track Order', icon: FiTruck },
    { name: 'Best Sellers', icon: FiTrendingUp },
    { name: 'Flash Deals', icon: FiAward }
  ];

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 bg-white z-50 transition-shadow duration-300 ${
          scrolling ? 'shadow-2xl' : 'shadow-lg'
        }`}
        suppressHydrationWarning
      >
        <NavbarTop 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        {mounted && (
          <NavbarBottom 
            cartCount={cartCount}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setCartCount={setCartCount}
          />
        )}

        {mounted && (
          <motion.div
            className="h-1 bg-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scrolling ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) : 0 }}
            style={{ originX: 0 }}
          />
        )}
      </motion.nav>

      <AnimatePresence>
        {isOpen && mounted && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-[73px] left-0 right-0 bottom-0 bg-white z-40 md:hidden shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col p-6 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <FiUser className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {isLoggedIn ? 'Welcome Back!' : 'Guest User'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {isLoggedIn ? 'Welcome to GolpoStore' : 'Sign in for better experience'}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">Menu</p>
                  {menuItems.map((item, index) => (
                    <Link key={item.name} href={item.href}>
                      <motion.div
                        custom={index}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ x: 10, backgroundColor: "#FFF7F0" }}
                        className="flex items-center justify-between py-3 px-4 rounded-lg transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="text-accent text-xl" />
                          <span className="text-gray-700 font-medium">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">Quick Links</p>
                  {quickLinks.map((item, index) => (
                    <Link key={item.name} href="#">
                      <motion.div
                        custom={index + 6}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ x: 10 }}
                        className="flex items-center space-x-3 py-2 px-4 text-gray-600 cursor-pointer"
                      >
                        <item.icon className="text-gray-400" />
                        <span className="text-sm">{item.name}</span>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="gradient-brand text-white p-4 rounded-xl mt-4"
                >
                  <div className="flex items-center space-x-3">
                    <MdOutlineLocalOffer className="text-2xl" />
                    <div>
                      <p className="font-bold">Special Offer!</p>
                      <p className="text-sm opacity-90">Free Shipping on orders over ৳999</p>
                    </div>
                  </div>
                </motion.div>

                {isLoggedIn && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLoggedIn(false)}
                    className="mt-4 text-red-500 font-medium py-3 text-center border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-[73px] md:h-[98px]"></div>
      <div className="md:hidden h-[60px]"></div>
    </>
  );
};

export default Navbar;