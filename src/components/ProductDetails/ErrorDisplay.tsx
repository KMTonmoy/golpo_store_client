// components/ProductDetails/ErrorDisplay.tsx
"use client";

import Link from 'next/link';
import React from 'react';

interface ErrorDisplayProps {
  error: string;
  productId?: string;
}

const ErrorDisplay = ({ error, productId }: ErrorDisplayProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error || "Product not found"}</p>
        <p className="text-gray-500 text-sm mb-4">Product ID: {productId || "No ID"}</p>
        <Link href="/products" className="bg-primary text-white px-6 py-2 rounded-lg inline-block">
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ErrorDisplay;