import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
	children,
	className = '',
	hover = true,
	onClick,
	...props
}) => {
	const baseClasses = 'card bg-surface p-6 rounded-lg';
	const hoverClasses = hover ? 'hover-lift cursor-pointer' : '';

	return (
		<motion.div
			className={`${baseClasses} ${hoverClasses} ${className}`}
			onClick={onClick}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			{...props}
		>
			{children}
		</motion.div>
	);
};

export default Card;
