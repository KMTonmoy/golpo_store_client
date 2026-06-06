"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface DotsNavigationProps {
  total: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  showDots: boolean;
}

const DotsNavigation = ({ total, currentIndex, onDotClick, showDots }: DotsNavigationProps) => {
  if (!showDots || total <= 1) return null;

  return (
    <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDotClick(index)}
          className={`transition-all duration-300 ${
            currentIndex === index
              ? 'w-8 md:w-10 h-2 bg-white'
              : 'w-2 h-2 bg-white/50 hover:bg-white/70'
          } rounded-full`}
        />
      ))}
    </div>
  );
};

export default DotsNavigation;