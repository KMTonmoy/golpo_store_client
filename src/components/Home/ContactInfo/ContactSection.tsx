"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageCircle, FiSend } from 'react-icons/fi';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';

const ContactSection = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4"
                    >
                        <FiMessageCircle className="text-lg" />
                        <span className="font-semibold text-sm">Get in Touch</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
                    >
                        Contact Us
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        Have questions? We love to hear from you. Send us a message and well respond as soon as possible.
                    </motion.p>
                </div>

                {/* Contact Info Cards */}
                <div className="mb-12">
                    <ContactInfo />
                </div>

                {/* Map and Form Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ContactMap />
                    <ContactForm />
                </div>

                {/* Additional Contact Options */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-500 text-sm">
                        Or reach us directly at{' '}
                        <a href="mailto:support@golpostore.com" className="text-primary font-semibold hover:underline">
                            support@golpostore.com
                        </a>
                        {' '}or call{' '}
                        <a href="tel:+8801234567890" className="text-primary font-semibold hover:underline">
                            +880 1234 567890
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;