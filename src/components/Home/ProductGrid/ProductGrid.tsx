"use client";

import React, { useEffect, useState, useRef } from "react";
import productData from "../../../../public/data/products.json";
import { Product } from "@/types/product.types";
import ProductCard from "@/components/common/Card/Card";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>(productData.products);
  const [isReady, setIsReady] = useState(false);
  const preloadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Preload all images in background
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
    };
    
    preloadAllImages();
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart:", productId);
  };

  const handleWishlist = (productId: string) => {
    console.log("Add to wishlist:", productId);
  };

  // Show loading skeletons while preloading
  if (!isReady || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-100" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
                <div className="h-8 bg-gray-200 rounded-lg w-1/2" />
                <div className="h-4 bg-gray-200 rounded-lg w-full" />
                <div className="h-10 bg-gray-200 rounded-xl w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard
            key={product.productId}
            {...product}
            onAddToCart={handleAddToCart}
            onWishlist={handleWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;