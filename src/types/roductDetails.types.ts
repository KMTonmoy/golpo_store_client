// types/productDetails.types.ts

export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  category: string;
  brand?: string;
  colors: string[];
  sizes?: string[];
  images: string[];
  description?: string;
  features?: string[];
  specifications?: Record<string, string>;
  isFlashSale?: boolean;
  discount?: number;
}

export interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  selectedImage: number;
  onImageSelect: (index: number) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
}

export interface ProductInfoProps {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  isWishlisted: boolean;
  isInStock: boolean;
  discount: number;
  formatPrice: (price: number) => string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  onQuantityChange: (type: 'increment' | 'decrement') => void;
  onAddToCart: () => void;
  onWishlist: () => void;
  onShare: () => void;
}

export interface ProductTabsProps {
  product: Product;
  activeTab: 'description' | 'features' | 'specifications';
  onTabChange: (tab: 'description' | 'features' | 'specifications') => void;
}

export interface BreadcrumbProps {
  productName: string;
}