import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import useStore from '../../store/useStore';
import ProcessingPanel from './ProcessingPanel';
import PreviewPanel from './PreviewPanel';

const { FiArrowLeft, FiSave, FiRotateCw, FiUndo, FiRedo } = FiIcons;

const ImageEditor = () => {
  const { selectedImage, selectImage } = useStore();
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  if (!selectedImage) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
        <SafeIcon icon={FiRotateCw} className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">No image selected</p>
        <p className="text-sm">Select an image from the gallery to start editing</p>
      </div>
    );
  }

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => selectImage(null)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedImage.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedImage.metadata.width} × {selectedImage.metadata.height} • {selectedImage.metadata.format.toUpperCase()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            disabled={!canUndo}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <SafeIcon icon={FiUndo} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            disabled={!canRedo}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <SafeIcon icon={FiRedo} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Processing Panel */}
        <div className="w-80 border-r border-gray-200 dark:border-dark-700 overflow-y-auto">
          <ProcessingPanel image={selectedImage} />
        </div>
        
        {/* Preview Panel */}
        <div className="flex-1">
          <PreviewPanel image={selectedImage} />
        </div>
      </div>
    </motion.div>
  );
};

export default ImageEditor;