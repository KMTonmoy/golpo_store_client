// types/productGrid.types.ts

import { Product } from './product.types';

export type ProductGridType = 'latest' | 'featured' | 'all' | 'category';
export type ProductSortBy = 'newest' | 'price-asc' | 'price-desc' | 'default';
export type ProductGridColumns = 1 | 2 | 3 | 4 | 5 | 6;

export interface ProductGridContainerProps {
  title?: string;
  type?: ProductGridType;
  category?: string;
  limit?: number;
  sortBy?: ProductSortBy;
  columns?: ProductGridColumns;
  showTitle?: boolean;
  showViewAll?: boolean;
  onViewAll?: () => void;
  className?: string;
}

export interface ProductGridState {
  products: Product[];
  loading: boolean;
  isReady: boolean;
}

export interface ProductGridHandlers {
  handleAddToCart: (productId: string) => void;
  handleWishlist: (productId: string) => void;
  handleViewAll: () => void;
}