import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/AuthContext";
import { Home, FileText, Users, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const authUser = useAuthStore((s) => s.user) || {};
  const logout = useAuthStore((s) => s.logout);

  const navLinks = [
    { name: 'Dashboard', path: '/home', icon: Home },
    { name: 'Legal Desks', path: '/home?feature=chatpdf', icon: FileText },
    { name: 'Find Lawyers', path: '/find-lawyer', icon: Users, role: 'helpseeker' },
    { name: 'Become a Lawyer', path: '/onboard-lawyer', icon: Users, role: 'lawyer', onboarded: false },
    { name: 'Requests', path: '/lawyer/requests', icon: Users, role: 'lawyer' },
  ];

  const filteredNavLinks = navLinks.filter(link => {
    if (!link.role) return true;
    if (link.role === authUser.role) {
      if (link.onboarded === false) {
        return !authUser.onboarded;
      }
      return true;
    }
    return false;
  });

  return (
    <aside className="w-64 border-r border-border flex flex-col p-6 bg-surface">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent text-accent-text shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-primary">Legal SahAI</h1>
          <p className="text-xs text-secondary">AI Legal Assistant</p>
        </div>
      </div>

      <nav className="flex-grow">
        <ul>
          {filteredNavLinks.map(link => (
            <li key={link.name}>
              <a
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.path);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-md text-secondary hover:bg-gray-100 hover:text-primary transition-colors"
              >
                <link.icon size={20} />
                <span>{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={authUser?.picture || `https://avatar.vercel.sh/${authUser?._id || 'guest'}.png`}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-primary">{authUser?.name || 'Guest'}</p>
            <p className="text-xs text-secondary">{authUser?.role}</p>
          </div>
        </div>
        <motion.button
          onClick={() => { logout(); navigate('/login'); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-secondary hover:bg-red-50 hover:text-red-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </motion.button>
      </div>
    </aside>
  );
};

export default Sidebar;