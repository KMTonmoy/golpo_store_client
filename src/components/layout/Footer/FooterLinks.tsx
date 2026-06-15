import Link from 'next/link';
import React from 'react';

interface FooterLinksProps {
  title?: string;
  links?: { name: string; href: string; }[];
}

const FooterLinks = ({ title, links }: FooterLinksProps) => {
  // Default links if none provided
  const defaultLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Offers", href: "/offers" },
    { name: "Blog", href: "/blog" },
  ];

  const displayLinks = links || defaultLinks;
  const displayTitle = title || "Quick Links";

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-200 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent">
        {displayTitle}
      </h4>
      <ul className="space-y-2">
        {displayLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;