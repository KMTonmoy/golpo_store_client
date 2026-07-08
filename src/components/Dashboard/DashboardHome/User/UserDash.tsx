'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { 
  FiShoppingBag, 
  FiHeart, 
  FiUser, 
  FiMapPin, 
  FiClock, 
  FiTrendingUp,
  FiPackage,
  FiTruck,
  FiStar,
  FiChevronRight,
  FiDollarSign,
  FiShoppingCart,
  FiCreditCard
} from 'react-icons/fi';

const UserDash = () => {
  const { user } = useAuth();
console.log(user + "Hello World")
  const stats = [
    { label: 'Total Orders', value: '24', icon: FiShoppingBag, color: 'bg-blue-500' },
    { label: 'Wishlist', value: '12', icon: FiHeart, color: 'bg-pink-500' },
    { label: 'Pending Orders', value: '3', icon: FiClock, color: 'bg-yellow-500' },
    { label: 'Total Spent', value: '৳45,999', icon: FiDollarSign, color: 'bg-green-500' },
  ];

  const recentOrders = [
    { id: '#ORD-001', date: '2024-01-15', total: 2499, status: 'Delivered', items: 2 },
    { id: '#ORD-002', date: '2024-01-12', total: 3999, status: 'Processing', items: 1 },
    { id: '#ORD-003', date: '2024-01-10', total: 1299, status: 'Shipped', items: 3 },
    { id: '#ORD-004', date: '2024-01-08', total: 599, status: 'Pending', items: 1 },
  ];

  const quickActions = [
    { label: 'Browse Products', icon: FiPackage, href: '/products', color: 'bg-primary/10 text-primary' },
    { label: 'My Orders', icon: FiTruck, href: '/orders', color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Wishlist', icon: FiHeart, href: '/wishlist', color: 'bg-pink-500/10 text-pink-500' },
    { label: 'Profile', icon: FiUser, href: '/profile', color: 'bg-purple-500/10 text-purple-500' },
    { label: 'Addresses', icon: FiMapPin, href: '/addresses', color: 'bg-green-500/10 text-green-500' },
    { label: 'Track Order', icon: FiTruck, href: '/track-order', color: 'bg-orange-500/10 text-orange-500' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-600';
      case 'Processing': return 'bg-yellow-100 text-yellow-600';
      case 'Shipped': return 'bg-blue-100 text-blue-600';
      case 'Pending': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-primary">{user?.displayName || 'User'}!</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Heres whats happening with your account
          </p>
        </div>
        <Link href="/products">
          <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg hover:shadow-xl flex items-center gap-2">
            <FiShoppingCart className="text-lg" />
            Continue Shopping
          </button>
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={action.href}>
              <div className={`${action.color} rounded-xl p-4 text-center hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md`}>
                <action.icon className="text-2xl mx-auto" />
                <p className="text-xs font-semibold mt-2">{action.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FiClock className="text-primary" />
            Recent Orders
          </h3>
          <Link href="/orders" className="text-primary hover:text-accent font-medium flex items-center gap-1 text-sm">
            View All
            <FiChevronRight className="text-lg" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items} items</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">৳{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/orders/${order.id}`}>
                      <button className="text-primary hover:text-accent font-medium text-sm">
                        Details
                      </button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center gap-3">
            <FiStar className="text-3xl" />
            <div>
              <p className="text-sm opacity-90">Total Reviews</p>
              <p className="text-3xl font-bold">8</p>
            </div>
          </div>
          <p className="text-sm opacity-80 mt-2">Youve helped 5 people with your reviews</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center gap-3">
            <FiTrendingUp className="text-3xl" />
            <div>
              <p className="text-sm opacity-90">Member Since</p>
              <p className="text-2xl font-bold">2024</p>
            </div>
          </div>
          <p className="text-sm opacity-80 mt-2">Youve been with us for 6 months</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center gap-3">
            <FiCreditCard className="text-3xl" />
            <div>
              <p className="text-sm opacity-90">Saved Payment</p>
              <p className="text-2xl font-bold">2 Methods</p>
            </div>
          </div>
          <p className="text-sm opacity-80 mt-2">•••• 4242, •••• 1234</p>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDash;