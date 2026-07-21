// backend/src/routes/newsletterRoutes.js
// Newsletter subscription API routes

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getAllSubscribers,
} = require('../controllers/newsletterController');
const { newsletterLimiter } = require('../middleware/rateLimiter');

const newsletterValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email cannot exceed 255 characters'),
];

router.post('/subscribe', newsletterLimiter, newsletterValidation, subscribeNewsletter);
router.post('/unsubscribe', newsletterLimiter, newsletterValidation, unsubscribeNewsletter);
router.get('/subscribers', getAllSubscribers);

module.exports = router;