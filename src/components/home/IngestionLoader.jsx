import React from 'react';
import { motion } from 'framer-motion';

const StatusIcon = ({ status }) => {
    if (status === 'completed') {
      return <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</motion.div>;
    }
    if (status === 'in-progress') {
      return <div className="w-5 h-5 flex items-center justify-center">
        <svg className="animate-spin h-5 w-5 text-[var(--palette-3)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>;
    }
    return <div className="w-5 h-5 bg-gray-300 rounded-full" />;
  };

  const IngestionLoader = ({ steps }) => {
    const completedSteps = steps.filter(step => step.status === 'completed').length;
    const progress = (steps.length > 0) ? (completedSteps / steps.length) * 100 : 0;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-surface rounded-2xl shadow-3xl p-8 w-full max-w-md"
          style={{ borderColor: 'var(--palette-3)' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 tracking-wide font-serif">Securing Your Legal Dossier</h2>
          <p className="text-center text-gray-500 mb-6 text-sm italic">
            Your documents are being encrypted with attorney-grade confidentiality.
          </p>

            <div className="space-y-4 mb-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatusIcon status={step.status} />
                  <span className={`text-lg transition-colors duration-300 ${step.status === 'in-progress' ? 'font-medium' : step.status === 'completed' ? 'text-gray-600' : 'text-gray-400'}`} style={step.status === 'in-progress' ? { color: 'var(--palette-3)' } : {}}>
                  {step.text}
                </span>
              </motion.div>
            ))}
          </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              className="h-2.5 rounded-full"
              style={{ background: 'var(--palette-3)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  export default IngestionLoader;