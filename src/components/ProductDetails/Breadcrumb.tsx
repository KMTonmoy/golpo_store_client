// components/ProductDetails/Breadcrumb.tsx
"use client";

import { BreadcrumbProps } from '@/types/roductDetails.types';
import Link from 'next/link';
import React from 'react';
 
const Breadcrumb = ({ productName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 text-sm text-gray-600">
      <Link href="/" className="hover:text-primary">Home</Link> / 
      <Link href="/products" className="hover:text-primary mx-1">Products</Link> / 
      <span className="text-gray-900 font-semibold">{productName}</span>
    </div>
  );
};

export default Breadcrumb;