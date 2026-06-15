"use client";

import React from 'react';
import ProductCard from '@/components/common/ProductCard/ProductCard';
import { useProducts } from '@/Hook/useProducts';
import ProductSkeleton from '@/components/common/ProductCard/ProductSkeleton';
import { ProductGridContainerProps } from '@/types/productGrid.types';
import { Product } from '@/types/product.types';

// Extended product type for flash sale property
interface ExtendedProduct extends Product {
  isFlashSale?: boolean;
}

const ProductGridContainer = ({
  title = "Products",
  type = 'latest',
  category,
  limit = 8,
  sortBy = 'newest',
  columns = 4,
  showTitle = true,
  showViewAll = true,
  onViewAll,
  className = ''
}: ProductGridContainerProps) => {
  const { products, loading, isReady, getLatestProducts, getProductsByCategory } = useProducts();

  // Get products based on type
  let displayProducts: Product[] = [];

  switch (type) {
    case 'latest':
      displayProducts = getLatestProducts(limit);
      break;
    case 'category':
      if (category) {
        displayProducts = getProductsByCategory(category).slice(0, limit);
      }
      break;
    case 'all':
      displayProducts = products.slice(0, limit);
      break;
    case 'featured':
      displayProducts = (products as ExtendedProduct[])
        .filter(p => p.isFlashSale === true)
        .slice(0, limit);
      break;
    default:
      displayProducts = getLatestProducts(limit);
  }

  // Sort products
  if (sortBy === 'price-asc') {
    displayProducts = [...displayProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    displayProducts = [...displayProducts].sort((a, b) => b.price - a.price);
  }

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart:", productId);
  };

  const handleWishlist = (productId: string) => {
    console.log("Add to wishlist:", productId);
  };

  const gridCols: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  if (loading || !isReady) {
    return (
      <div className={`container mx-auto px-4 py-8 ${className}`}>
        {showTitle && (
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {title}
          </h2>
        )}
        <ProductSkeleton count={limit} />
      </div>
    );
  }

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      {showTitle && (
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {title}
          </h2>
          {showViewAll && (
            <button 
              onClick={onViewAll}
              className="text-primary hover:text-accent font-medium transition-all inline-flex items-center gap-1 hover:gap-2"
            >
              View All →
            </button>
          )}
        </div>
      )}

      <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
        {displayProducts.map((product) => (
          <ProductCard
            key={product.productId}
            {...product}
            onAddToCart={handleAddToCart}
            onWishlist={handleWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGridContainer;