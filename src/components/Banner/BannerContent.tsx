"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight, FiTruck, FiShield, FiPercent, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import { Banner } from '@/types/banner.types';

interface BannerContentProps {
  banner: Banner;
}

const BannerContent = ({ banner }: BannerContentProps) => {
  const getFeatureIcon = (feature: string) => {
    if (feature.includes("Shipping")) return <FiTruck className="text-white text-sm" />;
    if (feature.includes("Return")) return <FiShield className="text-white text-sm" />;
    if (feature.includes("Off")) return <FiPercent className="text-white text-sm" />;
    return <div className="w-1.5 h-1.5 bg-white rounded-full opacity-70" />;
  };

  return (
    <div className="relative h-full flex items-center px-4 md:px-12 lg:px-20">
      <div className="max-w-2xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1">
            <FiClock className="text-sm" />
            {banner.badge}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-white mb-2 font-semibold"
        >
          {banner.subtitle}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          {banner.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white text-base md:text-lg mb-6 opacity-90"
        >
          {banner.description}
        </motion.p>

        

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link href={banner.buttonLink}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm md:text-base"
            >
              {banner.buttonText}
              <FiChevronRight className="text-lg" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BannerContent;