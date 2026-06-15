"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock,
  FiMessageCircle,
  FiGlobe
} from 'react-icons/fi';

interface ContactInfoProps {
  icon: React.ElementType;
  title: string;
  details: string[];
  delay?: number;
}

const ContactInfoCard = ({ icon: Icon, title, details, delay = 0 }: ContactInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-orange-500 transition-all duration-300">
        <Icon className="text-2xl" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-2">
        {details.map((detail, index) => (
          <p key={index} className="text-gray-600 text-sm flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            {detail}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: ["123 Main Street, Dhaka", "Bangladesh - 1000"]
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: ["+880 1234 567890", "+880 1987 654321"]
    },
    {
      icon: FiMail,
      title: "Email Us",
      details: ["support@golpostore.com", "info@golpostore.com"]
    },
    {
      icon: FiClock,
      title: "Working Hours",
      details: ["Saturday - Thursday: 9AM - 9PM", "Friday: Closed"]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactDetails.map((item, index) => (
        <ContactInfoCard
          key={index}
          icon={item.icon}
          title={item.title}
          details={item.details}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default ContactInfo;