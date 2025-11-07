# 🚀 FLUXIVE Deployment Guide

## ⚠️ CRITICAL: Before Deploying

### 1. Get Web3Forms API Key (REQUIRED)
The contact form requires Web3Forms to function:

1. Visit [https://web3forms.com](https://web3forms.com)
2. Create a free account
3. Create a new form with email: **info@fluxive.be**
4. Copy your Access Key
5. You'll need this for environment variables below

Without this key, the contact form will NOT work in production!

---

## Cloudflare Pages Deployment

### Prerequisites
- Cloudflare account
- Web3Forms API key (get from step above)
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

### REQUIRED Environment Variables

You MUST set these in Cloudflare Pages (or your deployment platform):

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Your Web3Forms API key | https://web3forms.com |
| `NEXT_PUBLIC_SITE_URL` | `https://fluxive.com` | Your domain |

### How to Set in Cloudflare Pages:

1. Go to your project in Cloudflare Pages dashboard
2. Navigate to **Settings** > **Environment variables**
3. Click **Add variable**
4. Add both variables above for **Production** environment
5. Redeploy the site for changes to take effect

### Alternative (CLI method):
```bash
# Using Wrangler CLI
wrangler pages secret put NEXT_PUBLIC_WEB3FORMS_KEY
wrangler pages secret put NEXT_PUBLIC_SITE_URL
```

### Local Development:
Create a `.env.local` file (already have `.env.local.example` as template):
```bash
NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
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

### Must Test:
- [ ] **Contact form sends to info@fluxive.be** (CRITICAL!)
- [ ] All links and navigation work
- [ ] Check mobile responsiveness
- [ ] Test on multiple browsers (Chrome, Safari, Firefox)
- [ ] Dark/Light mode toggle works
- [ ] Verify animations work smoothly
- [ ] Check page load speed (aim for <3s)

### SEO Verification:
- [ ] Visit https://fluxive.com/robots.txt (should load)
- [ ] Visit https://fluxive.com/sitemap.xml (should load)
- [ ] Verify meta tags in page source
- [ ] Test social media sharing preview

### Optional:
- [ ] Set up analytics (Google Analytics, Cloudflare Analytics)
- [ ] Configure custom domain (if not using fluxive.com)
- [ ] Update social media URLs in code (currently placeholders)

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
