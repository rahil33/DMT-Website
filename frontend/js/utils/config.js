// js/utils/config.js
// Environment configuration loader
// This file is replaced during build/deployment with actual environment variables

(function() {
  // In production, this will be replaced by build process or server-side injection
  // For development, default to localhost
  window.__ENV__ = {
    VITE_API_URL: (typeof process !== 'undefined' && process.env?.VITE_API_URL) || 
                  'http://localhost:5000/api'
  };
})();