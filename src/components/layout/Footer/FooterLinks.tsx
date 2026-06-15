import Link from 'next/link';
import React from 'react';

const FooterLinks = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Quick Links Section */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-200 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent">
          Quick Links
        </h4>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
              Products
            </Link>
          </li>
          <li>
            <Link href="/categories" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/offers" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
              Offers
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
              Blog
            </Link>
          </li>
        </ul>
      </div>

      {/* Support Section */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-200 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent">
          Support
        </h4>
        <ul className="space-y-2">
          <li>
            <Link href="/faq" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="/shipping" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
              Shipping Info
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterLinks;