import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ children, variant = 'default', className = '' }) => {
	const variants = {
		default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
		primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
		success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
		warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
		error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
	};

	return (
		<motion.span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.2 }}
		>
			{children}
		</motion.span>
	);
};

export default Badge;
