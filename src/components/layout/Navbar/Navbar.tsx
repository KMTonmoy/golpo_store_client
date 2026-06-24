"use client";

import React, { useState, useEffect, useContext } from 'react';
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
  FiX,
  FiLogOut,
  FiSettings,
  FiShoppingCart
} from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/Provider/AuthProvider';
import toast from 'react-hot-toast';
import NavbarTop from './Navbar_Top';
import NavbarBottom from './Navbar_Bottom';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  // ✅ Safe access to auth context
  const user = authContext?.user || null;
  const logOut = authContext?.logOut || null;

  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        const height = navbar.getBoundingClientRect().height;
        setNavbarHeight(height);
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
      document.documentElement.style.removeProperty('--navbar-height');
    };
  }, [mounted]);

  const handleLogout = async () => {
    if (!logOut) {
      toast.error('Logout function not available');
      return;
    }
    
    try {
      await logOut();
      toast.success('Logged out successfully');
      router.push('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

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

  const userMenuItems = [
    { name: 'My Profile', icon: FiUser, href: '/profile' },
    { name: 'My Orders', icon: FiShoppingCart, href: '/orders' },
    { name: 'Dashboard', icon: FiSettings, href: '/dashboard' },
  ];

  const quickLinks = [
    { name: 'Track Order', icon: FiTruck, href: '/track-order' },
    { name: 'Best Sellers', icon: FiTrendingUp, href: '/best-sellers' },
    { name: 'Flash Deals', icon: FiAward, href: '/flash-deals' }
  ];

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 bg-white z-50 transition-shadow duration-300 ${scrolling ? 'shadow-2xl' : 'shadow-lg'
          }`}
        suppressHydrationWarning
      >
        <NavbarTop
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {mounted && (
          <NavbarBottom
            cartCount={cartCount}
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

      {/* Mobile Menu Sidebar */}
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
              <div className="flex flex-col p-6 space-y-6 pb-32">
                {/* User Profile Section */}
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
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {user ? user.displayName || user.email?.split('@')[0] || 'User' : 'Guest User'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user ? user.email : 'Sign in for better experience'}
                      </p>
                    </div>
                    {user && logOut && (
                      <button
                        onClick={handleLogout}
                        className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <FiLogOut className="text-xl" />
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* User Menu Items (when logged in) */}
                {user && (
                  <div className="flex flex-col space-y-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">Account</p>
                    {userMenuItems.map((item, index) => (
                      <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                        <motion.div
                          custom={index}
                          variants={menuItemVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ x: 10, backgroundColor: "#FFF7F0" }}
                          className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors cursor-pointer"
                        >
                          <item.icon className="text-accent text-xl" />
                          <span className="text-gray-700 font-medium">{item.name}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Main Menu */}
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">Menu</p>
                  {menuItems.map((item, index) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
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

                {/* Quick Links */}
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">Quick Links</p>
                  {quickLinks.map((item, index) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
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

                {/* Special Offer Banner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-xl mt-4"
                >
                  <div className="flex items-center space-x-3">
                    <MdOutlineLocalOffer className="text-2xl" />
                    <div>
                      <p className="font-bold">Special Offer!</p>
                      <p className="text-sm opacity-90">Free Shipping on orders over ৳999</p>
                    </div>
                  </div>
                </motion.div>

                {/* Login/Signup Button for Guests */}
                {!user && (
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all"
                    >
                      Sign In / Sign Up
                    </motion.button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer divs */}
      <div className="hidden md:block" style={{ height: 'var(--navbar-height, 98px)' }} />
      <div className="md:hidden block" style={{ height: 'var(--navbar-height, 73px)' }} />
    </>
  );
};

export default Navbar;