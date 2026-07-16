# DMT Website - Digital Meister Technologies

> Atlas Marketing & Strategy | A Subsidiary of DMT

Professional digital marketing and branding agency website with a modern, luxury black-and-gold design.

## 🚀 Features

### Frontend
- **Luxury Design**: Premium black and gold branding with smooth animations
- **Responsive**: Fully responsive across all devices
- **Interactive Cursor**: Custom cursor with hover effects
- **Canvas Animations**: Dynamic particle animations
- **Contact Form**: Integrated with backend API
- **Legal Pages**: Comprehensive Privacy Policy and Terms & Conditions
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation

### Backend
- **RESTful API**: Node.js + Express backend
- **Database**: MongoDB Atlas integration
- **Email Notifications**: Automated emails via Nodemailer
  - Company notification emails
  - Customer confirmation emails
- **Security**: Helmet, CORS, rate limiting, input validation
- **Validation**: Express-validator for form validation
- **Logging**: Morgan request logging
- **Error Handling**: Centralized error handling
- **Health Endpoint**: Database status monitoring

## 📁 Project Structure

```
DMT WEBSITE/
├── backend/                    # Node.js backend
│   ├── server.js              # Main server entry point
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables template
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js    # MongoDB connection
│   │   │   └── email.js       # Email configuration
│   │   ├── controllers/
│   │   │   └── contactController.js
│   │   ├── middleware/
│   │   │   ├── logger.js      # Request logging
│   │   │   ├── errorHandler.js # Error handling
│   │   │   └── rateLimiter.js  # Rate limiting
│   │   ├── models/
│   │   │   └── Contact.js     # Contact schema
│   │   └── routes/
│   │       └── contactRoutes.js
│   └── README.md
│
├── frontend/                   # Static website
│   ├── index.html             # Main landing page
│   ├── privacy-policy.html    # Privacy Policy
│   ├── terms.html             # Terms & Conditions
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── utils/
│   │   │   ├── api.js         # API integration
│   │   │   └── config.js      # Environment config
│   │   ├── components/
│   │   │   ├── cursor.js      # Custom cursor
│   │   │   ├── scroll.js      # Scroll animations
│   │   │   └── cta.js         # Contact form
│   │   └── animations/
│   │       ├── canvas.js      # Canvas animations
│   │       └── letters.js     # Text animations
│   └── assets/
│       └── logos/             # Brand assets
│
├── DEPLOYMENT.md              # Deployment guide
├── README.md                  # This file
└── .gitignore
```

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Google Fonts (Syne, DM Sans)
- Canvas API for animations
- Fetch API for HTTP requests

### Backend
- Node.js 18+
- Express.js 4.x
- MongoDB with Mongoose
- Nodemailer for emails
- Express Validator
- Helmet for security
- CORS
- Compression
- Morgan for logging
- Express Rate Limit

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB Atlas account
- Gmail account with 2FA (for emails)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "DMT WEBSITE"
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables:**

   **Backend** (`backend/.env`):
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dmt_website
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM="Digital Meister Technologies <noreply@dmt-technologies.com>"
   CONTACT_EMAIL=info@dmt-technologies.com
   FRONTEND_URL=http://localhost:5500
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

   **Frontend** (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the backend:**
   ```bash
   cd backend
   npm run dev
   ```

5. **Open the frontend:**
   - Use Live Server extension in VS Code
   - Or serve with any static file server
   - Navigate to `http://localhost:5500`

## 📝 API Documentation

### Contact Form API

#### POST /api/contact

Submit a contact form enquiry.

**Request Body:**
```json
{
  "name": "John Doe",
  "company": "Acme Inc",
  "email": "john@example.com",
  "phone": "+91 9999999999",
  "service": "Digital Marketing",
  "message": "I'm interested in your services..."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Thank you for your enquiry. We will contact you soon.",
  "data": {
    "id": "65f1234567890abcdef12345",
    "name": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Validation:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `message`: Required, 10-2000 characters
- `company`: Optional, max 100 characters
- `phone`: Optional, max 20 characters
- `service`: Optional, max 100 characters

#### GET /api/health

Check API and database status.

**Response (200):**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "environment": "development"
}
```

## 🔒 Security Features

- **Helmet**: HTTP security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: 100 requests per 15 minutes (general), 5 per hour (contact form)
- **Input Validation**: Express-validator for all inputs
- **XSS Protection**: Input sanitization
- **MongoDB Injection Protection**: Mongoose validation
- **Environment Variables**: No hardcoded secrets

## 📧 Email Configuration

### Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Visit: https://myaccount.google.com/apppasswords
4. Create an app password for "Mail"
5. Use this password in `EMAIL_PASS` environment variable

### Email Templates

- **Company Notification**: Sent to `CONTACT_EMAIL` with enquiry details
- **Customer Confirmation**: Professional confirmation email with enquiry summary

## 🧪 Testing

### Manual Testing

1. **Contact Form:**
   - Fill out all fields
   - Submit and verify success message
   - Check MongoDB for submission
   - Verify both emails are received

2. **API Health:**
   ```bash
   curl http://localhost:5000/api/health
   ```

3. **Rate Limiting:**
   - Submit contact form 6 times rapidly
   - Verify 6th submission is blocked

## 📊 Database Schema

### Contact Model

```javascript
{
  name: String (required, 2-100 chars),
  company: String (optional, max 100 chars),
  email: String (required, validated),
  phone: String (optional, max 20 chars),
  service: String (optional, max 100 chars),
  message: String (required, 10-2000 chars),
  status: String (enum: new, contacted, converted, closed),
  ipAddress: String,
  userAgent: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. **Backend (Render):**
   - Push to GitHub
   - Connect repository to Render
   - Set environment variables
   - Deploy

2. **Frontend (Vercel):**
   - Connect GitHub repository
   - Set `VITE_API_URL` environment variable
   - Deploy

## 📈 Performance

- **Lighthouse Score**: 90+ (target)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Minimal (static site)

## ♿ Accessibility

- Semantic HTML5
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Reduced motion support
- Color contrast compliance

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 Legal

- [Privacy Policy](./frontend/privacy-policy.html)
- [Terms & Conditions](./frontend/terms.html)

## 🤝 Support

- **Email**: info@dmt-technologies.com
- **WhatsApp**: +91 9952906859
- **Business Hours**: Monday – Friday, 9:00 AM – 6:00 PM IST

## 📝 License

MIT License - Digital Meister Technologies Private Limited

---

**Built with ❤️ by Digital Meister Technologies**

Atlas Marketing & Strategy | A Subsidiary of DMT