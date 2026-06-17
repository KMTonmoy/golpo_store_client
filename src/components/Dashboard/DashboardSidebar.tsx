// components/Dashboard/DashboardSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { FiChevronDown, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';
import {
    FiHome,
    FiUser,
    FiPackage,
    FiHeart,
    FiShoppingCart,
    FiSettings,
    FiGrid,
    FiTag,
    FiUsers,
    FiBarChart2,
    FiBell,
    FiMessageSquare,
    FiHelpCircle,
    FiFolder,
    FiStar,
    FiTruck,
    FiCreditCard,
    FiPercent,
    FiRefreshCw,
    FiMapPin,
    FiPlusCircle,
    FiEdit,
    FiImage as FiBanner,
    FiShoppingBag,
} from 'react-icons/fi';
import Logo from './Logo';
import UserInfo from './UserInfo';
import MenuSection from './MenuSection';
import LogoutButton from './LogoutButton';
import { MenuItem } from '@/types/dashboard.types';

const DashboardSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [isDesktop, setIsDesktop] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const { user, logOut } = useAuth();
    const { role, loading } = useUserRole();

    // Check if desktop on mount and resize
    useEffect(() => {
        const checkScreen = () => {
            setIsDesktop(window.innerWidth >= 768);
            if (window.innerWidth >= 768) {
                setIsMobileOpen(false);
            }
        };
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    // Common menu items for all users
    const commonMenuItems: MenuItem[] = [
        { name: 'Dashboard', href: '/dashboard', icon: FiHome },
        { name: 'My Profile', href: '/dashboard/profile', icon: FiUser },
        { name: 'My Orders', href: '/dashboard/orders', icon: FiShoppingCart },
        { name: 'My Wishlist', href: '/dashboard/wishlist', icon: FiHeart },
    ];

    // User menu items (for regular users)
    const userMenuItems: MenuItem[] = [
        { name: 'Returns', href: '/dashboard/returns', icon: FiRefreshCw },
        { name: 'Address Book', href: '/dashboard/addresses', icon: FiMapPin },
    ];

    // Admin menu items
    const adminMenuItems: MenuItem[] = [
        { name: 'Analytics', href: '/dashboard/analytics', icon: FiBarChart2 },
        {
            name: 'Products',
            href: '/dashboard/products',
            icon: FiPackage,
            subItems: [
                { name: 'All Products', href: '/dashboard/products', icon: FiPackage },
                { name: 'Add Product', href: '/dashboard/products/add', icon: FiPlusCircle },
                { name: 'Edit Product', href: '/dashboard/products/edit', icon: FiEdit },
                { name: 'Categories', href: '/dashboard/categories', icon: FiFolder },
            ]
        },
        {
            name: 'Orders',
            href: '/dashboard/orders-admin',
            icon: FiShoppingBag,
            subItems: [
                { name: 'All Orders', href: '/dashboard/orders-admin' },
                { name: 'Pending Orders', href: '/dashboard/orders-admin/pending' },
                { name: 'Completed Orders', href: '/dashboard/orders-admin/completed' },
            ]
        },
        {
            name: 'Users',
            href: '/dashboard/users',
            icon: FiUsers,
            subItems: [
                { name: 'All Users', href: '/dashboard/users' },
                { name: 'Customers', href: '/dashboard/users/customers' },
                { name: 'Admins', href: '/dashboard/users/admins' },
            ]
        },
        {
            name: 'Banners',
            href: '/dashboard/banners',
            icon: FiBanner,
            subItems: [
                { name: 'All Banners', href: '/dashboard/banners' },
                { name: 'Add Banner', href: '/dashboard/banners/add' },
            ]
        },
        {
            name: 'Flash Sale',
            href: '/dashboard/flash-sale',
            icon: FiTag,
            subItems: [
                { name: 'Active Sales', href: '/dashboard/flash-sale' },
                { name: 'Add Flash Sale', href: '/dashboard/flash-sale/add' },
            ]
        },
        { name: 'Featured Products', href: '/dashboard/featured', icon: FiStar },
        { name: 'Coupons', href: '/dashboard/coupons-admin', icon: FiPercent },
        { name: 'Reviews', href: '/dashboard/reviews', icon: FiMessageSquare },
        { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
    ];

    // Store links
    const storeMenuItems: MenuItem[] = [
        { name: 'Go to Shop', href: '/', icon: FiGrid },
        { name: 'Browse Categories', href: '/categories', icon: FiFolder },
        { name: 'Flash Deals', href: '/flash-sale', icon: FiTag },
    ];

    const handleNavigate = (href: string) => {
        router.push(href);
        setIsMobileOpen(false);
    };

    const handleToggleSubmenu = (menuName: string) => {
        setOpenSubmenu(openSubmenu === menuName ? null : menuName);
    };

    const handleLogout = async () => {
        try {
            await logOut();
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Calculate sidebar width for main content padding
    const sidebarWidth = isCollapsed ? 80 : 256;

    if (loading) {
        return (
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl animate-pulse z-50">
                <div className="p-5 border-b">
                    <div className="w-32 h-8 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    const isAdmin = role === 'admin';

    return (
        <>
            {/* Mobile Menu Button - Only show on mobile */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-lg shadow-lg"
            >
                <FiMenu size={24} />
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    x: isMobileOpen ? 0 : isDesktop ? (isCollapsed ? -80 : 0) : -280,
                    width: isCollapsed && isDesktop ? 80 : 256,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`
                    fixed left-0 top-0 h-full bg-white shadow-2xl z-50
                    ${isMobileOpen ? 'block' : 'hidden md:block'}
                `}
                style={{ width: isCollapsed && isDesktop ? 80 : 256 }}
            >
                {/* Close button for mobile */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 md:hidden"
                >
                    <FiX size={20} />
                </button>

                <Logo isCollapsed={isCollapsed} />

                {/* Collapse Toggle Button - Desktop only */}
                {isDesktop && (
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:flex absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all z-10"
                    >
                        {isCollapsed ? <FiChevronRight size={14} /> : <FiChevronDown size={14} className="rotate-90" />}
                    </button>
                )}

                {/* Scrollable Menu Area */}
                <div className="h-[calc(100vh-80px)] overflow-y-auto py-6 px-3 custom-scrollbar">
                    <UserInfo user={user} role={role} isCollapsed={isCollapsed} />

                    {/* Common Menu */}
                    <MenuSection
                        title="MAIN"
                        items={commonMenuItems}
                        isCollapsed={isCollapsed}
                        pathname={pathname}
                        onNavigate={handleNavigate}
                        onToggleSubmenu={handleToggleSubmenu}
                        openSubmenu={openSubmenu}
                    />

                    {/* User Specific Menu */}
                    {!isAdmin && (
                        <MenuSection
                            title="MY ACCOUNT"
                            items={userMenuItems}
                            isCollapsed={isCollapsed}
                            pathname={pathname}
                            onNavigate={handleNavigate}
                            onToggleSubmenu={handleToggleSubmenu}
                            openSubmenu={openSubmenu}
                        />
                    )}

                    {/* Admin Menu */}
                    {isAdmin && (
                        <MenuSection
                            title="ADMIN PANEL"
                            items={adminMenuItems}
                            isCollapsed={isCollapsed}
                            pathname={pathname}
                            onNavigate={handleNavigate}
                            onToggleSubmenu={handleToggleSubmenu}
                            openSubmenu={openSubmenu}
                        />
                    )}

                    {/* Store Links */}
                    <MenuSection
                        title="STORE"
                        items={storeMenuItems}
                        isCollapsed={isCollapsed}
                        pathname={pathname}
                        onNavigate={handleNavigate}
                        onToggleSubmenu={handleToggleSubmenu}
                        openSubmenu={openSubmenu}
                    />

                    <LogoutButton isCollapsed={isCollapsed} onLogout={handleLogout} />
                </div>
            </motion.aside>

            {/* Spacer div to push main content - Only on desktop */}
            <div 
                className="hidden md:block transition-all duration-300"
                style={{ width: isCollapsed ? 80 : 256, flexShrink: 0 }}
            />

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            `}</style>
        </>
    );
};

export default DashboardSidebar;