// js/components/cta.js
// Contact form — validates and submits to backend API

const form = document.getElementById('contactForm');
const msg = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

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
    msg.style.color = '#e74c3c';
    msg.textContent = errors[0];
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  msg.textContent = '';

  try {
    const result = await window.saveContact(formData);

    if (result.error) {
      msg.style.color = '#e74c3c';
      msg.textContent = result.error;
    } else {
      form.reset();
      msg.style.color = '#27ae60';
      msg.textContent = 'Thank you! We\'ll get back to you within 24 hours.';
    }
  } catch (err) {
    msg.style.color = '#e74c3c';
    msg.textContent = 'Something went wrong. Please try again or email us directly.';
  }

  submitBtn.textContent = originalBtnText;
  submitBtn.disabled = false;
}