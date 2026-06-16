 
export interface FlashSaleProduct {
  _id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  category: string;
  colors: string[];
  images: string[];
  isFlashSale?: boolean;
  discount?: number;
}

export interface FlashSaleResponse {
  success: boolean;
  products: FlashSaleProduct[];
  count?: number;
}

export interface FlashSaleProps {
  title?: string;
  limit?: number;
  showLoadMore?: boolean;
}