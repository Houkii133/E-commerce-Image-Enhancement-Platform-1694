import React from 'react';
import { motion } from 'framer-motion';
import ImageProcessor from '../components/Processing/ImageProcessor';
import useStore from '../store/useStore';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiImage, FiUpload } = FiIcons;

const ProcessingView = () => {
  const { images, selectedImage, selectImage } = useStore();
  
  // If no image is selected and we have images, select the first one
  React.useEffect(() => {
    if (!selectedImage && images.length > 0) {
      selectImage(images[0]);
    }
  }, [images, selectedImage, selectImage]);

  if (!selectedImage) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6">
        <SafeIcon icon={FiImage} className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No Image Selected
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
          Upload an image or select one from your gallery to start enhancing it for your e-commerce store.
        </p>
        <button
          onClick={() => window.location.hash = '#/upload'}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <SafeIcon icon={FiUpload} className="w-4 h-4 mr-2" />
          <span>Upload Images</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Enhance Your Image
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Apply professional enhancements to make your product images stand out
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ImageProcessor image={selectedImage} />
      </motion.div>
    </div>
  );
};

export default ProcessingView;