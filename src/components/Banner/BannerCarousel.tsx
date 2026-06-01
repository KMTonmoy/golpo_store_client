"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Slide from './Slide';
import BannerContent from './BannerContent';
import NavigationArrows from './NavigationArrows';
import DotsNavigation from './DotsNavigation';
import { Banner, CarouselSettings } from '@/types/banner.types';
import bannerData from '../../../public/data/banner.json';

const BannerCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [settings, setSettings] = useState<CarouselSettings>({
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    showDots: true,
    showArrows: true,
    infinite: true,
    speed: 500
  });
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Load banner data from JSON - using useRef to avoid initial render issues
  useEffect(() => {
    if (isInitialMount.current) {
      setBanners(bannerData.banners);
      setSettings(bannerData.settings);
      isInitialMount.current = false;
    }
  }, []);

  // Define functions before they're used in effects
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (settings.infinite && banners.length > 0) {
        return (prev + 1) % banners.length;
      }
      return Math.min(prev + 1, banners.length - 1);
    });
  }, [banners.length, settings.infinite]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (settings.infinite && banners.length > 0) {
        return prev === 0 ? banners.length - 1 : prev - 1;
      }
      return Math.max(prev - 1, 0);
    });
  }, [banners.length, settings.infinite]);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, settings.autoplaySpeed);
  }, [nextSlide, settings.autoplaySpeed]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Autoplay effect
  useEffect(() => {
    if (settings.autoplay && !isHovered && banners.length > 0) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [currentIndex, settings.autoplay, isHovered, banners.length, startAutoplay, stopAutoplay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="w-full flex justify-center items-center">
      <div 
        className="relative w-full max-w-7xl overflow-hidden rounded-2xl shadow-2xl"
        onMouseEnter={() => settings.pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => settings.pauseOnHover && setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Banner Container */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <AnimatePresence mode="wait">
            <Slide banner={currentBanner} isActive={true} />
          </AnimatePresence>

          {/* Content */}
          <BannerContent banner={currentBanner} />

          {/* Navigation Arrows */}
          <NavigationArrows 
            onPrev={prevSlide}
            onNext={nextSlide}
            showArrows={settings.showArrows && banners.length > 1}
          />

          {/* Dots Navigation */}
          <DotsNavigation 
            total={banners.length}
            currentIndex={currentIndex}
            onDotClick={goToSlide}
            showDots={settings.showDots}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;