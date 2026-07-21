// backend/src/models/Newsletter.js
// Newsletter subscription model

const mongoose = require('mongoose');
const validator = require('validator');

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email address',
      },
    },
    status: {
      type: String,
      enum: ['subscribed', 'unsubscribed', 'bounced'],
      default: 'subscribed',
    },
    source: {
      type: String,
      enum: ['website', 'contact_form', 'manual', 'other'],
      default: 'website',
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for faster queries
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ status: 1 });
newsletterSchema.index({ createdAt: -1 });

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;