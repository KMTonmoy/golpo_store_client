// types/product.types.ts

export interface Product {
  _id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;  // Add this
  quantity: number;
  category: string;
  colors: string[];
  images: string[];
  description?: string;     // Add this
  features?: string[];      // Add this
  specifications?: Record<string, string>; // Add this
  brand?: string;           // Add this
  sizes?: string[];         // Add this
  isFlashSale?: boolean;
  discount?: number;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
}

export interface ProductGridProps {
  products: Product[];
  title?: string;
  loading?: boolean;
  columns?: number;
}