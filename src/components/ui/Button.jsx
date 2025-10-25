import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-200';

  const variants = {
    primary: 'bg-accent text-accent-text hover:bg-accent-hover shadow-md',
    secondary: 'bg-surface text-primary border border-border hover:bg-gray-50 shadow-md',
    ghost: 'bg-transparent text-primary hover:bg-gray-100',
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;