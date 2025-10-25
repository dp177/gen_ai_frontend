import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
	return (
		<motion.footer
			className="w-full border-t border-gray-200 dark:border-gray-700 mt-auto py-6 text-center bg-surface"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.5 }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					className="flex items-center justify-center gap-2 text-sm text-muted"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.6 }}
				>
					<span>© {new Date().getFullYear()} Legal SahAI.</span>
					<span>Made with</span>
					<motion.div
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
					>
						<Heart size={16} className="text-red-500 fill-current" />
					</motion.div>
					<span>for justice</span>
				</motion.div>
				<motion.div
					className="mt-2 flex items-center justify-center gap-4 text-xs text-muted"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.7 }}
				>
					<motion.a
						href="#"
						className="hover:text-primary transition-colors"
						whileHover={{ scale: 1.05 }}
					>
						Privacy Policy
					</motion.a>
					<span>•</span>
					<motion.a
						href="#"
						className="hover:text-primary transition-colors"
						whileHover={{ scale: 1.05 }}
					>
						Terms of Service
					</motion.a>
					<span>•</span>
					<motion.a
						href="#"
						className="hover:text-primary transition-colors"
						whileHover={{ scale: 1.05 }}
					>
						Contact Us
					</motion.a>
				</motion.div>
			</div>
		</motion.footer>
	);
};

export default Footer;
