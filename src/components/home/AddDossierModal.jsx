import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const AddDossierModal = ({
  adding,
  setAdding,
  title,
  setTitle,
  file,
  setFile,
  handleDragOver,
  handleDrop,
  handleAddlegaldesk,
  uploading,
}) => (
  <AnimatePresence>
    {adding && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => {
            setAdding(false);
            setFile(null);
            setTitle('');
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary">Create New Legal Dossier</h2>
            <button
              onClick={() => {
                setAdding(false);
                setFile(null);
                setTitle('');
              }}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary mb-2">Dossier Title</label>
              <input
                type="text"
                placeholder="e.g., 'NDA Review - Project Alpha'"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <motion.div
              className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer transition-colors hover:border-accent hover:bg-gray-50"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload').click()}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </motion.div>
              <p className="mt-4 text-lg font-semibold text-primary">Upload Legal Document</p>
              <p className="text-sm text-muted mt-1">Drag & drop or click to browse.</p>
              <input id="file-upload" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            </motion.div>

            {file && (
              <div className="mt-4 p-4 rounded-md flex items-center justify-between bg-green-50 border border-green-200">
                <p className="font-medium text-sm text-green-800">Selected File: {file.name}</p>
                <span className="text-xs font-bold text-green-600">READY</span>
              </div>
            )}

            <div className="flex justify-end mt-8 space-x-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setAdding(false);
                  setFile(null);
                  setTitle('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleAddlegaldesk}
                disabled={!title.trim() || !file || uploading}
              >
                {uploading ? 'Securing...' : 'Create Dossier'}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default AddDossierModal;