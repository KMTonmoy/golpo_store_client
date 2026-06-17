// types/dashboard.types.ts
import { IconType } from 'react-icons';

export interface SubMenuItem {
  name: string;
  href: string;
  icon?: IconType;
}

export interface MenuItem {
  name: string;
  href: string;
  icon: IconType;
  badge?: number;
  subItems?: SubMenuItem[];
}

export interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  isCollapsed: boolean;
  pathname: string;
  onNavigate: (href: string) => void;
  onToggleSubmenu: (menuName: string) => void;
  openSubmenu: string | null;
}

export interface MenuItemProps {
  item: MenuItem;
  index: number;
  isCollapsed: boolean;
  pathname: string;
  openSubmenu: string | null;
  onNavigate: (href: string) => void;
  onToggleSubmenu: (menuName: string) => void;
}