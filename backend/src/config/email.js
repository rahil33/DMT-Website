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
    return false;
  }
};

module.exports = { sendContactEmail };