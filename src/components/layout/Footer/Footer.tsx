"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    FiMapPin,
    FiPhone,
    FiMail,
    FiClock,
    FiAward,
    FiTruck,
    FiShield,
    FiRefreshCw
} from 'react-icons/fi';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import FooterSocial from './FooterSocial';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const aboutLinks = [
        { name: "About GolpoStore", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Blog", href: "/blog" },
    ];

    const helpLinks = [
        { name: "Help Center", href: "/help" },
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
        { name: "Track Order", href: "/track-order" },
    ];

    const policyLinks = [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Return Policy", href: "/returns" },
        { name: "Shipping Info", href: "/shipping" },
    ];

    const features = [
        { icon: FiTruck, text: "Free Shipping", sub: "On orders over ৳999" },
        { icon: FiRefreshCw, text: "Easy Returns", sub: "30-day return policy" },
        { icon: FiShield, text: "Secure Payment", sub: "100% secure transactions" },
        { icon: FiAward, text: "Quality Guarantee", sub: "Premium products" },
    ];

    return (
        <footer className="bg-gray-900 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
            {/* Features Section */}
            <div className="border-b border-gray-800">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                    <feature.icon className="text-xl" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-200 text-sm">{feature.text}</p>
                                    <p className="text-xs text-gray-400">{feature.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* About / Contact Info */}
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                GolpoStore
                            </h2>
                        </Link>
                        <p className="text-gray-400 text-sm mb-4">
                            Your one-stop destination for quality products at affordable prices.
                        </p>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <FiMapPin className="text-primary" />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <FiPhone className="text-primary" />
                                <span>+880 1234 567890</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <FiMail className="text-primary" />
                                <span>support@golpostore.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <FiClock className="text-primary" />
                                <span>Mon-Sat: 9AM - 9PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <FooterLinks title="About" links={aboutLinks} />

                    {/* Help & Support */}
                    <FooterLinks title="Help & Support" links={helpLinks} />

                    {/* Policies */}
                    <FooterLinks title="Policies" links={policyLinks} />
                </div>

                {/* Newsletter & Social Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-800">
                    <FooterNewsletter />
                    <FooterSocial />
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-800 bg-gray-950/50">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-6">
                    <div className="flex justify-center">
                        <p className="text-gray-500 text-sm">
                            &copy; {currentYear} GolpoStore. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;