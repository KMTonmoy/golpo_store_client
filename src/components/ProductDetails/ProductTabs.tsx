// components/ProductDetails/ProductTabs.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { ProductTabsProps } from '@/types/roductDetails.types';
 
const ProductTabs = ({ product, activeTab, onTabChange }: ProductTabsProps) => {
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'features', label: 'Features' },
    { id: 'specifications', label: 'Specifications' }
  ] as const;

  return (
    <div className="mt-12 bg-white rounded-2xl shadow overflow-hidden">
      {/* Tab Headers */}
      <div className="flex gap-8 border-b px-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 font-semibold capitalize relative whitespace-nowrap ${
              activeTab === tab.id ? 'text-primary' : 'text-gray-600 hover:text-primary'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Product Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "No description available for this product."}
            </p>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Key Features</h3>
            {product.features && product.features.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No features listed for this product.</p>
            )}
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === 'specifications' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Technical Specifications</h3>
            {product.specifications && Object.keys(product.specifications).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">{key}:</span>
                    <span className="text-gray-600">{String(value)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specifications available for this product.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;