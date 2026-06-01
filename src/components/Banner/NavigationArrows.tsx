"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  showArrows: boolean;
}

const NavigationArrows = ({ onPrev, onNext, showArrows }: NavigationArrowsProps) => {
  if (!showArrows) return null;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        className="absolute right-20 md:right-20 bottom-2 -translate-y-1/2 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white p-2 md:p-3 rounded-full transition-all z-10"
      >
        <FiChevronLeft className="text-xl md:text-2xl" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="absolute right-7 md:right-7 bottom-2 -translate-y-1/2 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white p-2 md:p-3 rounded-full transition-all z-10"
      >
        <FiChevronRight className="text-xl md:text-2xl" />
      </motion.button>
    </>
  );
};

export default NavigationArrows;