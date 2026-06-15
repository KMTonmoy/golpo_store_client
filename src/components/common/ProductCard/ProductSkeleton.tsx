"use client";

import React from 'react';

interface ProductSkeletonProps {
  count?: number;
}

const ProductSkeleton = ({ count = 8 }: ProductSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
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
  );
};

export default ProductSkeleton;