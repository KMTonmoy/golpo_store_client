'use client';

import React from 'react';
import MenuItem from './MenuItem';
import { MenuSectionProps } from '@/types/dashboard.types';

const MenuSection = ({
    title,
    items,
    isCollapsed,
    pathname,
    onNavigate,
    onToggleSubmenu,
    openSubmenu
}: MenuSectionProps) => {
    if (items.length === 0) return null;

    return (
        <div className="mb-6">
            {!isCollapsed && (
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    {title}
                </h3>
            )}
            <div className="space-y-1">
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        item={item}
                        index={index}
                        isCollapsed={isCollapsed}
                        pathname={pathname}
                        openSubmenu={openSubmenu}
                        onNavigate={onNavigate}
                        onToggleSubmenu={onToggleSubmenu}
                    />
                ))}
            </div>
        </div>
    );
};

export default MenuSection;