import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const validateFile = (file, maxSize = 5 * 1024 * 1024, supportedFormats = ['jpg', 'jpeg', 'png', 'webp']) => {
  const errors = [];
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
  }
  
  const extension = file.name.split('.').pop().toLowerCase();
  if (!supportedFormats.includes(extension)) {
    errors.push(`Unsupported format. Supported: ${supportedFormats.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const downloadAsZip = async (files, zipName = 'enhanced-images.zip') => {
  const zip = new JSZip();
  
  for (const file of files) {
    zip.file(file.name, file.blob);
  }
  
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, zipName);
};

export const createImageFromFile = (file) => {
  return {
    id: generateUniqueId(),
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file),
    processed: false,
    processing: false,
    originalFile: file,
    processedFile: null,
    history: [],
    metadata: {
      width: 0,
      height: 0,
      format: file.type.split('/')[1],
      uploadedAt: new Date().toISOString(),
    }
  };
};

export const getImageDimensions = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.src = URL.createObjectURL(file);
  });
};