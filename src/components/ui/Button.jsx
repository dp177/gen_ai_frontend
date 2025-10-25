import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
	children,
	variant = 'primary',
	className = '',
	onClick,
	disabled = false,
	size = 'md',
	...props
}) => {
	const base = 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200';

	const variants = {
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		accent: 'btn-accent',
		ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
		outline: 'border-2 border-current bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400'
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-5 py-2.5 text-sm',
		lg: 'px-6 py-3 text-base',
	};

	const cls = `${base} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`;

	return (
		<motion.button
			className={cls}
			onClick={onClick}
			disabled={disabled}
			whileHover={{ scale: disabled ? 1 : 1.02 }}
			whileTap={{ scale: disabled ? 1 : 0.98 }}
			{...props}
		>
			{children}
		</motion.button>
	);
};

export default Button;
