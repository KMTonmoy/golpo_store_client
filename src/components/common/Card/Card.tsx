"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { Product } from '@/types/product.types';

interface ProductCardProps extends Product {
  onAddToCart?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
}

const ProductCard = ({ 
  _id,
  productId, 
  name, 
  price, 
  quantity, 
  category, 
  images,
  onAddToCart,
  onWishlist
}: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images && images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setImgError(false);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images && images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setImgError(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  const isInStock = quantity > 0;
  const stockStatus = quantity > 10 ? 'In Stock' : quantity > 0 ? `Only ${quantity} left` : 'Out of Stock';
  const stockColor = quantity > 10 ? 'text-green-600' : quantity > 0 ? 'text-orange-600' : 'text-red-600';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(productId);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onWishlist?.(productId);
  };

  const displayImages = images && images.length > 0 ? images : [];
  const currentImage = displayImages[currentImageIndex];

  return (
    <Link href={`/product/${_id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Main Image */}
          {currentImage ? (
            <img
              src={currentImage}
              alt={name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <FiHeart className="text-4xl text-gray-400" />
            </div>
          )}

          {/* Image Navigation Arrows */}
          {displayImages.length > 1 && isHovered && !imgError && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all z-10"
              >
                <FiChevronLeft className="text-gray-800 text-lg" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all z-10"
              >
                <FiChevronRight className="text-gray-800 text-lg" />
              </motion.button>
            </>
          )}

          {/* Image Indicators */}
          {displayImages.length > 1 && !imgError && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                    setImgError(false);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentImageIndex === index
                      ? 'w-6 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all z-10"
          >
            <FiHeart 
              className={`text-xl transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`} 
            />
          </motion.button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              {category}
            </span>
          </div>

          {/* Stock Status Badge */}
          {!isInStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Price and Stock */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">
                {formatPrice(price)}
              </p>
              <p className={`text-xs font-medium ${stockColor}`}>
                {stockStatus}
              </p>
            </div>
            
            {/* Add to Cart Button - Always visible */}
            {isInStock && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-primary text-white p-2.5 rounded-full shadow-lg hover:bg-primary/90 transition-all"
              >
                <FiShoppingCart className="text-xl" />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;