// components/ProductDetails/ProductInfo.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    FiMinus, FiPlus, FiShoppingCart, FiHeart, FiShare2,
    FiTruck, FiShield, FiRefreshCw
} from 'react-icons/fi';
import { ProductInfoProps } from '@/types/roductDetails.types';
 
const ProductInfo = ({
    product,
    selectedColor,
    selectedSize,
    quantity,
    isWishlisted,
    isInStock,
    discount,
    formatPrice,
    onColorChange,
    onSizeChange,
    onQuantityChange,
    onAddToCart,
    onWishlist,
    onShare
}: ProductInfoProps) => {
    return (
        <div className="space-y-4">
            {/* Category */}
            <div className="flex gap-2 flex-wrap">
                <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                    {product.category}
                </span>
                {product.brand && (
                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                        {product.brand}
                    </span>
                )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                    <>
                        <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                        <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">-{discount}%</span>
                    </>
                )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
                {isInStock ? (
                    <>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-600 font-medium">In Stock ({product.quantity} units)</span>
                    </>
                ) : (
                    <>
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="text-red-600">Out of Stock</span>
                    </>
                )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                    <h3 className="font-semibold">Select Color</h3>
                    <div className="flex gap-3 flex-wrap">
                        {product.colors.map((color: string) => (
                            <button
                                key={color}
                                onClick={() => onColorChange(color)}
                                className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'border-primary scale-110' : 'border-gray-300 hover:border-primary'
                                    }`}
                                style={{ backgroundColor: color.toLowerCase() }}
                                title={color}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                    <h3 className="font-semibold">Select Size</h3>
                    <div className="flex gap-3 flex-wrap">
                        {product.sizes.map((size: string) => (
                            <button
                                key={size}
                                onClick={() => onSizeChange(size)}
                                className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all ${selectedSize === size ? 'bg-primary text-white border-primary' : 'border-gray-300 hover:border-primary'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
                <h3 className="font-semibold">Quantity</h3>
                <div className="flex items-center gap-3">
                    <div className="flex border rounded-lg">
                        <button
                            onClick={() => onQuantityChange('decrement')}
                            className="px-4 py-2 hover:bg-gray-100 transition"
                            disabled={quantity <= 1}
                        >
                            <FiMinus />
                        </button>
                        <span className="px-6 py-2 border-x min-w-[60px] text-center">{quantity}</span>
                        <button
                            onClick={() => onQuantityChange('increment')}
                            className="px-4 py-2 hover:bg-gray-100 transition"
                            disabled={quantity >= (product.quantity || 0)}
                        >
                            <FiPlus />
                        </button>
                    </div>
                    <span className="text-sm text-gray-500">Max {product.quantity} units</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onAddToCart}
                    disabled={!isInStock}
                    className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isInStock ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    <FiShoppingCart /> Add to Cart
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onWishlist}
                    className="p-3 rounded-xl border-2 hover:border-primary transition-all"
                >
                    <FiHeart className={`text-xl ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onShare}
                    className="p-3 rounded-xl border-2 hover:border-primary transition-all"
                >
                    <FiShare2 className="text-xl" />
                </motion.button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                    <FiTruck className="text-primary text-2xl mx-auto mb-1" />
                    <p className="text-xs font-semibold">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders over ৳999</p>
                </div>
                <div className="text-center">
                    <FiRefreshCw className="text-primary text-2xl mx-auto mb-1" />
                    <p className="text-xs font-semibold">Easy Returns</p>
                    <p className="text-xs text-gray-500">30-day policy</p>
                </div>
                <div className="text-center">
                    <FiShield className="text-primary text-2xl mx-auto mb-1" />
                    <p className="text-xs font-semibold">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% secure</p>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;