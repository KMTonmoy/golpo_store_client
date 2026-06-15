"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface BannerSkeletonProps {
  count?: number;
}

const BannerSkeleton = ({ count = 1 }: BannerSkeletonProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-7xl overflow-hidden rounded-2xl shadow-2xl">
        {/* Main Banner Container */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          
          {/* Content Placeholder */}
          <div className="relative h-full flex items-center px-4 md:px-12 lg:px-20">
            <div className="max-w-2xl w-full space-y-4">
              {/* Badge Placeholder */}
              <div className="w-24 h-8 bg-gray-400/50 rounded-full" />
              
              {/* Subtitle Placeholder */}
              <div className="w-48 h-6 bg-gray-400/50 rounded-lg" />
              
              {/* Title Placeholder */}
              <div className="space-y-2">
                <div className="w-96 h-12 bg-gray-400/50 rounded-lg" />
                <div className="w-64 h-12 bg-gray-400/50 rounded-lg" />
              </div>
              
              {/* Description Placeholder */}
              <div className="space-y-2">
                <div className="w-full max-w-md h-4 bg-gray-400/50 rounded" />
                <div className="w-3/4 max-w-md h-4 bg-gray-400/50 rounded" />
              </div>
              
              {/* Features Placeholder */}
              <div className="flex gap-4">
                <div className="w-20 h-6 bg-gray-400/50 rounded-full" />
                <div className="w-24 h-6 bg-gray-400/50 rounded-full" />
                <div className="w-28 h-6 bg-gray-400/50 rounded-full" />
              </div>
              
              {/* Button Placeholder */}
              <div className="w-32 h-12 bg-gray-400/50 rounded-full" />
            </div>
          </div>
          
          {/* Navigation Arrows Placeholder */}
          <div className="absolute right-7 md:right-7 bottom-2 flex gap-2">
            <div className="w-10 h-10 bg-gray-400/30 rounded-full" />
            <div className="w-10 h-10 bg-gray-400/30 rounded-full" />
          </div>
          
          {/* Dots Placeholder */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full bg-white/50 ${
                  index === 0 ? 'w-8' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;