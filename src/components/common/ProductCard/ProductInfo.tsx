"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductInfoProps {
  name: string;
  price: number;
  quantity: number;
  colors?: string[];
}

const ProductInfo = ({ name, price, quantity, colors }: ProductInfoProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
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

  // Check if name is long enough to need tooltip
  const needsTooltip = name.length > 40;

  return (
    <div className="p-4 space-y-2 flex-1">
      {/* Product Name - With Tooltip on hover */}
      <div 
        className="relative"
        onMouseEnter={() => needsTooltip && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 min-h-[56px] hover:text-primary transition-colors">
          {name}
        </h3>
        
        {/* Tooltip for long names */}
        <AnimatePresence>
          {showTooltip && needsTooltip && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 bottom-full left-0 mb-2 bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-xl max-w-[250px] whitespace-normal break-words"
            >
              {name}
              <div className="absolute top-full left-4 w-2 h-2 bg-gray-900 rotate-45 translate-y-[-4px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price - Fixed height */}
      <div className="min-h-[32px]">
        <p className="text-2xl font-bold text-primary">
          {formatPrice(price)}
        </p>
      </div>

      {/* Stock Status - Fixed height with ellipsis */}
      <div className="min-h-[20px]">
        <p className={`text-xs font-medium ${stockColor} truncate`}>
          {stockStatus}
        </p>
      </div>

     
    </div>
  );
};

export default ProductInfo;