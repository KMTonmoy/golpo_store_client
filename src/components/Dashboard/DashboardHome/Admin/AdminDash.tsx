'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiUsers, 
  FiPackage, 
  FiShoppingBag, 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown,
  FiArrowUp,
  FiArrowDown,
  FiStar,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiBarChart2,
  FiGrid,
  FiTag,
  FiPercent,
  FiEye,
  FiShoppingCart,
  FiHeart,
  FiMessageSquare,
  FiSettings,
  FiChevronRight,
  FiPlus
} from 'react-icons/fi';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDash = () => {
  // Sample data
  const stats = [
    { label: 'Total Revenue', value: '৳1,24,567', change: '+12.5%', isPositive: true, icon: FiDollarSign, color: 'from-emerald-500 to-green-600' },
    { label: 'Total Orders', value: '1,234', change: '+8.2%', isPositive: true, icon: FiShoppingBag, color: 'from-blue-500 to-indigo-600' },
    { label: 'Total Users', value: '4,567', change: '+15.3%', isPositive: true, icon: FiUsers, color: 'from-purple-500 to-pink-600' },
    { label: 'Total Products', value: '856', change: '-2.1%', isPositive: false, icon: FiPackage, color: 'from-orange-500 to-red-600' },
  ];

  const weeklySales = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 7800 },
    { name: 'Fri', sales: 6000 },
    { name: 'Sat', sales: 9000 },
    { name: 'Sun', sales: 7000 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Fashion', value: 300 },
    { name: 'Home & Living', value: 200 },
    { name: 'Sports', value: 150 },
    { name: 'Accessories', value: 100 },
  ];

  const COLORS = ['#FF6B35', '#FFD700', '#00C9A7', '#FF6B6B', '#4ECDC4'];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: 2499, status: 'Delivered', date: '2024-01-15', payment: 'Card' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: 3999, status: 'Processing', date: '2024-01-15', payment: 'Mobile Banking' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: 1299, status: 'Shipped', date: '2024-01-14', payment: 'Cash' },
    { id: '#ORD-004', customer: 'Sarah Wilson', amount: 599, status: 'Pending', date: '2024-01-14', payment: 'Card' },
    { id: '#ORD-005', customer: 'David Brown', amount: 1899, status: 'Cancelled', date: '2024-01-13', payment: 'Mobile Banking' },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 245, revenue: 612555, growth: '+15%' },
    { name: 'Smart Watch', sales: 189, revenue: 755511, growth: '+22%' },
    { name: 'Gaming Mouse', sales: 156, revenue: 202644, growth: '+8%' },
    { name: 'Running Shoes', sales: 134, revenue: 401466, growth: '+12%' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-indigo-100 text-indigo-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Delivered': return <FiCheckCircle className="text-emerald-500" />;
      case 'Processing': return <FiClock className="text-blue-500" />;
      case 'Shipped': return <FiTruck className="text-indigo-500" />;
      case 'Pending': return <FiClock className="text-yellow-500" />;
      case 'Cancelled': return <FiXCircle className="text-red-500" />;
      default: return <FiAlertCircle className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div> 
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, Admin! 👋
            </h1>
            <p className="text-white/80 mt-1">
              Heres whats happening with your store today
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition flex items-center gap-2">
              <FiBarChart2 className="text-lg" />
              <span>Analytics</span>
            </button>
            <button className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-white/90 transition font-semibold flex items-center gap-2">
              <FiTrendingUp className="text-lg" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-all group`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <stat.icon className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-sm font-semibold ${stat.isPositive ? 'text-white' : 'text-red-200'}`}>
                {stat.change}
              </span>
              <span className="text-white/70 text-sm">vs last month</span>
              {stat.isPositive ? <FiArrowUp className="text-sm" /> : <FiArrowDown className="text-sm" />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FiBarChart2 className="text-primary" />
              Weekly Sales
            </h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#FF6B35" 
                  strokeWidth={3}
                  dot={{ fill: '#FF6B35', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FiTag className="text-primary" />
            Categories
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden lg:col-span-2"
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FiClock className="text-primary" />
              Recent Orders
            </h3>
            <Link href="/dashboard/orders-admin" className="text-primary hover:text-accent font-medium flex items-center gap-1 text-sm">
              View All
              <FiChevronRight className="text-lg" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
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
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">৳{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/orders-admin/${order.id}`}>
                        <button className="text-primary hover:text-accent font-medium text-sm flex items-center gap-1">
                          View <FiEye className="text-sm" />
                        </button>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FiTrendingUp className="text-primary" />
            Top Products
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center text-lg font-bold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{product.sales} sales</span>
                    <span>৳{product.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-emerald-600 font-semibold text-sm">{product.growth}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Add Product', icon: FiPlus, href: '/dashboard/products/add', color: 'bg-blue-500' },
          { label: 'Manage Orders', icon: FiShoppingBag, href: '/dashboard/orders-admin', color: 'bg-green-500' },
          { label: 'View Users', icon: FiUsers, href: '/dashboard/users', color: 'bg-purple-500' },
          { label: 'Flash Sale', icon: FiTag, href: '/dashboard/flash-sale', color: 'bg-orange-500' },
        ].map((action, index) => (
          <Link key={index} href={action.href}>
            <div className={`${action.color} rounded-2xl p-4 text-white text-center hover:scale-105 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl`}>
              <action.icon className="text-3xl mx-auto" />
              <p className="text-sm font-semibold mt-2">{action.label}</p>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminDash;