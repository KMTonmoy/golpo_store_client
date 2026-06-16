"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Product } from "@/types/product.types";

// Extended product type for flash sale property
interface ExtendedProduct extends Product {
  isFlashSale?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const preloadedRef = useRef<Set<string>>(new Set());

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/products`);
        
        if (response.data.success) {
          // Reverse to show latest first
          const reversedProducts = [...response.data.products].reverse();
          setProducts(reversedProducts);
          
          // Preload images after getting products
          const imageUrls = reversedProducts.flatMap(product => product.images);
          const preloadPromises = imageUrls.map((url) => {
            return new Promise((resolve) => {
              if (preloadedRef.current.has(url)) {
                resolve(true);
                return;
              }
              const img = new Image();
              img.src = url;
              img.onload = () => {
                preloadedRef.current.add(url);
                resolve(true);
              };
              img.onerror = () => resolve(false);
            });
          });
          
          await Promise.all(preloadPromises);
          setIsReady(true);
        } else {
          setError(response.data.error);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getLatestProducts = (count: number = 8) => {
    return products.slice(0, count);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const getProductById = (productId: string) => {
    return products.find(product => product._id === productId);
  };

  const getFlashSaleProducts = () => {
    return (products as ExtendedProduct[]).filter(product => product.isFlashSale === true);
  };

  const getFeaturedProducts = () => {
    return products.slice(0, 8);
  };

  return {
    products,
    loading,
    isReady,
    error,
    getLatestProducts,
    getProductsByCategory,
    getProductById,
    getFlashSaleProducts,
    getFeaturedProducts
  };
};