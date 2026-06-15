"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

const FooterNewsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    
    setTimeout(() => {
      setStatus('success');
      setMessage('Subscribed successfully!');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-200 mb-4">Newsletter</h3>
      <p className="text-gray-400 text-sm mb-4">
        Subscribe to get exclusive offers and updates
      </p>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full pl-10 pr-12 py-3 border border-gray-700 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-gray-800 text-white placeholder:text-gray-500"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={status === 'loading'}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-1.5 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {status === 'loading' ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiSend className="text-sm" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {status !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-2 text-sm flex items-center gap-1 ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {status === 'success' ? <FiCheck /> : <FiAlertCircle />}
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <p className="text-xs text-gray-500 mt-3">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
};

export default FooterNewsletter;