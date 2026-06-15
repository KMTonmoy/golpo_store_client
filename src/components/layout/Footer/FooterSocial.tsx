"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiYoutube,
  FiGithub
} from 'react-icons/fi';

interface SocialLink {
  name: string;
  icon: React.ElementType;
  href: string;
  color: string;
  bgHover: string;
}

const socialLinks: SocialLink[] = [
  { name: "Facebook", icon: FiFacebook, href: "https://facebook.com", color: "hover:text-[#1877F2]", bgHover: "hover:bg-white/10" },
  { name: "Twitter", icon: FiTwitter, href: "https://twitter.com", color: "hover:text-[#1DA1F2]", bgHover: "hover:bg-white/10" },
  { name: "Instagram", icon: FiInstagram, href: "https://instagram.com", color: "hover:text-[#E4405F]", bgHover: "hover:bg-white/10" },
  { name: "LinkedIn", icon: FiLinkedin, href: "https://linkedin.com", color: "hover:text-[#0A66C2]", bgHover: "hover:bg-white/10" },
  { name: "YouTube", icon: FiYoutube, href: "https://youtube.com", color: "hover:text-[#FF0000]", bgHover: "hover:bg-white/10" },
  { name: "GitHub", icon: FiGithub, href: "https://github.com", color: "hover:text-white", bgHover: "hover:bg-white/10" },
];

interface FooterSocialProps {
  title?: string;
}

const FooterSocial = ({ title = "Follow Us" }: FooterSocialProps) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-200 mb-4">{title}</h3>
      <div className="flex gap-3 flex-wrap">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center transition-all duration-300 ${social.bgHover} ${social.color} hover:scale-110`}
          >
            <social.icon className="text-lg" />
          </motion.a>
        ))}
      </div>
      
      {/* Contact Info with Orange Accent */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="space-y-2">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <span className="text-primary">📞</span> +880 1234 567890
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <span className="text-primary">✉️</span> support@golpostore.com
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <span className="text-primary">📍</span> Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterSocial;