"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

interface Brand {
  id: number;
  name: string;
  logo: string;
}

const brands: Brand[] = [
  { id: 1, name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { id: 2, name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Samsung_old_logo_before_year_2015.svg" },
  { id: 3, name: "Nike", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWC6p65HRcgBbuKo4tmCBvu4SmRLWa94A6YA&s" },
  { id: 4, name: "Adidas", logo: "https://static.vecteezy.com/system/resources/thumbnails/014/414/689/small/adidas-new-logo-on-transparent-background-free-vector.jpg" },
  { id: 5, name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/1280px-Sony_logo.svg.png" },
  { id: 6, name: "Louis Vuitton", logo: "https://icon2.cleanpng.com/20180429/cge/avtan7y2u.webp" },
  { id: 7, name: "Dell", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU9xbvz4Wigwhcx46hw1kwYGiIlWrYTQ5Z4Q&s" },
  { id: 8, name: "Puma", logo: "https://static.vecteezy.com/system/resources/thumbnails/022/076/746/small/puma-logo-and-art-free-vector.jpg" },
  { id: 9, name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/960px-LG_logo_%282014%29.svg.png" },
  { id: 10, name: "HP", logo: "data:image/png;base64,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" },
  { id: 11, name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png" },
  { id: 12, name: "Google", logo: "https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/3:2/w_2560%2Cc_limit/google-logo.jpg" },
];

const BrandShowcase = () => {
  // Duplicate brands for seamless loop
  const marqueeBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-12   overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4"
          >
            <FiStar className="text-lg" />
            <span className="font-semibold text-sm">Trusted Brands</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Our Brand Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with worlds leading brands to bring you the best products
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          {/* Marquee Animation */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              className="flex gap-8 md:gap-12 w-max"
            >
              {marqueeBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-md flex items-center justify-center p-4 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/100x100/FF6B35/white?text=${brand.name.charAt(0)}`;
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandShowcase;