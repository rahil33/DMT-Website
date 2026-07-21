// backend/src/controllers/newsletterController.js
// Newsletter subscription controller

const Newsletter = require('../models/Newsletter');
const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });

    if (existingSubscriber) {
      if (existingSubscriber.status === 'subscribed') {
        return res.status(400).json({
          success: false,
          message: 'You are already subscribed to our newsletter.',
        });
      } else if (existingSubscriber.status === 'unsubscribed') {
        existingSubscriber.status = 'subscribed';
        existingSubscriber.subscribedAt = Date.now();
        existingSubscriber.unsubscribedAt = null;
        existingSubscriber.ipAddress = req.ip || req.connection.remoteAddress;
        existingSubscriber.userAgent = req.get('user-agent');
        await existingSubscriber.save();

        sendWelcomeEmail(email).catch((err) => {
          console.error('Failed to send welcome email:', err.message);
        });

        return res.status(200).json({
          success: true,
          message: 'Welcome back! You have been re-subscribed to our newsletter.',
          data: {
            id: existingSubscriber._id,
            email: existingSubscriber.email,
            subscribedAt: existingSubscriber.subscribedAt,
          },
        });
      }
    }

    const subscriber = new Newsletter({
      email: email.toLowerCase(),
      source: 'website',
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
    });

    await subscriber.save();

    sendWelcomeEmail(email).catch((err) => {
      console.error('Failed to send welcome email:', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      data: {
        id: subscriber._id,
        email: subscriber.email,
        subscribedAt: subscriber.subscribedAt,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed.',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages[0],
      });
    }

    console.error('Newsletter subscription error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.',
    });
  }
};

const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our subscriber list.',
      });
    }

    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = Date.now();
    await subscriber.save();

    res.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.',
      data: {
        id: subscriber._id,
        email: subscriber.email,
        unsubscribedAt: subscriber.unsubscribedAt,
      },
    });
  } catch (error) {
    console.error('Newsletter unsubscription error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe. Please try again later.',
    });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ status: 'subscribed' })
      .sort({ createdAt: -1 })
      .limit(1000)
      .select('-__v -ipAddress -userAgent');

    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    console.error('Get all subscribers error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve subscribers.',
    });
  }
};

const sendWelcomeEmail = async (email) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to Digital Meister Technologies Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #c9a85c; padding: 30px; text-align: center;">
            <h1 style="color: #060606; margin: 0; font-size: 24px;">Welcome to DMT!</h1>
          </div>
          <div style="padding: 30px; background: #ffffff; color: #333333;">
            <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
            <p style="font-size: 16px; line-height: 1.6;">Thank you for subscribing to the Digital Meister Technologies - Atlas Marketing & Strategy newsletter!</p>
            <p style="font-size: 16px; line-height: 1.6;">You'll now receive:</p>
            <ul style="font-size: 16px; line-height: 1.8;">
              <li>Latest digital marketing insights and trends</li>
              <li>Branding tips and best practices</li>
              <li>Exclusive offers and promotions</li>
              <li>Industry news and updates</li>
            </ul>
            <p style="font-size: 16px; line-height: 1.6;">We're excited to have you on board and look forward to helping you grow your brand.</p>
            <p style="font-size: 16px; line-height: 1.6;">Best regards,<br><strong>The DMT Team</strong></p>
          </div>
          <div style="background: #060606; padding: 20px; text-align: center; color: #888888; font-size: 12px;">
            <p style="margin: 0;">© 2025 Digital Meister Technologies Private Limited. All rights reserved.</p>
            <p style="margin: 8px 0 0 0;">ATLAS MARKETING & STRATEGY | A Subsidiary of DMT</p>
            <p style="margin: 8px 0 0 0;"><a href="https://www.dmt-technologies.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #c9a85c;">Unsubscribe</a></p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error.message);
    return false;
  }
};

module.exports = {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getAllSubscribers,
  sendWelcomeEmail,
};