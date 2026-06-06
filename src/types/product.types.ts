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

export interface ProductsResponse {
  products: Product[];
  categories: string[];
}