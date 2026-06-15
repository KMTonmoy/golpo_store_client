"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiZap, FiTrendingUp } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard/ProductCard";
import ProductSkeleton from "@/components/common/Skeleton/ProductSkeleton";
import flashSaleData from "../../../../public/data/flashproducts.json";
import { FlashSaleProduct, SaleSettings } from "@/types/flashsale.types";

const FlashSale = () => {
  // Initialize state directly with JSON data instead of using useEffect
  const [flashProducts] = useState<FlashSaleProduct[]>(
    flashSaleData.flashProducts,
  );
  const [saleSettings] = useState<SaleSettings | null>(
    flashSaleData.saleSettings,
  );
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart:", productId);
  };

  const handleWishlist = (productId: string) => {
    console.log("Add to wishlist:", productId);
  };

  const loadMore = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 6, flashProducts.length));
      setLoading(false);
    }, 800);
  };

  if (!saleSettings) return null;

  // Show skeleton while loading more products
  const showSkeleton = loading;

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
            {saleSettings.bannerText}
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Get up to {saleSettings.discountPercentage}% off on selected items!
            Hurry up, limited stock available.
          </p>
        </div>

        {/* Products Grid - Responsive: 1 col on mobile, 2 on sm, 3 on md, 4 on lg */}
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
          
          {/* Show skeleton while loading */}
          {showSkeleton && <ProductSkeleton count={4} />}
        </div>

        {/* Load More Button */}
        {visibleCount < flashProducts.length && !loading && (
          <div className="text-center mt-8 md:mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              className="bg-white text-primary px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all border-2 border-primary text-sm md:text-base"
            >
              Load More Products
            </motion.button>
          </div>
        )}

        {/* Loading indicator for load more */}
        {loading && visibleCount < flashProducts.length && (
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