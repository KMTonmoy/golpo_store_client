"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiShare2, 
  FiTruck, 
  FiShield, 
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiCheck,
  FiStar
} from 'react-icons/fi';
import Link from 'next/link';

// Static product data
const productData = {
  productId: "PRD-001",
  name: "Wireless Bluetooth Headphones",
  price: 2499,
  originalPrice: 3999,
  quantity: 50,
  category: "Electronics",
  brand: "Sony",
  sku: "WH-1000XM4",
  colors: ["Black", "White", "Blue", "Red"],
  sizes: ["S", "M", "L", "XL"],
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"
  ],
  description: "Experience premium sound quality with our wireless Bluetooth headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for travel, work, or daily use.",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Bluetooth 5.0 connectivity",
    "Built-in microphone",
    "Fast charging (10 min = 5 hours playback)",
    "Foldable design for easy storage"
  ],
  specifications: {
    "Brand": "Sony",
    "Model": "WH-1000XM4",
    "Connectivity": "Bluetooth 5.0",
    "Battery Life": "30 hours",
    "Charging Time": "3 hours",
    "Weight": "254g",
    "Warranty": "1 Year"
  }
};

const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const discount = Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100);
  const isInStock = productData.quantity > 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment' && quantity < productData.quantity) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    toast.loading('Adding to cart...', {
      id: 'add-to-cart',
    });
    
    setTimeout(() => {
      toast.success(`${quantity} × ${productData.name} added to cart!`, {
        id: 'add-to-cart',
        duration: 3000,
        icon: '🛒',
        style: {
          background: '#10B981',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    }, 500);
  };

  const handleWishlist = () => {
    if (!isWishlisted) {
      setIsWishlisted(true);
      toast.success('Added to wishlist!', {
        icon: '❤️',
        duration: 2000,
        style: {
          background: '#FF6B35',
          color: '#fff',
        },
      });
    } else {
      setIsWishlisted(false);
      toast.error('Removed from wishlist', {
        icon: '💔',
        duration: 2000,
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!', {
      icon: '📋',
      duration: 2000,
      style: {
        background: '#3B82F6',
        color: '#fff',
      },
    });
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productData.images.length) % productData.images.length);
  };

  return (
    <>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">{productData.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg group">
                <div className="aspect-square relative">
                  <img
                    src={productData.images[selectedImage]}
                    alt={productData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image Navigation */}
                {productData.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FiChevronLeft className="text-gray-800 text-2xl" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FiChevronRight className="text-gray-800 text-2xl" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-primary shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Category & Brand */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                  {productData.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {productData.brand}
                </span>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  SKU: {productData.sku}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {productData.name}
              </h1>

              {/* Price Section */}
              <div className="flex items-center gap-3">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {formatPrice(productData.price)}
                </span>
                {productData.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(productData.originalPrice)}
                    </span>
                    <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-lg">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {isInStock ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-600 font-medium">In Stock</span>
                    <span className="text-gray-500 text-sm">({productData.quantity} units available)</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Color Selection */}
              {productData.colors && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Select Color</h3>
                  <div className="flex gap-3 flex-wrap">
                    {productData.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === color 
                            ? 'border-primary shadow-md scale-110' 
                            : 'border-gray-300 hover:border-primary'
                        }`}
                        style={{ 
                          backgroundColor: color.toLowerCase(),
                          boxShadow: selectedColor === color ? '0 0 0 2px white, 0 0 0 4px #FF6B35' : 'none'
                        }}
                      >
                        {selectedColor === color && (
                          <FiCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {productData.sizes && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Select Size</h3>
                  <div className="flex gap-3 flex-wrap">
                    {productData.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all ${
                          selectedSize === size
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-300 text-gray-600 hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Quantity</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange('decrement')}
                      className="p-2 hover:bg-gray-50 transition-colors px-4"
                      disabled={quantity <= 1}
                    >
                      <FiMinus className="text-gray-600" />
                    </button>
                    <span className="w-16 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      className="p-2 hover:bg-gray-50 transition-colors px-4"
                      disabled={quantity >= productData.quantity}
                    >
                      <FiPlus className="text-gray-600" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Max {productData.quantity} units
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    isInStock
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FiShoppingCart className="text-xl" />
                  Add to Cart
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlist}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isWishlisted
                      ? 'bg-red-50 border-red-500 text-red-500'
                      : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  <FiHeart className={`text-xl ${isWishlisted ? 'fill-red-500' : ''}`} />
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="p-4 rounded-xl border-2 border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-all"
                >
                  <FiShare2 className="text-xl" />
                </motion.button>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <FiTruck className="text-primary text-2xl" />
                  <div>
                    <p className="font-semibold text-sm">Free Delivery</p>
                    <p className="text-xs text-gray-500">On orders over ৳999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiRefreshCw className="text-primary text-2xl" />
                  <div>
                    <p className="font-semibold text-sm">Easy Returns</p>
                    <p className="text-xs text-gray-500">30-day return policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiShield className="text-primary text-2xl" />
                  <div>
                    <p className="font-semibold text-sm">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% secure transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex gap-8 px-6 overflow-x-auto">
                {['description', 'features', 'specifications'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 font-semibold capitalize transition-all relative ${
                      activeTab === tab
                        ? 'text-primary'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {productData.description}
                  </p>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <FiCheck className="text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                  <div className="aspect-square bg-gray-100" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Related Product {item}</h3>
                    <p className="text-primary font-bold mt-1">{formatPrice(1999)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;