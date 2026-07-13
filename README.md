# DMT WEBSITE — Digital Meister Technologies

A professional corporate landing website for **Digital Meister Technologies Private Limited (DMT)** and its subsidiary brand **Atlas**.

---

## 📁 Project Structure

```
DMT WEBSITE/
├── frontend/
│   ├── index.html              # Main landing page
│   ├── css/
│   │   └── style.css           # All styles with responsive design
│   ├── js/
│   │   ├── animations/
│   │   │   ├── canvas.js       # Hero & quote section canvas animations
│   │   │   └── letters.js      # Magnetic hero title letters
│   │   ├── components/
│   │   │   ├── cursor.js       # Custom cursor interaction
│   │   │   ├── scroll.js       # Scroll effects & nav behavior
│   │   │   └── cta.js          # Contact form handler
│   │   └── utils/
│   │       └── api.js          # Backend API integration
│   └── assets/
│       ├── images/             # Place images here
│       ├── logos/              # Place logo files here
│       └── icons/              # Place icon files here
│
└── backend/
    ├── src/
    │   ├── server.js           # Express server entry point
    │   ├── config/
    │   │   ├── database.js     # MongoDB Atlas connection
    │   │   └── email.js        # Nodemailer configuration
    │   ├── controllers/
    │   │   └── contactController.js  # Contact form logic
    │   ├── models/
    │   │   └── Contact.js      # Contact schema & model
    │   ├── routes/
    │   │   └── contactRoutes.js # API routes & validation
    │   ├── middleware/
    │   │   ├── errorHandler.js # Global error handling
    │   │   ├── logger.js       # Request logging (Morgan)
    │   │   └── rateLimiter.js  # Rate limiting for API
    │   └── utils/              # Utility functions
    ├── .env.example            # Environment variables template
    ├── .gitignore
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- Email account for SMTP (Gmail with App Password recommended)

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your credentials
```

**Required Environment Variables:**

```env
# Server
NODE_ENV=development
PORT=5000

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dmt_website

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM="Digital Meister Technologies <noreply@dmt-technologies.com>"
CONTACT_EMAIL=info@dmt-technologies.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5500

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10
```

### 3. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or 0.0.0.0/0 for development)
5. Get your connection string
6. Create a database named `dmt_website`

### 4. Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:5000`

### 5. Run the Frontend

Open `frontend/index.html` in your browser or use a local server:

```bash
# Option 1: VS Code Live Server (recommended)
# Right-click index.html → "Open with Live Server"

# Option 2: Python
cd frontend
python -m http.server 5500

# Option 3: Node.js http-server
npx http-server frontend -p 5500
```

---

## 📬 Contact Form API

### Endpoint: `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "company": "Acme Inc",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "Digital Marketing",
  "message": "I need help with my marketing strategy..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Thank you for your enquiry. We will contact you soon.",
  "data": {
    "id": "65a1234567890abcdef12345",
    "name": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### Rate Limiting
- **Contact Form:** 5 submissions per hour per IP
- **General API:** 100 requests per 15 minutes per IP

---

## 🎨 Services Offered

The website showcases DMT's comprehensive services:

1. **Digital Marketing**
2. **Social Media Marketing**
3. **Branding**
4. **Graphic Design**
5. **Logo Design**
6. **Marketing Collateral** (Posters, Flyers, Pamphlets, Brochures, Business Cards)
7. **Corporate Identity** (Lanyards, ID Cards, Badges, Packaging Design)
8. **Banner Design**
9. **Corporate Printing**
10. **Website Design**
11. **Marketing Consultation**
12. **SEO & Search**

---

## 🔒 Security Features

- **Helmet.js** — Security HTTP headers
- **CORS** — Cross-origin resource sharing configuration
- **Compression** — Response compression
- **Rate Limiting** — Prevents abuse
- **Input Validation** — express-validator on all inputs
- **MongoDB Injection Protection** — Mongoose ODM
- **Environment Variables** — Secrets never in code

---

## 📱 Responsive Design

The website is fully responsive across:
- **Desktop** (1920px+)
- **Laptop** (1440px)
- **Tablet** (1024px)
- **Mobile Landscape** (768px)
- **Mobile Portrait** (480px)

---

## 🛠️ Development

### Folder Organization

**Frontend JavaScript:**
- `animations/` — Canvas animations, magnetic letter effects
- `components/` — Cursor, scroll behavior, form handling
- `utils/` — API integration, helper functions

**Backend:**
- `config/` — Database & email configuration
- `controllers/` — Business logic
- `models/` — Mongoose schemas
- `routes/` — API endpoints with validation
- `middleware/` — Error handling, logging, rate limiting

### Code Style

- No comments in production code (clean, self-documenting)
- Consistent naming conventions
- Modular architecture
- Error handling everywhere

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "compression": "^1.7.4",
  "morgan": "^1.10.0",
  "express-rate-limit": "^7.1.5",
  "nodemailer": "^6.9.7",
  "validator": "^13.11.0",
  "express-validator": "^7.0.1"
}
```

### Frontend
- **No build tools required** — Pure vanilla JavaScript
- **Google Fonts** — Syne & DM Sans
- **No external libraries** — Lightweight & fast

---

## 🌐 Deployment

### Backend (Railway, Render, or Heroku)

1. Push code to GitHub
2. Connect repo to hosting platform
3. Add environment variables
4. Deploy

### Frontend (Vercel, Netlify, or GitHub Pages)

**Vercel:**
```bash
npm install -g vercel
cd frontend
vercel
```

**Netlify:**
- Drag & drop `frontend` folder to Netlify dashboard

**GitHub Pages:**
- Push `frontend` contents to `gh-pages` branch

---

## 📊 Database Collections

### contacts
```javascript
{
  _id: ObjectId,
  name: String (required),
  company: String,
  email: String (required, validated),
  phone: String,
  service: String,
  message: String (required, min 10 chars),
  status: 'new' | 'contacted' | 'converted' | 'closed',
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## ✉️ Email Configuration

### Gmail Setup (Recommended for Development)

1. Enable 2FA on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated password
3. Use the App Password in `.env` (not your regular Gmail password)

### Production Email

For production, consider:
- **SendGrid** (free tier: 100 emails/day)
- **Mailgun** (free tier: 5,000 emails/month)
- **AWS SES** (pay-as-you-go, very cheap)

Update `.env` accordingly:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

---

## 🔍 API Endpoints Reference

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/health` | Health check | Public |
| POST | `/api/contact` | Submit contact form | Public |
| GET | `/api/contact` | Get all contacts (100 latest) | Admin |
| GET | `/api/contact/:id` | Get single contact | Admin |
| PATCH | `/api/contact/:id/status` | Update contact status | Admin |

---

## 🐛 Troubleshooting

### MongoDB Connection Fails
- Check connection string in `.env`
- Ensure IP is whitelisted in Atlas
- Verify database user credentials

### Email Not Sending
- Use App Password for Gmail (not regular password)
- Check SMTP settings
- Verify `CONTACT_EMAIL` is valid

### CORS Errors
- Ensure `FRONTEND_URL` matches your frontend address
- Check browser console for specific CORS error

### Form Validation Errors
- Name: min 2 characters
- Email: valid format required
- Message: min 10 characters

---

## 📝 Changelog

### v2.0 — Complete Reorganization
- ✅ Reorganized frontend into logical folders
- ✅ Built Express backend with MongoDB
- ✅ Implemented contact form with validation
- ✅ Added email notifications
- ✅ Updated branding to DMT/Atlas
- ✅ Removed pricing sections
- ✅ Expanded services to match DMT offerings
- ✅ Added comprehensive responsive design
- ✅ Added security middleware (Helmet, CORS, Rate Limiting)

### v1.0 — Original ATLAS Website
- Static HTML/CSS/JS
- Supabase integration
- Basic contact form (email only)
- Pricing sections

---

## 📄 License

MIT License — Digital Meister Technologies Private Limited

---

## 📞 Support

For questions or issues:
- Email: info@dmt-technologies.com
- Website: [DMT Website](#)

---

## 🎯 Next Steps (Optional Enhancements)

1. **Portfolio CMS** — Add admin panel to manage portfolio items
2. **Blog Section** — Company news and insights
3. **Analytics** — Google Analytics or Plausible integration
4. **SEO Optimization** — Meta tags, Open Graph, sitemap
5. **Performance** — Image optimization, lazy loading
6. **Accessibility** — WCAG 2.1 compliance
7. **Testing** — Unit tests for backend, E2E tests for frontend

---

**Built with ❤️ by Digital Meister Technologies**