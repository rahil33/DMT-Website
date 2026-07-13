// js/utils/api.js
// Backend API integration for contact form

const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

async function saveContact(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || 'Something went wrong' };
    }

    return { data: result };

  } catch (err) {
    return { error: err.message };
  }
}

window.saveContact = saveContact;