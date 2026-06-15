// types/product.types.ts

export interface Product {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  colors: string[];
  images: string[];
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


 
 