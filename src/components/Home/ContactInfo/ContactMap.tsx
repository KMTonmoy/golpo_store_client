"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiNavigation, FiZoomIn, FiZoomOut, FiMaximize, FiMinimize } from 'react-icons/fi';

const ContactMap = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(15);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 1, 21));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 1, 10));
  };

  // Updated map URL with zoom control
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.28437352528!2d90.39930445!3d23.788056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15f1b49b%3A0xe9b4b6d8e2a5e8e6!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd&z=${zoom}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : ''
      }`}
    >
      {/* Map Container */}
      <div className="relative h-[400px] w-full group">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="transition-all duration-700 group-hover:scale-105"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-primary hover:text-orange-500 transition-all duration-300"
        >
          <FiZoomIn className="text-lg" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-primary hover:text-orange-500 transition-all duration-300"
        >
          <FiZoomOut className="text-lg" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleFullscreen}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-primary hover:text-orange-500 transition-all duration-300"
        >
          {isFullscreen ? <FiMinimize className="text-lg" /> : <FiMaximize className="text-lg" />}
        </motion.button>
      </div>

      {/* Location Badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-800">Live Location</span>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute bottom-4 left-4 right-4 z-10"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center shadow-lg">
                <FiMapPin className="text-xl" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1 rounded-full bg-primary/20 -z-10"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-lg">Our Location</h3>
              <p className="text-gray-600 text-sm mt-1">123 Main Street, Dhaka, Bangladesh</p>
              
              {/* Additional Info */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-100"
                  >
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiNavigation className="text-primary" />
                        <span>2.5 km away</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span>Open until 9PM</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-3 bg-primary text-white py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                      <FiNavigation />
                      Get Directions
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Expand Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsHovered(!isHovered)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-orange-500 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isHovered ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      
      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl" />
    </motion.div>
  );
};

export default ContactMap;