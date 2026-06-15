"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ProductImageProps {
  images: string[];
  name: string;
  category: string;
  isHovered: boolean;
  currentImageIndex: number;
  isInStock: boolean;
  isWishlisted: boolean;
  onPrevImage: (e: React.MouseEvent) => void;
  onNextImage: (e: React.MouseEvent) => void;
  onWishlist: (e: React.MouseEvent) => void;
}

const ProductImage = ({
  images,
  name,
  category,
  isHovered,
  currentImageIndex,
  isInStock,
  isWishlisted,
  onPrevImage,
  onNextImage,
  onWishlist
}: ProductImageProps) => {
  const displayImages = images && images.length > 0 ? images : [];
  const currentImage = displayImages[currentImageIndex];
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
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
            onClick={onPrevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all z-10"
          >
            <FiChevronLeft className="text-gray-800 text-lg" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNextImage}
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
                // Handle image change
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
        onClick={onWishlist}
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
  );
};

export default ProductImage;