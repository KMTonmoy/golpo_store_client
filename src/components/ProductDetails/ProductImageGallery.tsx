// components/ProductDetails/ProductImageGallery.tsx
"use client";

import { ProductImageGalleryProps } from '@/types/roductDetails.types';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
 
const ProductImageGallery = ({
  images,
  productName,
  selectedImage,
  onImageSelect,
  onPrevImage,
  onNextImage
}: ProductImageGalleryProps) => {
  if (!images || images.length === 0) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg group">
        <div className="aspect-square">
          <img
            src={images[selectedImage]}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>
        
        {images.length > 1 && (
          <>
            <button
              onClick={onPrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={onNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                selectedImage === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;