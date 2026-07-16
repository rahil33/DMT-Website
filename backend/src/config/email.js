// backend/src/config/email.js
// Nodemailer email configuration

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

const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Enquiry - ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a85c;">New Contact Enquiry</h2>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Company:</strong> ${contactData.company || 'Not provided'}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
            <p><strong>Service Interest:</strong> ${contactData.service || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #fff; padding: 15px; border-left: 3px solid #c9a85c;">
              ${contactData.message}
            </p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            This enquiry was submitted via the Atlas (DMT) website contact form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error.message);
    return false;
  }
};

const sendConfirmationEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: contactData.email,
      subject: 'Thank You for Contacting Digital Meister Technologies',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #c9a85c; padding: 30px; text-align: center;">
            <h1 style="color: #060606; margin: 0; font-size: 24px;">Thank You for Your Enquiry</h1>
          </div>
          <div style="padding: 30px; background: #ffffff; color: #333333;">
            <p style="font-size: 16px; line-height: 1.6;">Dear ${contactData.name},</p>
            <p style="font-size: 16px; line-height: 1.6;">Thank you for contacting Digital Meister Technologies - Atlas Marketing & Strategy. We have received your enquiry and our team will review it shortly.</p>
            <div style="background: #f4f4f4; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #c9a85c; margin-top: 0; font-size: 14px; text-transform: uppercase;">Your Enquiry Details</h3>
              <p style="margin: 8px 0;"><strong>Service Interest:</strong> ${contactData.service || 'Not specified'}</p>
              <p style="margin: 8px 0;"><strong>Message:</strong></p>
              <p style="background: #fff; padding: 15px; border-left: 3px solid #c9a85c; margin: 8px 0;">
                ${contactData.message}
              </p>
            </div>
            <p style="font-size: 16px; line-height: 1.6;">Our team will respond to you within <strong>24 hours</strong> during business days (Monday – Friday, 9:00 AM – 6:00 PM IST).</p>
            <p style="font-size: 16px; line-height: 1.6;">If you have any urgent questions, please feel free to contact us directly:</p>
            <ul style="font-size: 16px; line-height: 1.8;">
              <li><strong>Email:</strong> info@dmt-technologies.com</li>
              <li><strong>WhatsApp:</strong> +91 9952906859</li>
            </ul>
          </div>
          <div style="background: #060606; padding: 20px; text-align: center; color: #888888; font-size: 12px;">
            <p style="margin: 0;">© 2025 Digital Meister Technologies Private Limited. All rights reserved.</p>
            <p style="margin: 8px 0 0 0;">ATLAS MARKETING & STRATEGY | A Subsidiary of DMT</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error.message);
    return false;
  }
};

module.exports = { sendContactEmail, sendConfirmationEmail };