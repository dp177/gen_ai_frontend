import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const LegalDeskCard = ({ chat, onOpen, onDelete }) => (
  <motion.div
    key={chat._id}
    className="relative group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
    whileHover={{ y: -5 }}
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="p-5 flex-grow">
      <h2 className="font-bold text-lg text-primary truncate">{chat.title}</h2>
      <p className="text-sm text-muted mt-2">
        Created on: {new Date(chat.createdAt).toLocaleDateString()}
      </p>
    </div>
    <div className="p-5 border-t border-gray-100 flex justify-between items-center">
      <Button
        variant="primary"
        onClick={() => onOpen(chat._id)}
        className="text-sm px-4 py-2"
        aria-label={`Open ${chat.title}`}
      >
        Open
      </Button>
      <motion.button
        onClick={() => onDelete(chat._id)}
        className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-100 transition-all"
        title="Delete Legal Desk"
        aria-label={`Delete ${chat.title}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </motion.button>
    </div>
  </motion.div>
);

export default LegalDeskCard;