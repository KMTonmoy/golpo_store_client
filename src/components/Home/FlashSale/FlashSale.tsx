"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
import axios from "axios";
import ProductCard from "@/components/common/ProductCard/ProductCard";
import ProductSkeleton from "@/components/common/Skeleton/ProductSkeleton";
import { FlashSaleProduct, FlashSaleResponse } from "@/types/flashsale.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const FlashSale = () => {
  const [flashProducts, setFlashProducts] = useState<FlashSaleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch flash sale products from dedicated API endpoint
  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<FlashSaleResponse>(`${API_URL}/api/flash-sale`);
        
        if (response.data.success) {
          setFlashProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching flash sale products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSaleProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart:", productId);
  };

  const handleWishlist = (productId: string) => {
    console.log("Add to wishlist:", productId);
  };

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 6, flashProducts.length));
      setLoadingMore(false);
    }, 800);
  };

  // Calculate max discount from products
  const maxDiscount = flashProducts.length > 0 
    ? Math.max(...flashProducts.map(p => p.discount || 0))
    : 50;

  if (loading) {
    return (
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-32 h-8 bg-red-500/50 rounded-full mx-auto mb-3 animate-pulse" />
            <div className="w-64 h-8 bg-gray-200 rounded-lg mx-auto mb-2 animate-pulse" />
            <div className="w-96 h-4 bg-gray-200 rounded-lg mx-auto animate-pulse" />
          </div>
          <ProductSkeleton count={8} />
        </div>
      </section>
    );
  }

  if (flashProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-3 md:mb-4"
          >
            <FiZap className="text-base md:text-xl" />
            <span className="font-semibold text-sm md:text-base">FLASH SALE</span>
          </motion.div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 md:mb-3">
            Limited Time Offer!
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Get up to {maxDiscount}% off on selected items!
            Hurry up, limited stock available.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {flashProducts.slice(0, visibleCount).map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              productId={product.productId}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              category={product.category}
              colors={product.colors}
              images={product.images}
              onAddToCart={handleAddToCart}
              onWishlist={handleWishlist}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < flashProducts.length && !loadingMore && (
          <div className="text-center mt-8 md:mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              className="bg-white text-primary px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all border-2 border-primary text-sm md:text-base"
            >
              Load More Products ({flashProducts.length - visibleCount} left)
            </motion.button>
          </div>
        )}

        {/* Loading indicator */}
        {loadingMore && (
          <div className="text-center mt-8 md:mt-10">
            <div className="inline-flex items-center gap-2 text-primary">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Loading more products...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlashSale;