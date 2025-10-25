import React from 'react';
import { motion } from 'framer-motion';

const Input = ({
	className = '',
	label,
	error,
	icon: Icon,
	...props
}) => {
	return (
		<div className="w-full">
			{label && (
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
					{label}
				</label>
			)}
			<div className="relative">
				{Icon && (
					<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
						<Icon size={18} />
					</div>
				)}
				<motion.input
					className={`input w-full text-sm text-primary placeholder:text-muted motion-safe ${
						Icon ? 'pl-10' : ''
					} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
					whileFocus={{ scale: 1.01 }}
					{...props}
				/>
			</div>
			{error && (
				<motion.p
					className="mt-1 text-sm text-red-600"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
				>
					{error}
				</motion.p>
			)}
		</div>
	);
};

export default Input;
