// backend/src/middleware/logger.js
// Request logging middleware

const morgan = require('morgan');

// Custom token for response time
const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => console.log(message.trim()),
    },
  }
);

module.exports = logger;