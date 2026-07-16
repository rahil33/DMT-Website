# DMT Website Backend

Node.js + Express backend for the DMT Website contact form API.

## Features

- RESTful API for contact form submissions
- MongoDB Atlas database integration
- Automated email notifications (company + customer)
- Input validation and sanitization
- Rate limiting (5 submissions per hour per IP)
- Security headers (Helmet)
- CORS configuration
- Request logging (Morgan)
- Centralized error handling
- Health check endpoint

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dmt_website?retryWrites=true&w=majority
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

### 3. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## API Endpoints

### Contact Form

#### POST /api/contact

Submit a contact form enquiry.

**Request:**
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

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your enquiry. We will contact you soon.",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

### Health Check

#### GET /api/health

Check API and database status.

**Response:**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "environment": "development"
}
```

## Project Structure

```
backend/
├── server.js                 # Main entry point
├── package.json
├── .env.example
├── src/
│   ├── config/
│   │   ├── database.js      # MongoDB connection
│   │   └── email.js         # Email configuration
│   ├── controllers/
│   │   └── contactController.js
│   ├── middleware/
│   │   ├── logger.js        # Request logging
│   │   ├── errorHandler.js  # Error handling
│   │   └── rateLimiter.js   # Rate limiting
│   ├── models/
│   │   └── Contact.js       # Contact schema
│   └── routes/
│       └── contactRoutes.js # API routes
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `EMAIL_HOST` | SMTP host | Yes |
| `EMAIL_PORT` | SMTP port | Yes |
| `EMAIL_SECURE` | Use TLS (true/false) | Yes |
| `EMAIL_USER` | Email address | Yes |
| `EMAIL_PASS` | Email password/app password | Yes |
| `EMAIL_FROM` | Sender name and email | Yes |
| `CONTACT_EMAIL` | Recipient email | Yes |
| `FRONTEND_URL` | Frontend domain for CORS | Yes |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | No |

## Email Setup

### Gmail App Password

1. Enable 2-Factor Authentication on your Google Account
2. Visit: https://myaccount.google.com/apppasswords
3. Create an app password for "Mail"
4. Use this 16-character password in `EMAIL_PASS`

### Email Templates

Two emails are sent on form submission:

1. **Company Notification**: Sent to `CONTACT_EMAIL` with full enquiry details
2. **Customer Confirmation**: Professional confirmation sent to the customer

## Database

### MongoDB Schema

```javascript
{
  name: String (required, 2-100 chars),
  company: String (optional),
  email: String (required, validated),
  phone: String (optional),
  service: String (optional),
  message: String (required, 10-2000 chars),
  status: String (enum: new, contacted, converted, closed),
  ipAddress: String,
  userAgent: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Indexes

- `createdAt: -1` (for sorting)
- `status: 1` (for filtering)
- `email: 1` (for lookups)

## Security Features

- **Helmet**: HTTP security headers
- **CORS**: Configured for specific frontend URL
- **Rate Limiting**: 
  - General API: 100 requests per 15 minutes
  - Contact form: 5 submissions per hour
- **Input Validation**: All inputs validated and sanitized
- **XSS Protection**: Input sanitization
- **MongoDB Injection Protection**: Mongoose validation

## Error Handling

All errors are handled centrally in `errorHandler.js`:

- Validation errors (400)
- Duplicate key errors (400)
- JWT errors (401)
- Not found errors (404)
- Server errors (500)

## Testing

### Test Contact Form API

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Test Health Endpoint

```bash
curl http://localhost:5000/api/health
```

## Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) in the root directory for detailed deployment instructions.

### Render Deployment

1. Push code to GitHub
2. Connect repository to Render
3. Set all environment variables
4. Deploy

## Monitoring

### Logs

View logs in Render dashboard or locally:

```bash
# Local development
npm run dev
```

### Database

Monitor MongoDB Atlas:
- Connection count
- Database size
- Query performance

## Troubleshooting

### MongoDB Connection Issues

- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure network access is allowed

### Email Not Sending

- Verify Gmail App Password (not regular password)
- Check 2FA is enabled
- Review logs for specific errors
- Test SMTP connection manually

### CORS Errors

- Ensure `FRONTEND_URL` matches exactly (including protocol)
- For multiple environments, use comma-separated URLs:
  ```env
  FRONTEND_URL=http://localhost:5500,https://dmt-technologies.com
  ```

## Development

### Add New Endpoints

1. Create controller in `src/controllers/`
2. Create route in `src/routes/`
3. Import and use in `server.js`

### Add New Model

1. Create schema in `src/models/`
2. Export Mongoose model
3. Import in controller

## Dependencies

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

## License

MIT License - Digital Meister Technologies Private Limited

---

**Built with ❤️ by Digital Meister Technologies**