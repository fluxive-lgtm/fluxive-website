# 🔧 Hosting Fix for Legal Pages (403 Error)

## Problem
The `/privacy`, `/terms`, and `/cookies` pages return 403 errors when accessed with trailing slashes on some hosting providers.

## Root Cause
Next.js static export creates both:
- `privacy.html` (at root)
- `privacy/` (directory with metadata, but no `index.html`)

When you visit `https://fluxive.be/privacy/`, the server looks for `/privacy/index.html` which doesn't exist → 403 error.

## ✅ Solution Applied

### 1. Fixed Page Structure
Moved pages from nested structure to correct structure:
```
✓ src/app/privacy/page.tsx    (was: src/app/privacy/privacy/page.tsx)
✓ src/app/terms/page.tsx       (was: src/app/terms/terms/page.tsx)
✓ src/app/cookies/page.tsx     (was: src/app/cookies/cookies/page.tsx)
```

### 2. Post-Build Script
Created `scripts/post-build.js` that automatically:
- Copies `privacy.html` → `privacy/index.html`
- Copies `terms.html` → `terms/index.html`
- Copies `cookies.html` → `cookies/index.html`

This script runs automatically after every build (integrated into `npm run build`).

### 3. Hosting Configuration Files

#### Apache / cPanel (.htaccess)
File: `public/.htaccess`
- Handles directory routing
- Forces HTTPS
- Sets security headers
- Configures caching

#### Netlify
File: `public/netlify.toml`
- Redirects configuration
- Headers configuration
- Build settings

#### Vercel
File: `vercel.json`
- Routes configuration
- Build output directory
- Headers

## 📦 Deployment Instructions

### For ANY Hosting Provider:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Verify files created:**
   ```bash
   ls -la out/privacy/index.html
   ls -la out/terms/index.html
   ls -la out/cookies/index.html
   ```
   All three should exist!

3. **Deploy the `out` directory** to your hosting provider

### Specific Hosting Instructions:

#### Apache / cPanel / Shared Hosting
1. Upload entire `out` directory contents to `public_html` or `www`
2. The `.htaccess` file will be automatically copied and will handle routing
3. Ensure mod_rewrite is enabled

#### Netlify
1. Deploy via CLI: `netlify deploy --prod --dir=out`
2. Or connect GitHub repo (auto-deploy on push)
3. `netlify.toml` will be automatically recognized

#### Vercel
1. Deploy via CLI: `vercel --prod`
2. Or connect GitHub repo
3. `vercel.json` will be automatically recognized

#### Custom Server (Nginx)
Add to your nginx config:
```nginx
location /privacy {
    try_files /privacy/index.html /privacy.html =404;
}
location /terms {
    try_files /terms/index.html /terms.html =404;
}
location /cookies {
    try_files /cookies/index.html /cookies.html =404;
}
```

#### Custom Server (Node.js)
Serve static files with fallback:
```javascript
const express = require('express');
const app = express();

app.use(express.static('out'));

// Fallback for legal pages
app.get(['/privacy', '/privacy/'], (req, res) => {
  res.sendFile(__dirname + '/out/privacy.html');
});
app.get(['/terms', '/terms/'], (req, res) => {
  res.sendFile(__dirname + '/out/terms.html');
});
app.get(['/cookies', '/cookies/'], (req, res) => {
  res.sendFile(__dirname + '/out/cookies.html');
});
```

## 🧪 Testing

### Local Testing
```bash
# Install serve
npm install -g serve

# Serve the out directory
cd out
serve

# Test URLs (should all work):
# http://localhost:3000/privacy
# http://localhost:3000/privacy/
# http://localhost:3000/terms
# http://localhost:3000/terms/
# http://localhost:3000/cookies
# http://localhost:3000/cookies/
```

### Production Testing
After deployment, test these URLs:
```
✓ https://fluxive.be/privacy
✓ https://fluxive.be/privacy/
✓ https://fluxive.be/terms
✓ https://fluxive.be/terms/
✓ https://fluxive.be/cookies
✓ https://fluxive.be/cookies/
```

All should return 200 OK and display the page content.

## 🐛 Troubleshooting

### Still Getting 403?

1. **Check file permissions** (if on Linux/Unix server):
   ```bash
   chmod 644 out/privacy/index.html
   chmod 644 out/terms/index.html
   chmod 644 out/cookies/index.html
   chmod 755 out/privacy/
   chmod 755 out/terms/
   chmod 755 out/cookies/
   ```

2. **Verify files exist on server:**
   ```bash
   # SSH into your server and check:
   ls -la /path/to/public_html/privacy/
   ls -la /path/to/public_html/terms/
   ls -la /path/to/public_html/cookies/
   ```

3. **Check server logs:**
   - Apache: `tail -f /var/log/apache2/error.log`
   - Nginx: `tail -f /var/log/nginx/error.log`

4. **Clear CDN/Cache:**
   If using Cloudflare, Fastly, or similar, purge the cache

5. **Check .htaccess/config is loaded:**
   - Apache: Ensure `AllowOverride All` is set
   - Nginx: Reload config `sudo nginx -s reload`

### Pages Work Locally But Not in Production?

This usually means:
- Configuration file (`.htaccess`, `netlify.toml`, etc.) wasn't deployed
- Server doesn't support the configuration format
- File permissions are wrong

**Solution:** Contact your hosting provider to:
1. Confirm which web server they use (Apache, Nginx, LiteSpeed, etc.)
2. Verify if `.htaccess` is supported (for Apache)
3. Check if `index.html` directory indexing is enabled

## 📝 Notes

- The post-build script runs automatically on every build
- All configuration files are in `public/` and will be copied to `out/`
- The fix works with or without trailing slashes
- Compatible with all major hosting providers

## ✅ Verification Checklist

After deployment, verify:
- [ ] `/privacy` loads (no trailing slash)
- [ ] `/privacy/` loads (with trailing slash)
- [ ] `/terms` loads
- [ ] `/terms/` loads
- [ ] `/cookies` loads
- [ ] `/cookies/` loads
- [ ] No 403 or 404 errors
- [ ] Content is correct and styled properly
- [ ] All internal links work

---

**Last Updated:** November 7, 2025
**Status:** ✅ Fixed
