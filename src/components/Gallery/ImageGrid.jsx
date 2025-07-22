import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import useStore from '../../store/useStore';
import { formatFileSize } from '../../utils/fileUtils';

const { FiTrash2, FiEdit, FiDownload, FiEye, FiClock } = FiIcons;

const ImageGrid = () => {
  const { images, removeImage, selectImage } = useStore();

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <SafeIcon icon={FiEye} className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">No images uploaded yet</p>
        <p className="text-sm">Upload some images to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {images.map((image) => (
          <motion.div
            key={image.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image Preview */}
            <div className="aspect-square relative overflow-hidden">
              <img
                src={image.processedFile ? URL.createObjectURL(image.processedFile) : image.url}
                alt={image.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Processing Overlay */}
              {image.processing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-white">
                    <SafeIcon icon={FiClock} className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-medium">Processing...</span>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <button
                    onClick={() => selectImage(image)}
                    className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                  >
                    <SafeIcon icon={FiEdit} className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => removeImage(image.id)}
                    className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              {/* Status Badge */}
              {image.processed && (
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Processed
                  </span>
                </div>
              )}
            </div>
            
            {/* Image Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white truncate mb-1">
                {image.name}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{formatFileSize(image.size)}</span>
                <span>{image.metadata.width} × {image.metadata.height}</span>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => selectImage(image)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Edit
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ImageGrid;