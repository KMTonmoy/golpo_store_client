// components/ProductDetails/LoadingSpinner.tsx
"use client";

import React from 'react';
import { FiLoader } from 'react-icons/fi';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <FiLoader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading product...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;