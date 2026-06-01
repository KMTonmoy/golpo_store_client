"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight, FiTruck, FiShield, FiPercent } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { Banner } from '@/types/banner.types';

interface SlideProps {
  banner: Banner;
  isActive: boolean;
}

const Slide = ({ banner, isActive }: SlideProps) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0"
    >
      {/* Background Image */}
      <picture>
        <source media="(max-width: 768px)" srcSet={banner.mobileImage} />
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </picture>
      
      {/* Hardcoded Gray/Black Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-gray-900/70 to-black/80" />
    </motion.div>
  );
};

export default Slide;