'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { MenuItemProps } from '@/types/dashboard.types';

const MenuItem = ({
    item,
    index,
    isCollapsed,
    pathname,
    openSubmenu,
    onNavigate,
    onToggleSubmenu
}: MenuItemProps) => {
    const active = pathname === item.href || pathname.startsWith(item.href);
    const hasSubmenu = item.subItems && item.subItems.length > 0;
    const isSubmenuOpen = openSubmenu === item.name;

    return (
        <div key={index}>
            <button
                onClick={() => {
                    if (hasSubmenu) {
                        onToggleSubmenu(item.name);
                    } else {
                        onNavigate(item.href);
                    }
                }}
                className={`
          w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300
          ${active
                        ? 'bg-orange-50 text-orange-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                    }
          ${isCollapsed ? 'justify-center' : ''}
        `}
            >
                <div className="flex items-center gap-3">
                    <item.icon className={`text-xl ${active ? 'text-orange-600' : 'text-gray-500'}`} />
                    {!isCollapsed && (
                        <span className="font-medium">{item.name}</span>
                    )}
                </div>

                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        {item.badge && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {item.badge}
                            </span>
                        )}
                        {hasSubmenu && (
                            isSubmenuOpen ? <FiChevronDown size={16} className="text-gray-500" /> : <FiChevronRight size={16} className="text-gray-500" />
                        )}
                    </div>
                )}
            </button>

            {/* Submenu Items */}
            <AnimatePresence>
                {hasSubmenu && isSubmenuOpen && !isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-9 mt-1 space-y-1"
                    >
                        {item.subItems?.map((subItem, subIndex) => (
                            <button
                                key={subIndex}
                                onClick={() => onNavigate(subItem.href)}
                                className={`
                  w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2
                  ${pathname === subItem.href
                                        ? 'bg-orange-50 text-orange-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-orange-600'
                                    }
                `}
                            >
                                {subItem.icon && <subItem.icon size={14} />}
                                <span>{subItem.name}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MenuItem;