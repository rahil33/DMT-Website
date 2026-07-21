// backend/src/middleware/sanitize.js
// Input sanitization middleware to prevent XSS and NoSQL injection

const sanitizeObject = (obj) => {
  if (typeof obj === 'string') {
    // Remove potential XSS patterns
    return obj
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '')
      .trim();
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const sanitized = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }
  
  return obj;
};

const sanitizeInput = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }
  
  next();
};

// NoSQL injection prevention
const preventNoSQLInjection = (req, res, next) => {
  const checkForNoSQL = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (key.startsWith('$') || key === 'constructor') {
            return true;
          }
          if (checkForNoSQL(obj[key])) {
            return true;
          }
        }
      }
    }
    return false;
  };
  
  if (req.body && checkForNoSQL(req.body)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input detected.',
    });
  }
  
  if (req.query && checkForNoSQL(req.query)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input detected.',
    });
  }
  
  next();
};

module.exports = { sanitizeInput, preventNoSQLInjection, sanitizeObject };