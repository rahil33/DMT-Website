// js/components/newsletter.js
// Newsletter subscription form handler

const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMessage');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  
  const newsletterEmail = document.getElementById('newsletterEmail');
  if (newsletterEmail) {
    newsletterEmail.addEventListener('blur', () => validateEmailField(newsletterEmail));
    newsletterEmail.addEventListener('input', () => clearEmailError(newsletterEmail));
  }
}

function validateEmailField(field) {
  const value = field.value.trim();
  
  if (!value) {
    field.style.borderColor = '#e74c3c';
    field.setAttribute('aria-invalid', 'true');
    return false;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    field.style.borderColor = '#e74c3c';
    field.setAttribute('aria-invalid', 'true');
    return false;
  }
  
  clearEmailError(field);
  return true;
}

function clearEmailError(field) {
  field.style.borderColor = '';
  field.removeAttribute('aria-invalid');
}

function showNewsletterSuccess(message) {
  newsletterMsg.style.color = '#27ae60';
  newsletterMsg.textContent = message;
  newsletterMsg.setAttribute('aria-live', 'polite');
}

function showNewsletterError(message) {
  newsletterMsg.style.color = '#e74c3c';
  newsletterMsg.textContent = message;
  newsletterMsg.setAttribute('aria-live', 'assertive');
}

async function handleNewsletterSubmit(e) {
  e.preventDefault();
  
  newsletterMsg.textContent = '';
  
  const email = document.getElementById('newsletterEmail')?.value.trim();
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showNewsletterError('Please enter a valid email address');
    return;
  }
  
  const submitBtn = newsletterForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  
  submitBtn.textContent = 'Subscribing...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  
  try {
    const response = await fetch(`${window.API_BASE_URL || 'http://localhost:5000/api'}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      showNewsletterError(result.message || 'Subscription failed');
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      return;
    }
    
    showNewsletterSuccess(result.message || 'Thank you for subscribing!');
    newsletterForm.reset();
    
    setTimeout(() => {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }, 3000);
    
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    showNewsletterError('Something went wrong. Please try again or email us directly.');
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }
}