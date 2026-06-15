"use client";

import { useState, useEffect, useRef } from "react";
import productData from "../../public/data/products.json";
import { Product } from "@/types/product.types";

// Extended product type for flash sale property
interface ExtendedProduct extends Product {
  isFlashSale?: boolean;
}

export const useProducts = () => {
  // Initialize products directly instead of using setState in useEffect
  const [products] = useState<Product[]>(() => 
    [...productData.products].reverse()
  );
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const preloadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Preload images only
    const preloadAllImages = async () => {
      const imageUrls = productData.products.flatMap(product => product.images);
      
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
      setLoading(false);
    };
    
    preloadAllImages();
  }, []);

  const getLatestProducts = (count: number = 8) => {
    return products.slice(0, count);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const getProductById = (productId: string) => {
    return products.find(product => product.productId === productId);
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
    getLatestProducts,
    getProductsByCategory,
    getProductById,
    getFlashSaleProducts,
    getFeaturedProducts
  };
};