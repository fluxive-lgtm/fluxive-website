# 🚀 FLUXIVE Deployment Guide

## Cloudflare Pages Deployment

### Prerequisites
- Cloudflare account
- GitHub repository (optional)
- Node.js 18+ installed locally

### Method 1: Direct Upload (Fastest)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Install Wrangler CLI:**
   ```bash
   npm install -g wrangler
   ```

3. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

4. **Deploy to Cloudflare Pages:**
   ```bash
   wrangler pages deploy out --project-name fluxive
   ```

5. **Access your site:**
   - Your site will be available at: `https://fluxive.pages.dev`
   - Custom domain can be configured in Cloudflare dashboard

### Method 2: GitHub Integration (Recommended for Continuous Deployment)

1. **Push code to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/fluxive.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to Cloudflare Dashboard > Pages
   - Click "Create a project"
   - Connect your GitHub account
   - Select the `fluxive` repository

3. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** 18 or higher

4. **Deploy:**
   - Click "Save and Deploy"
   - Cloudflare will automatically deploy on every push to main branch

## Vercel Deployment (Alternative)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Follow the prompts** to complete deployment

## Netlify Deployment (Alternative)

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

3. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `out`

## Environment Variables

For production deployment, you may need to set environment variables:

```bash
# Example for Cloudflare Pages
wrangler pages secret put CONTACT_EMAIL_API_KEY
wrangler pages secret put RECAPTCHA_SECRET_KEY
```

## Custom Domain Setup

### Cloudflare Pages
1. Go to your project in Cloudflare Pages
2. Navigate to "Custom domains"
3. Click "Set up a custom domain"
4. Follow the DNS configuration instructions

### DNS Configuration
Add these records to your domain:
- **A Record:** `192.0.2.1` (Cloudflare Pages IP)
- **CNAME Record:** `fluxive.pages.dev`

## Performance Optimizations

- ✅ Static export enabled
- ✅ Images unoptimized (static)
- ✅ CSS purged with Tailwind
- ✅ Code splitting automatic
- ✅ Gzip compression enabled

## Monitoring & Analytics

### Recommended Tools
- **Cloudflare Web Analytics** (Privacy-friendly)
- **Google Analytics 4** (Detailed insights)
- **Plausible Analytics** (Privacy-focused)

### Installation
Add tracking script to `src/app/layout.tsx`:

```typescript
// Google Analytics example
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

## Troubleshooting

### Build Fails
- Check Node.js version (must be 18+)
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### 404 Errors
- Ensure `out` directory exists after build
- Check that static export is configured correctly
- Verify file paths are correct

### Styling Issues
- Clear Tailwind cache
- Rebuild with `npm run build`
- Check PostCSS configuration

## Security Considerations

- [ ] Enable HTTPS (automatic on Cloudflare)
- [ ] Set up CSP headers
- [ ] Configure rate limiting
- [ ] Enable DDoS protection
- [ ] Add reCAPTCHA to contact form
- [ ] Sanitize form inputs
- [ ] Use environment variables for sensitive data

## Post-Deployment Checklist

- [ ] Test all links and navigation
- [ ] Verify contact form functionality
- [ ] Check mobile responsiveness
- [ ] Test on multiple browsers
- [ ] Verify animations work smoothly
- [ ] Check page load speed (aim for <3s)
- [ ] Set up analytics
- [ ] Configure custom domain
- [ ] Test social media sharing
- [ ] Verify SEO meta tags

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Backups
- Git repository serves as version control
- Cloudflare Pages keeps deployment history
- Consider automated backups of any dynamic content

## Support

For deployment issues or questions:
- **Email:** contact@fluxive.com
- **Documentation:** https://developers.cloudflare.com/pages/
- **GitHub Issues:** https://github.com/YOUR_USERNAME/fluxive/issues

---

**Last Updated:** November 5, 2025
**Version:** 1.0.0
