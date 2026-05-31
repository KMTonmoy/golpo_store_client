import { IconType } from 'react-icons';

export interface NavbarTopProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export interface NavbarBottomProps {
  cartCount: number;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setCartCount: (value: number) => void;
}

export interface NavItem {
  name: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  badge?: number | string;
  hasDropdown?: boolean;
}

export interface SearchHistoryItem {
  id: number;
  query: string;
  timestamp: Date;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {
  addedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  icon: IconType;
  href: string;
  subCategories?: string[];
}