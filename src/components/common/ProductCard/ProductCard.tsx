"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { Product } from '@/types/product.types';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
 

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
  colors,
  images,
  onAddToCart,
  onWishlist
}: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images && images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images && images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

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

  return (
    <Link href={`/product/${_id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col"
      >
        {/* Image Container */}
        <ProductImage
          images={images}
          name={name}
          category={category}
          isHovered={isHovered}
          currentImageIndex={currentImageIndex}
          isInStock={quantity > 0}
          isWishlisted={isWishlisted}
          onPrevImage={prevImage}
          onNextImage={nextImage}
          onWishlist={handleWishlist}
        />

        {/* Product Info - Takes remaining space */}
        <div className="flex-1 flex flex-col">
          <ProductInfo
            name={name}
            price={price}
            quantity={quantity}
            colors={colors}
          />

        
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;