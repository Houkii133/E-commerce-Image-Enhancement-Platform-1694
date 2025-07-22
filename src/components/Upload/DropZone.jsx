import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import useStore from '../../store/useStore';
import { validateFile, createImageFromFile, getImageDimensions } from '../../utils/fileUtils';
import toast from 'react-hot-toast';

const { FiUpload, FiImage, FiX } = FiIcons;

const DropZone = () => {
  const { addImages, settings } = useStore();
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach(error => {
        toast.error(`${file.name}: ${error.message}`);
      });
    });

    // Process accepted files
    const validImages = [];
    for (const file of acceptedFiles) {
      const validation = validateFile(file, settings.maxFileSize, settings.supportedFormats);
      if (validation.isValid) {
        const imageData = createImageFromFile(file);
        try {
          const dimensions = await getImageDimensions(file);
          imageData.metadata.width = dimensions.width;
          imageData.metadata.height = dimensions.height;
        } catch (error) {
          console.warn('Could not get image dimensions:', error);
        }
        validImages.push(imageData);
      } else {
        validation.errors.forEach(error => {
          toast.error(`${file.name}: ${error}`);
        });
      }
    }
    
    if (validImages.length > 0) {
      addImages(validImages);
      toast.success(`Successfully uploaded ${validImages.length} image(s)`);
    }
  }, [addImages, settings]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.heic']
    },
    maxSize: settings.maxFileSize,
    multiple: true,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300
          ${isDragActive && !isDragReject ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/10' : 
            isDragReject ? 'border-red-400 bg-red-50 dark:bg-red-900/10' : 
            'border-gray-300 dark:border-dark-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700/50'}
        `}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center
            ${isDragActive && !isDragReject ? 'bg-primary-100 dark:bg-primary-900/30' : 
              isDragReject ? 'bg-red-100 dark:bg-red-900/30' : 'bg-gray-100 dark:bg-dark-700'}`}>
            <SafeIcon
              icon={isDragReject ? FiX : isDragActive ? FiImage : FiUpload}
              className={`w-8 h-8 ${isDragActive && !isDragReject ? 'text-primary-600' : 
                isDragReject ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isDragActive ? isDragReject ? 'Invalid file type' : 'Drop your images here' : 'Drop images here or click to browse'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {isDragReject ? 'Please upload valid image files' : 'Drag and drop product images for enhancement'}
            </p>
            {!isDragActive && (
              <button className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                <SafeIcon icon={FiUpload} className="w-4 h-4 mr-2" /> Choose Files
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* File Requirements */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Formats: JPG, PNG, WebP</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Max size: {settings.maxFileSize / (1024 * 1024)}MB per file</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Free tier: 10 images/day</span>
        </div>
      </div>

      {/* Demo GIF */}
      <div className="mt-8">
        <h4 className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          See how it works
        </h4>
        <div className="max-w-lg mx-auto rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <img 
            src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
            alt="Enhancement Demo"
            className="w-full h-auto"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DropZone;