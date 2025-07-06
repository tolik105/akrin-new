# Deployment Guide

## Netlify Deployment Configuration

This application is configured to deploy on Netlify with the following settings:

### Required Environment Variables

The following environment variables must be configured in the Netlify dashboard for full functionality:

#### Essential Variables
- `DEEPL_API_KEY` - DeepL API key for translation services
  - Get from: https://www.deepl.com/pro-api
  - Required for: Translation functionality in contact forms

#### reCAPTCHA Configuration
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA site key (public)
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA secret key (private)
  - Get from: https://www.google.com/recaptcha/admin
  - Required for: Form spam protection

#### Email Configuration (SMTP)
- `SMTP_HOST` - Email server hostname
- `SMTP_PORT` - Email server port (usually 587 or 465)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SALES_EMAIL` - Recipient email for contact forms (defaults to sales@akrin.jp)

### Setting Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site (stellar-pegasus-56e156)
3. Navigate to Site settings > Environment variables
4. Add each required variable with its corresponding value

### Deployment Notes

- The application will build and deploy even without environment variables
- Missing variables will cause certain features to be disabled:
  - Translation services will return "temporarily unavailable"
  - reCAPTCHA will use fallback behavior for development
  - Email sending may fail if SMTP is not configured

### Build Configuration

The `netlify.toml` file is configured with:
- Node.js 18
- Legacy peer deps flag for dependency resolution
- Next.js plugin for optimal deployment

### Troubleshooting

If deployment fails:
1. Check that all required environment variables are set
2. Verify Node.js version compatibility
3. Ensure build command completes successfully
4. Check Netlify build logs for specific error messages

For local development, copy `.env.example` to `.env.local` and fill in the required values.
