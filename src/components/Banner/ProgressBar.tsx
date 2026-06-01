"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  autoplay: boolean;
  autoplaySpeed: number;
  currentIndex: number;
}

const ProgressBar = ({ autoplay, autoplaySpeed, currentIndex }: ProgressBarProps) => {
  if (!autoplay) return null;

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-white/50 z-10"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: autoplaySpeed / 1000, ease: "linear" }}
      key={currentIndex}
    />
  );
};

export default ProgressBar;