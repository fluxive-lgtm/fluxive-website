# 🇧🇪 EasyHost Deployment Guide for FLUXIVE

## About EasyHost
EasyHost is a Belgian hosting provider that uses **Apache with cPanel**. The `.htaccess` file will handle all routing automatically.

## 📦 Step-by-Step Deployment

### 1. Build the Project
```bash
npm run build
```

This will:
- Build the Next.js site
- Create the `out` directory
- Automatically run the post-build script
- Create all necessary `index.html` files

### 2. Verify Build Output
Check that these files exist:
```bash
# Check on Windows:
dir out\privacy\index.html
dir out\terms\index.html
dir out\cookies\index.html
dir out\.htaccess
```

All should exist!

### 3. Upload to EasyHost

#### Option A: Via cPanel File Manager (Recommended for first time)

1. **Login to cPanel:**
   - Go to https://www.easyhost.be/cpanel or your cPanel URL
   - Login with your credentials

2. **Open File Manager:**
   - Navigate to **Files** → **File Manager**
   - Go to `public_html` (or `www` or your domain directory)

3. **Clear Old Files (Important!):**
   - Select ALL files in `public_html`
   - Click **Delete** (backup first if needed!)
   - This ensures no old files cause conflicts

4. **Upload New Files:**
   - Click **Upload** button (top right)
   - Select ALL files from your `out` directory
   - OR upload as ZIP:
     ```bash
     # On Windows, create a ZIP of the out folder
     # Then upload and extract in cPanel
     ```

5. **Set Permissions (if needed):**
   - Select `.htaccess` file
   - Click **Permissions** or **Change Permissions**
   - Set to `644` (rw-r--r--)
   - For directories (`privacy/`, `terms/`, `cookies/`): set to `755`

#### Option B: Via FTP (FileZilla)

1. **Connect to FTP:**
   - Host: `ftp.yourdomain.be` or `ftp.easyhost.be`
   - Username: Your EasyHost FTP username
   - Password: Your FTP password
   - Port: 21

2. **Navigate to public_html:**
   - In FileZilla, navigate to `/public_html/` (or `/www/`)

3. **Upload Files:**
   - On your computer (left side): Navigate to the `out` folder
   - Select ALL files and folders
   - Drag to server side (right side)
   - Wait for upload to complete

4. **Verify .htaccess uploaded:**
   - Look for `.htaccess` in `public_html`
   - If you don't see it, you may need to enable "Show hidden files"
   - In FileZilla: **Server** → **Force showing hidden files**

### 4. Verify Deployment

Visit these URLs (replace with your domain):
```
✓ https://fluxive.be/
✓ https://fluxive.be/privacy
✓ https://fluxive.be/privacy/
✓ https://fluxive.be/terms
✓ https://fluxive.be/terms/
✓ https://fluxive.be/cookies
✓ https://fluxive.be/cookies/
```

All should return **200 OK** and display correctly.

## 🐛 Still Getting 403? Try These:

### Fix 1: Check .htaccess Is Working

1. **Test if .htaccess is loaded:**
   - Add this line at the top of `.htaccess`:
     ```apache
     # TEST - REMOVE LATER
     ErrorDocument 403 "htaccess is working"
     ```
   - Try accessing a forbidden directory
   - If you see "htaccess is working", it's loaded
   - Remove the test line

2. **If .htaccess is NOT loaded:**
   - Contact EasyHost support
   - Ask them to enable "AllowOverride All" for your domain
   - Or check cPanel → **Apache Configuration** → **PHP-INI Settings**

### Fix 2: Check File Permissions

Via cPanel File Manager:
```
Files:
- .htaccess       → 644 (rw-r--r--)
- privacy.html    → 644
- terms.html      → 644
- cookies.html    → 644
- privacy/index.html → 644
- terms/index.html   → 644
- cookies/index.html → 644

Directories:
- public_html     → 755 (rwxr-xr-x)
- privacy/        → 755
- terms/          → 755
- cookies/        → 755
```

### Fix 3: Clear EasyHost Cache

EasyHost may cache files:

1. **Via cPanel:**
   - Look for **Caching** or **Performance** section
   - Find **Clear Cache** or **Purge Cache**
   - Click it

2. **Via .htaccess** (add to top):
   ```apache
   # Disable caching for HTML files (temporary for testing)
   <FilesMatch "\.(html)$">
       Header set Cache-Control "no-cache, no-store, must-revalidate"
       Header set Pragma "no-cache"
       Header set Expires 0
   </FilesMatch>
   ```

3. **Browser Cache:**
   - Clear your browser cache
   - Or use incognito/private mode
   - Or hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

### Fix 4: Check Directory Structure

SSH into EasyHost (if available) or use File Manager to verify:

```
public_html/
├── .htaccess          ← Must exist!
├── index.html
├── privacy.html       ← Root file
├── privacy/
│   └── index.html     ← Directory file (important!)
├── terms.html
├── terms/
│   └── index.html
├── cookies.html
├── cookies/
│   └── index.html
└── _next/
    └── ...
```

**Both files must exist:**
- `privacy.html` (root)
- `privacy/index.html` (directory)

## 🔧 EasyHost-Specific Issues

### Issue: Can't Upload .htaccess

**Problem:** cPanel hides `.htaccess` by default

**Solution:**
1. In File Manager, click **Settings** (top right)
2. Check **Show Hidden Files (dotfiles)**
3. Click **Save**
4. You should now see `.htaccess`

### Issue: .htaccess Gets Deleted

**Problem:** Some cPanel configs overwrite .htaccess

**Solution:**
1. Upload `.htaccess`
2. Immediately set permissions to `444` (read-only)
3. This prevents automatic deletion

### Issue: mod_rewrite Not Enabled

**Problem:** Apache rewrite module disabled

**Solution:**
1. Contact EasyHost support: https://www.easyhost.be/contact
2. Ask: "Can you please enable mod_rewrite for my domain?"
3. They usually enable it within 24 hours

### Issue: Working on www but not non-www (or vice versa)

**Problem:** DNS or .htaccess redirect issue

**Solution:** Add to top of `.htaccess`:
```apache
# Force www (or remove www)
RewriteCond %{HTTP_HOST} ^fluxive\.be [NC]
RewriteRule ^(.*)$ https://www.fluxive.be/$1 [L,R=301]

# OR force non-www:
# RewriteCond %{HTTP_HOST} ^www\.fluxive\.be [NC]
# RewriteRule ^(.*)$ https://fluxive.be/$1 [L,R=301]
```

## 📞 EasyHost Support

If problems persist after trying all fixes:

**Contact EasyHost:**
- Website: https://www.easyhost.be/contact
- Email: support@easyhost.be
- Phone: +32 (0)56 72 82 00
- Support Hours: Mon-Fri 9:00-17:00 CET

**What to tell them:**
> "I'm getting 403 errors on these URLs:
> - https://fluxive.be/privacy/
> - https://fluxive.be/terms/
> - https://fluxive.be/cookies/
>
> I have .htaccess configured and index.html files in each directory.
> Can you verify:
> 1. mod_rewrite is enabled
> 2. AllowOverride All is enabled
> 3. File permissions are correct (755 for directories, 644 for files)
>
> Thank you!"

## ✅ Quick Deployment Checklist

- [ ] Run `npm run build`
- [ ] Verify `out/.htaccess` exists
- [ ] Verify `out/privacy/index.html` exists
- [ ] Verify `out/terms/index.html` exists
- [ ] Verify `out/cookies/index.html` exists
- [ ] Delete old files from `public_html` (backup first!)
- [ ] Upload ALL files from `out` to `public_html`
- [ ] Check file permissions (644 for files, 755 for directories)
- [ ] Test all URLs with and without trailing slashes
- [ ] Clear browser cache and test again

## 🚀 Future Deployments

For subsequent deployments:

**Option 1: Automated (Recommended)**
```bash
# Build
npm run build

# Use FTP sync tool (like WinSCP) to upload only changed files
# Or create a deploy script
```

**Option 2: Manual**
1. `npm run build`
2. Upload changed files only via FTP
3. Clear EasyHost cache

## 💡 Pro Tips for EasyHost

1. **Enable Gzip Compression** (in cPanel):
   - **Optimize Website** → **Compress Content**
   - Can speed up site by 70%+

2. **Set Up Email Forwarding**:
   - info@fluxive.be should work for contact form
   - Set up in cPanel → **Email** → **Forwarders**

3. **SSL Certificate**:
   - EasyHost provides free SSL (Let's Encrypt)
   - Activate in cPanel → **Security** → **SSL/TLS Status**

4. **Monitor Uptime**:
   - Use https://uptimerobot.com (free)
   - Get alerts if site goes down

---

**Last Updated:** November 7, 2025
**Tested With:** EasyHost Belgium, Apache 2.4, cPanel
