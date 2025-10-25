import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children, title, size = 'md' }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	const sizes = {
		sm: 'max-w-md',
		md: 'max-w-lg',
		lg: 'max-w-2xl',
		xl: 'max-w-4xl',
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							className={`bg-surface rounded-2xl shadow-large w-full ${sizes[size]} relative`}
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
						>
							<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
								<h2 className="text-xl font-semibold text-primary">{title}</h2>
								<button
									onClick={onClose}
									className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
								>
									<X size={24} />
								</button>
							</div>
							<div className="p-6">{children}</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Modal;
