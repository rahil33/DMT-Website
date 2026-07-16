// js/components/cta.js
// Contact form — validates and submits to backend API with enhanced UX

const form = document.getElementById('contactForm');
const msg = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', handleSubmit);
  
  // Add live validation on input
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
}

function validateField(field) {
  const value = field.value.trim();
  let error = null;

  if (field.name === 'name' && (!value || value.length < 2)) {
    error = 'Name must be at least 2 characters';
  } else if (field.name === 'email') {
    if (!value) {
      error = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email address';
    }
  } else if (field.name === 'message' && (!value || value.length < 10)) {
    error = 'Message must be at least 10 characters';
  } else if (field.name === 'phone' && value && !/^[\d\s+\-()]+$/.test(value)) {
    error = 'Please enter a valid phone number';
  }

  if (error) {
    field.style.borderColor = '#e74c3c';
    field.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    clearFieldError(field);
    return true;
  }
}

function clearFieldError(field) {
  field.style.borderColor = '';
  field.removeAttribute('aria-invalid');
}

function showSuccess(message) {
  msg.style.color = '#27ae60';
  msg.textContent = message;
  msg.setAttribute('aria-live', 'polite');
}

function showError(message) {
  msg.style.color = '#e74c3c';
  msg.textContent = message;
  msg.setAttribute('aria-live', 'assertive');
}

async function handleSubmit(e) {
  e.preventDefault();

  // Clear previous messages
  msg.textContent = '';

  const formData = {
    name: document.getElementById('contactName')?.value.trim(),
    company: document.getElementById('contactCompany')?.value.trim() || '',
    email: document.getElementById('contactEmail')?.value.trim(),
    phone: document.getElementById('contactPhone')?.value.trim() || '',
    service: document.getElementById('contactService')?.value.trim() || '',
    message: document.getElementById('contactMessage')?.value.trim()
  };

  // Validation
  const errors = [];
  if (!formData.name || formData.name.length < 2) {
    errors.push('Name is required (min 2 characters)');
  }
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Valid email is required');
  }
  if (!formData.message || formData.message.length < 10) {
    errors.push('Message is required (min 10 characters)');
  }

  if (errors.length > 0) {
    showError(errors[0]);
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  
  // Set loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  
  try {
    const result = await window.saveContact(formData);

    if (result.error) {
      showError(result.error);
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    } else {
      // Success - reset form
      form.reset();
      showSuccess('Thank you! We\'ll get back to you within 24 hours.');
      
      // Reset button after delay
      setTimeout(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }, 2000);
    }
  } catch (err) {
    showError('Something went wrong. Please try again or email us directly at info@dmt-technologies.com');
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }
}