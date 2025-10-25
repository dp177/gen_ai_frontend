import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu } from 'lucide-react';
import useAuthStore from '../context/AuthContext';

const Header = () => {
	const authUser = useAuthStore((s) => s.user);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<motion.header
			className={`w-full fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
				scrolled ? 'glass-effect border-b border-gray-200 dark:border-gray-700' : 'bg-transparent'
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: 'spring', stiffness: 100, damping: 20 }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<motion.div
						className="flex items-center gap-6"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.1 }}
					>
						<div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => window.location.href = '/home'}>
							<motion.div
								className="w-10 h-10 rounded-xl flex items-center justify-center gradient-bg shadow-medium"
								whileHover={{ scale: 1.05, rotate: 5 }}
								whileTap={{ scale: 0.95 }}
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
								</svg>
							</motion.div>
							<div className="leading-tight">
								<div className="text-base font-bold gradient-text">Legal SahAI</div>
								<div className="text-xs text-muted">AI Legal Assistant</div>
							</div>
						</div>

						<motion.div
							className="hidden md:flex items-center bg-surface border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-soft hover:shadow-medium transition-all"
							whileHover={{ scale: 1.02 }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
						>
							<Search size={16} className="mr-3 text-gray-400" />
							<input
								type="text"
								placeholder="Search Legal Desks, clauses, files..."
								className="bg-transparent text-sm text-primary placeholder:text-muted outline-none w-64"
							/>
						</motion.div>
					</motion.div>

					<motion.div
						className="flex items-center gap-4"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.1 }}
					>
						<div className="hidden md:flex items-center gap-2">
							<motion.button
								className="px-4 py-2 rounded-lg text-sm text-muted hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.95 }}
							>
								Docs
							</motion.button>
							<motion.button
								className="px-4 py-2 rounded-lg text-sm text-muted hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.95 }}
							>
								Templates
							</motion.button>
							<motion.button
								className="px-4 py-2 rounded-lg text-sm text-muted hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.95 }}
							>
								Help
							</motion.button>
						</div>

						{authUser ? (
							<motion.div
								className="flex items-center gap-3 select-none"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.2 }}
							>
								<div className="text-right hidden sm:block">
									<div className="text-sm font-semibold text-primary">{authUser.name}</div>
									<div className="text-xs text-muted">{authUser.role === 'lawyer' ? 'Lawyer' : 'Help Seeker'}</div>
								</div>
								<motion.img
									src={authUser.picture || `https://avatar.vercel.sh/${authUser._id || 'guest'}.png`}
									alt="profile"
									className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-medium cursor-pointer"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
								/>
							</motion.div>
						) : (
							<motion.a
								href="/login"
								className="px-6 py-2 rounded-lg gradient-bg text-white text-sm font-semibold shadow-medium hover:shadow-large transition-all"
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
							>
								Sign in
							</motion.a>
						)}
					</motion.div>
				</div>
			</div>
		</motion.header>
	);
};

export default Header;
