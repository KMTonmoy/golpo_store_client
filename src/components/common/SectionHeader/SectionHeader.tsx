"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  showViewAll = false, 
  viewAllLink = "/products" 
}: SectionHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      
     
    </div>
  );
};

export default SectionHeader;