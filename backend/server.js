// backend/server.js
// Main Express server entry point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const connectDB = require('./src/config/database');
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const { apiLimiter, contactLimiter } = require('./src/middleware/rateLimiter');
const contactRoutes = require('./src/routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5500',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Request logging
app.use(logger);

// API Rate limiting
app.use('/api', apiLimiter);

// API Routes
app.use('/api/contact', contactLimiter, contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DMT API is running',
    timestamp: new Date().toISOString(),
  });
});

// Serve static files from frontend (optional - for production)
app.use(express.static(path.join(__dirname, '../frontend')));

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.',
  });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('  DMT WEBSITE SERVER');
  console.log('═══════════════════════════════════════');
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5500'}`);
  console.log('═══════════════════════════════════════');
  console.log('');
});

module.exports = app;