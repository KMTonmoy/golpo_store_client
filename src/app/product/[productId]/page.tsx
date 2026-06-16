// app/product/[productId]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import Breadcrumb from '@/components/ProductDetails/Breadcrumb';
import ProductImageGallery from '@/components/ProductDetails/ProductImageGallery';
import ProductInfo from '@/components/ProductDetails/ProductInfo';
import ProductTabs from '@/components/ProductDetails/ProductTabs';
import LoadingSpinner from '@/components/ProductDetails/LoadingSpinner';
import ErrorDisplay from '@/components/ProductDetails/ErrorDisplay';
import { Product } from '@/types/product.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiErrorResponse {
  success: boolean;
  error: string;
}

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = (params?.productId || params?.id) as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'specifications'>('description');

  // Fetch product by _id from API
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("No product ID provided");
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const response = await axios.get<{ success: boolean; product: Product }>(
          `${API_URL}/api/products/${productId}`
        );
        
        if (response.data.success) {
          const productData = response.data.product;
          setProduct(productData);
          if (productData.colors?.length) {
            setSelectedColor(productData.colors[0]);
          }
          if (productData.sizes?.length) {
            setSelectedSize(productData.sizes[0]);
          }
        } else {
          setError("Product not found");
        }
      } catch (err: AxiosError | Error | unknown) {
        console.error("Error fetching product:", err);
        if (axios.isAxiosError(err) && err.response?.data) {
          const errorData = err.response.data as ApiErrorResponse;
          setError(errorData.error || "Failed to load product");
        } else {
          setError("Failed to load product");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const discount = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const isInStock = product?.quantity ? product.quantity > 0 : false;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (!product) return;
    if (type === 'increment' && quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log("Add to cart:", { productId, quantity, selectedColor, selectedSize });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const nextImage = () => {
    if (product?.images) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error || !product) return <ErrorDisplay error={error || "Product not found"} productId={productId} />;

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumb productName={product.name} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProductImageGallery
              images={product.images || []}
              productName={product.name}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              onPrevImage={prevImage}
              onNextImage={nextImage}
            />

            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
              isWishlisted={isWishlisted}
              isInStock={isInStock}
              discount={discount}
              formatPrice={formatPrice}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onWishlist={handleWishlist}
              onShare={handleShare}
            />
          </div>

          <ProductTabs
            product={product}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;