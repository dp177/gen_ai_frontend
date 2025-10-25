import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, MapPin, Inbox, LogOut, ChevronRight, UserPlus } from 'lucide-react';
import useAuthStore from '../context/AuthContext';

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const authUser = useAuthStore((s) => s.user) || {};
	const logout = useAuthStore((s) => s.logout);
	const [hoveredItem, setHoveredItem] = useState(null);

	const go = (path, opts = {}) => {
		if (opts.feature) {
			navigate(`/home?feature=${opts.feature}`);
			return;
		}
		navigate(path);
	};

	const isLawyer = authUser?.role === 'lawyer';
	const isOnboarded = Boolean(authUser?.onboarded) || Boolean((authUser?.bio && authUser.bio.length > 0) || (authUser?.specialties && authUser.specialties.length > 0));

	const isActive = (path) => location.pathname === path;

	const menuItems = [
		{ label: 'Dashboard', icon: Home, path: '/home', onClick: () => go('/home') },
		{ label: 'Legal Desks', icon: FileText, path: '/home', onClick: () => go('/home', { feature: 'chatpdf' }) },
	];

	if (!isLawyer) {
		menuItems.push({ label: 'Find Lawyers', icon: MapPin, path: '/find-lawyer', onClick: () => go('/find-lawyer') });
	}

	if (isLawyer) {
		if (!isOnboarded) {
			menuItems.push({ label: 'Become a Lawyer', icon: UserPlus, path: '/onboard-lawyer', onClick: () => go('/onboard-lawyer') });
		}
		menuItems.push({ label: 'Requests', icon: Inbox, path: '/lawyer/requests', onClick: () => go('/lawyer/requests') });
	}

	return (
		<motion.aside
			className="w-72 border-r border-gray-200 dark:border-gray-700 flex flex-col py-8 px-6 flex-shrink-0 bg-surface"
			initial={{ x: -300, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 100, damping: 20 }}
		>
			<motion.div
				className="mb-10"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				<h2 className="text-2xl font-bold mb-6 tracking-tight gradient-text">Features</h2>

				<div className="space-y-2">
					{menuItems.map((item, index) => {
						const Icon = item.icon;
						const active = isActive(item.path);
						return (
							<motion.button
								key={index}
								className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all ${
									active
										? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-medium'
										: 'text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
								}`}
								onClick={item.onClick}
								onMouseEnter={() => setHoveredItem(index)}
								onMouseLeave={() => setHoveredItem(null)}
								whileHover={{ x: 4, scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.1 + index * 0.05 }}
							>
								<div className="flex items-center">
									<Icon size={20} className="mr-3" />
									<span className="text-sm">{item.label}</span>
								</div>
								<AnimatePresence>
									{(hoveredItem === index || active) && (
										<motion.div
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -10 }}
										>
											<ChevronRight size={18} />
										</motion.div>
									)}
								</AnimatePresence>
							</motion.button>
						);
					})}
				</div>
			</motion.div>

			<motion.div
				className="mt-auto flex flex-col items-center space-y-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				<motion.img
					src={authUser?.picture || `https://avatar.vercel.sh/${authUser?._id || 'guest'}.png`}
					alt="Profile"
					className="w-16 h-16 rounded-full shadow-large border-2 border-white dark:border-gray-700"
					whileHover={{ scale: 1.1, rotate: 5 }}
					transition={{ type: 'spring', stiffness: 300 }}
				/>
				<div className="text-center">
					<span className="text-lg font-semibold text-primary block">{authUser?.name || 'Guest'}</span>
					<span className="text-xs text-muted">{authUser?.email || ''}</span>
				</div>
				<motion.button
					onClick={() => {
						logout();
						navigate('/login');
					}}
					className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<LogOut size={16} />
					Logout
				</motion.button>
			</motion.div>
		</motion.aside>
	);
};

export default Sidebar;
