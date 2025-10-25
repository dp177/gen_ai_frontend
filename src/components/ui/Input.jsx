import React from 'react';

const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full p-3 border border-border rounded-md bg-surface text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
      {...props}
    />
  );
};

export default Input;