import React from 'react';
import { motion } from 'framer-motion';
import useAuthStore from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const authUser = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="bg-surface border-b border-border p-4 flex justify-between items-center">
      <div className="md:hidden">
        <button onClick={onMenuClick} className="p-2 rounded-md hover:bg-gray-100">
          <Menu size={24} />
        </button>
      </div>
      <div className="hidden md:block">
        {/* Search bar can be added here */}
      </div>
      <div className="flex items-center gap-4">
        {authUser ? (
          <>
            <span className="text-secondary hidden sm:inline">{authUser.name}</span>
            <motion.button
              onClick={logout}
              className="p-2 rounded-full hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Logout"
            >
              <LogOut size={20} />
            </motion.button>
          </>
        ) : (
          <User size={20} className="text-secondary" />
        )}
      </div>
    </header>
  );
};

export default Header;