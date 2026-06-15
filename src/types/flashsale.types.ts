export interface FlashSaleProduct {
  _id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  sold: number;
  category: string;
  colors: string[];
  images: string[];
}

export interface SaleSettings {
  isActive: boolean;
  bannerText: string;
  discountPercentage: number;
}

export interface FlashSaleResponse {
  flashProducts: FlashSaleProduct[];
  saleSettings: SaleSettings;
}