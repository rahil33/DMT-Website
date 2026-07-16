// js/utils/api.js
// Backend API integration for contact form
// Handles all communication with the backend contact API

(function() {
  'use strict';

  const API_BASE_URL = window.__ENV__?.VITE_API_URL || 'http://localhost:5000/api';

  async function saveContact(data, retryCount = 0) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name?.trim(),
          company: data.company?.trim() || '',
          email: data.email?.trim(),
          phone: data.phone?.trim() || '',
          service: data.service?.trim() || '',
          message: data.message?.trim()
        })
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: result.message || 'Something went wrong' };
      }

      return { data: result };

    } catch (err) {
      // Retry logic for network failures
      if (retryCount < 2 && (err.message.includes('fetch') || err.name === 'TypeError')) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return saveContact(data, retryCount + 1);
      }
      
      console.error('API Error:', err);
      return { error: 'Network error. Please check your connection and try again.' };
    }
  }

  // Expose to window for use in other scripts
  window.saveContact = saveContact;
  window.API_BASE_URL = API_BASE_URL;
})();