"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Slide from './Slide';
import BannerContent from './BannerContent';
import NavigationArrows from './NavigationArrows';
import DotsNavigation from './DotsNavigation';
import { Banner, CarouselSettings } from '@/types/banner.types';
import bannerData from '../../../../public/data/banner.json';
import BannerSkeleton from '@/components/common/Skeleton/BannerSkeleton';

const BannerCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
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
  const [loading, setLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadBanners = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBanners(bannerData.banners);
      setSettings(bannerData.settings);
      setLoading(false);
    };
    loadBanners();
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => {
      if (settings.infinite && banners.length > 0) {
        return (prev + 1) % banners.length;
      }
      return Math.min(prev + 1, banners.length - 1);
    });
  }, [banners.length, settings.infinite]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
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

  useEffect(() => {
    if (!loading && settings.autoplay && !isHovered && banners.length > 0) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [currentIndex, settings.autoplay, isHovered, banners.length, startAutoplay, stopAutoplay, loading]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
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

  // ✅ FIXED: Properly typed slide animation variants
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    })
  };

  // ✅ FIXED: Properly typed content animation variants
  const contentVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  if (loading) {
    return <BannerSkeleton />;
  }

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
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {/* Slide Background */}
              <Slide banner={currentBanner} isActive={true} />
              
              {/* Content with fade animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentIndex}`}
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative h-full"
                >
                  <BannerContent banner={currentBanner} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

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