// backend/src/controllers/contactController.js
// Contact form submission controller

const Contact = require('../models/Contact');
const { sendContactEmail, sendConfirmationEmail } = require('../config/email');

const submitContact = async (req, res) => {
  try {
    const { name, company, email, phone, service, message } = req.body;

    const contact = new Contact({
      name,
      company,
      email,
      phone,
      service,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
    });

    await contact.save();

    // Send email notifications (non-blocking)
    // Send notification to company
    sendContactEmail(contact.toObject()).catch((err) => {
      console.error('Failed to send contact notification email:', err.message);
    });

    // Send confirmation email to customer
    sendConfirmationEmail(contact.toObject()).catch((err) => {
      console.error('Failed to send confirmation email:', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your enquiry. We will contact you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        submittedAt: contact.createdAt,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages[0],
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email has already been submitted recently.',
      });
    }

    console.error('Contact submission error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again later.',
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .select('-__v');

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Get all contacts error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts.',
    });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select('-__v');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found.',
      });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Get contact by ID error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact.',
    });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found.',
      });
    }

    res.json({
      success: true,
      message: `Contact status updated to ${status}`,
      data: contact,
    });
  } catch (error) {
    console.error('Update contact status error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact.',
    });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
};