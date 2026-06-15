"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setMessage('Please fill in all required fields');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h3>
      <p className="text-gray-500 text-sm mb-6">
        Have questions? Fill out the form and well get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name Field */}
          <motion.div
            whileFocus="focus"
            variants={inputVariants}
            className="relative"
          >
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name *"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            whileFocus="focus"
            variants={inputVariants}
            className="relative"
          >
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email *"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </motion.div>
        </div>

        {/* Subject Field */}
        <motion.div
          whileFocus="focus"
          variants={inputVariants}
          className="relative"
        >
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none bg-white cursor-pointer"
          >
            <option value="">Select Subject</option>
            <option value="general">General Inquiry</option>
            <option value="order">Order Related</option>
            <option value="product">Product Information</option>
            <option value="return">Return & Refund</option>
            <option value="partnership">Partnership</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>

        {/* Message Field */}
        <motion.div
          whileFocus="focus"
          variants={inputVariants}
          className="relative"
        >
          <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message *"
            rows={5}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
        </motion.div>

        {/* Status Message */}
        <AnimatePresence>
          {status !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center gap-2 p-3 rounded-lg ${
                status === 'success' ? 'bg-green-50 text-green-600' :
                status === 'error' ? 'bg-red-50 text-red-600' :
                'bg-blue-50 text-blue-600'
              }`}
            >
              {status === 'success' ? <FiCheck /> : status === 'error' ? <FiAlertCircle /> : <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
              <span className="text-sm">{message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <FiSend />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;