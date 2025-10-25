import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const NewDossierCard = ({ onClick }) => (
  <motion.div
    onClick={onClick}
    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-all duration-300 p-8 text-center hover:border-accent hover:bg-white"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    role="button"
    aria-label="Create a new legal dossier"
  >
    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-accent text-white mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </div>
    <h3 className="text-lg font-bold text-primary mb-2">New Legal Dossier</h3>
    <p className="text-muted text-sm">
      Upload a file to get started.
    </p>
  </motion.div>
);

export default NewDossierCard;