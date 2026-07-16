# Deployment Guide for DMT Website

This document provides step-by-step instructions for deploying the DMT Website to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Verification](#post-deployment-verification)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] MongoDB Atlas cluster created and connection string ready
- [ ] Gmail account with 2FA enabled and App Password generated
- [ ] GitHub account for version control
- [ ] Render account (https://render.com)
- [ ] Vercel account (https://vercel.com)

---

## Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Update `backend/.env` with production values:**

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dmt_website?retryWrites=true&w=majority
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Digital Meister Technologies <noreply@dmt-technologies.com>"
CONTACT_EMAIL=info@dmt-technologies.com
FRONTEND_URL=https://your-domain.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

2. **Create `backend/.render.env`** (this file will be used by Render):

Copy all variables from `.env` to `.render.env`.

### Step 2: Deploy to Render

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **Create a new Web Service on Render:**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** dmt-website-backend
     - **Region:** Choose closest to your audience (e.g., Singapore for India)
     - **Branch:** main
     - **Root Directory:** backend
     - **Runtime:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Instance Type:** Free

3. **Add Environment Variables on Render:**
   - In Render dashboard, go to Environment tab
   - Add all variables from `.render.env`
   - Click "Save Changes"

4. **Deploy:**
   - Render will automatically deploy after configuration
   - Wait for deployment to complete (5-10 minutes)
   - Copy your backend URL (e.g., `https://dmt-website-backend.onrender.com`)

### Step 3: Verify Backend

Test your backend health endpoint:
```
https://your-backend.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-01-XXTXX:XX:XX.XXXZ",
  "environment": "production"
}
```

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Deployment

1. **Update `frontend/.env` with production API URL:**

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

2. **Update `frontend/vercel.json`** with your production domain (already configured).

### Step 2: Deploy to Vercel

1. **Install Vercel CLI (optional):**
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard (Recommended):**
   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Other
     - **Root Directory:** frontend
     - **Build Command:** Leave empty (static site)
     - **Output Directory:** Leave empty
     - **Install Command:** Leave empty

3. **Add Environment Variables:**
   - In Vercel project settings, go to Environment Variables
   - Add:
     ```
     VITE_API_URL = https://your-backend.onrender.com/api
     ```
   - Set for Production, Preview, and Development

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (2-5 minutes)
   - Copy your frontend URL (e.g., `https://dmt-website.vercel.app`)

### Step 3: Configure Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `dmt-technologies.com`)
   - Follow DNS configuration instructions

2. **Update DNS Records:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Wait for DNS propagation (up to 48 hours)

---

## Environment Variables

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://your-backend.onrender.com/api` |

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_SECURE` | Use TLS | `false` |
| `EMAIL_USER` | Email address | `your-email@gmail.com` |
| `EMAIL_PASS` | Email app password | `xxxx-xxxx-xxxx` |
| `EMAIL_FROM` | Sender name | `"Digital Meister Technologies <noreply@dmt-technologies.com>"` |
| `CONTACT_EMAIL` | Recipient email | `info@dmt-technologies.com` |
| `FRONTEND_URL` | Frontend domain | `https://your-domain.vercel.app` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

---

## Post-Deployment Verification

### Checklist

- [ ] **Backend Health Check:** Visit `/api/health` and verify database connection
- [ ] **Contact Form:** Submit a test enquiry and verify:
  - Form submission succeeds
  - Data is stored in MongoDB
  - Company receives notification email
  - Customer receives confirmation email
- [ ] **Frontend Loading:** Verify all pages load correctly
- [ ] **CORS:** Ensure frontend can communicate with backend (check browser console)
- [ ] **Mobile Responsiveness:** Test on mobile devices
- [ ] **Legal Pages:** Verify Privacy Policy and Terms pages load
- [ ] **Analytics:** Set up Google Analytics (if using)
- [ ] **SSL Certificate:** Verify HTTPS is working (automatic with Vercel/Render)

### Testing Contact Form

1. Open your deployed website
2. Navigate to the contact section
3. Fill out and submit the form
4. Check MongoDB for the submission
5. Verify both emails are received

### MongoDB Verification

Connect to MongoDB Atlas and check:
```javascript
db.contacts.find().sort({ createdAt: -1 }).limit(5)
```

You should see your test submission.

---

## Troubleshooting

### Backend Issues

**Problem:** Backend won't start
- Check Render logs for error messages
- Verify all environment variables are set
- Ensure MongoDB URI is correct and IP whitelist allows Render

**Problem:** Emails not sending
- Verify Gmail App Password is correct (not regular password)
- Check Gmail 2FA is enabled
- Review Render logs for email errors

**Problem:** CORS errors
- Ensure `FRONTEND_URL` matches your Vercel domain exactly
- Include both http and https if testing locally

### Frontend Issues

**Problem:** Contact form fails with network error
- Verify `VITE_API_URL` is correct
- Check browser console for CORS errors
- Ensure backend is running and accessible

**Problem:** Environment variables not working
- Redeploy after adding environment variables
- Clear browser cache and test in incognito mode

---

## Maintenance

### Regular Tasks

1. **Monitor Render Logs:** Check for errors weekly
2. **Review MongoDB:** Ensure database is not exceeding free tier limits
3. **Update Dependencies:** Run `npm audit` monthly and update packages
4. **Backup Database:** Set up MongoDB Atlas automated backups
5. **Monitor Uptime:** Use UptimeRobot or similar to monitor backend

### Scaling Considerations

When traffic increases:
- Upgrade Render instance type (Free → Starter → Pro)
- Enable MongoDB Atlas backups
- Consider adding Redis for session management
- Implement CDN for static assets

---

## Support

For deployment issues:
- Render Support: https://render.com/docs
- Vercel Support: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/

For application issues, contact:
- Email: info@dmt-technologies.com
- WhatsApp: +91 9952906859

---

**Last Updated:** January 2025
**Version:** 1.0