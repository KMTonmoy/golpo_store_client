// components/Dashboard/MobileMenuButton.tsx
'use client';

import React from 'react';
import { FiMenu } from 'react-icons/fi';

interface MobileMenuButtonProps {
  onOpen: () => void;
}

const MobileMenuButton = ({ onOpen }: MobileMenuButtonProps) => {
  return (
    <button
      onClick={onOpen}
      className="md:hidden fixed top-4 left-4 z-50 p-2 bg-orange-600 text-white rounded-lg shadow-lg"
    >
      <FiMenu size={24} />
    </button>
  );
};

export default MobileMenuButton;