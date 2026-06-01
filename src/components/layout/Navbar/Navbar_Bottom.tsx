"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiHome,
  FiPackage,
  FiTag,
  FiPhone,
  FiGrid,
  FiPercent,
  FiX
} from 'react-icons/fi';
import Link from 'next/link';

interface NavItem {
  name: string;
  icon: React.ElementType;
  href?: string;
  hasDropdown?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

interface NavbarBottomProps {
  cartCount: number;
  setCartCount: (value: number) => void;
  isLoggedIn?: boolean;
  setIsLoggedIn?: (value: boolean) => void;
}

const NavbarBottom = ({ cartCount, setCartCount }: NavbarBottomProps) => {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);

  const cartBounce: Variants = {
    animate: { 
      scale: [1, 1.3, 1],
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const desktopNavItems: NavItem[] = [
    { name: 'Home', icon: FiHome, href: '/' },
    { name: 'Products', icon: FiPackage, href: '/products', hasDropdown: true },
    { name: 'Categories', icon: FiGrid, href: '/categories', hasDropdown: true },
    { name: 'Offers', icon: FiTag, href: '/offers', badge: 'Hot' },
    { name: 'Contact', icon: FiPhone, href: '/contact' }
  ];

  const mobileNavItems: NavItem[] = [
    { name: 'Home', icon: FiHome, href: '/' },
    { name: 'Shop', icon: FiPackage, href: '/products' },
    { name: 'Offers', icon: FiPercent, href: '/offers' },
    { name: 'Wishlist', icon: FiHeart, onClick: () => setShowWishlistModal(true) },
    { name: 'Cart', icon: FiShoppingCart, onClick: () => setShowCartModal(true), badge: cartCount }
  ];

  return (
    <>
      {/* Desktop Bottom Nav - Removed margin bottom */}
      <div className="hidden md:block px-4 lg:px-16 py-3 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {desktopNavItems.map((item) => (
                <motion.div key={item.name} className="relative group">
                  {item.href ? (
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="text-gray-700 hover:text-accent transition-colors font-medium flex items-center space-x-2 text-sm cursor-pointer"
                      >
                        <item.icon className="text-base" />
                        <span>{item.name}</span>
                        {item.badge && typeof item.badge === 'string' && (
                          <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="text-gray-700 hover:text-accent transition-colors font-medium flex items-center space-x-2 text-sm cursor-pointer"
                    >
                      <item.icon className="text-base" />
                      <span>{item.name}</span>
                    </motion.div>
                  )}
                  
                  {item.hasDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50"
                    >
                      <div className="py-2">
                        {['New Arrivals', 'Best Sellers', 'Trending Now', 'Limited Edition'].map((sub) => (
                          <Link key={sub} href="#">
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 cursor-pointer"
                            >
                              {sub}
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWishlistModal(true)}
                className="relative text-gray-700 hover:text-accent transition-colors"
              >
                <FiHeart className="text-2xl" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={cartCount > 0 ? "animate" : ""}
                variants={cartBounce}
                onClick={() => setShowCartModal(true)}
                className="relative text-gray-700 hover:text-accent transition-colors"
              >
                <FiShoppingCart className="text-2xl" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Removed extra spacing */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50">
        <div className="flex items-center justify-around py-2 px-2">
          {mobileNavItems.map((item) => (
            <motion.button
              key={item.name}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -5 }}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else if (item.href) {
                  window.location.href = item.href;
                }
              }}
              className="relative flex flex-col items-center py-1 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <item.icon className="text-xl text-gray-600" />
              <span className="text-xs mt-1 text-gray-600">{item.name}</span>
              {item.badge && typeof item.badge === 'number' && item.badge > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                >
                  {item.badge}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      <AnimatePresence>
        {showCartModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCartModal(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[60] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Cart ({cartCount})</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowCartModal(false)}
                    className="text-gray-500"
                  >
                    <FiX className="text-2xl" />
                  </motion.button>
                </div>
                {cartCount === 0 ? (
                  <div className="text-center py-12">
                    <FiShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {[1, 2, 3].slice(0, cartCount).map((item) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-3 p-3 border rounded-lg"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                          <div className="flex-1">
                            <h4 className="font-medium">Product {item}</h4>
                            <p className="text-sm text-gray-500">৳999</p>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCartCount(Math.max(0, cartCount - 1))}
                            className="text-red-500"
                          >
                            <FiX />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-primary">৳{cartCount * 999}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-primary text-white py-3 rounded-xl font-semibold"
                      >
                        Checkout
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Wishlist Modal */}
      <AnimatePresence>
        {showWishlistModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWishlistModal(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[60] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Wishlist</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowWishlistModal(false)}
                    className="text-gray-500"
                  >
                    <FiX className="text-2xl" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {['Product A', 'Product B'].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-3 p-3 border rounded-lg"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item}</h4>
                        <p className="text-sm text-gray-500">৳799</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="bg-primary text-white px-3 py-1 rounded-lg text-sm"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarBottom;