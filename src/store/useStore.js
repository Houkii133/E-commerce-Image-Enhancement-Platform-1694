import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Theme
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  // User
  user: null,
  setUser: (user) => set({ user }),

  // Images
  images: [],
  selectedImage: null,
  processingQueue: [],
  addImages: (newImages) => set((state) => {
    // Update stats when adding images
    const newStats = {
      ...state.stats,
      imagesProcessed: state.stats.imagesProcessed + newImages.length,
      storageUsed: state.stats.storageUsed + newImages.reduce((total, img) => total + img.size, 0)
    };
    
    return {
      images: [...state.images, ...newImages],
      stats: newStats
    };
  }),
  removeImage: (id) => set((state) => ({
    images: state.images.filter(img => img.id !== id),
    selectedImage: state.selectedImage?.id === id ? null : state.selectedImage
  })),
  selectImage: (image) => set({ selectedImage: image }),
  updateImage: (id, updates) => set((state) => ({
    images: state.images.map(img => img.id === id ? { ...img, ...updates } : img ),
    selectedImage: state.selectedImage?.id === id ? { ...state.selectedImage, ...updates } : state.selectedImage
  })),

  // Processing
  addToQueue: (imageId, operation) => set((state) => ({
    processingQueue: [...state.processingQueue, { imageId, operation, id: Date.now() }]
  })),
  removeFromQueue: (queueId) => set((state) => ({
    processingQueue: state.processingQueue.filter(item => item.id !== queueId)
  })),

  // Settings
  settings: {
    autoSave: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB for free tier
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    defaultQuality: 90,
    freeTierLimit: 10
  },
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),

  // Usage stats
  stats: {
    imagesProcessed: 0,
    storageUsed: 0,
    creditsUsed: 0,
    creditsRemaining: 10,
  },
  updateStats: (newStats) => set((state) => ({
    stats: { ...state.stats, ...newStats }
  })),
}));

export default useStore;