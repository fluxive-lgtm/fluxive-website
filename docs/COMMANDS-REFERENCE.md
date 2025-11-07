# 📝 FLUXIVE - Commands Reference Guide

## 🚀 Quick Commands

### **Development Mode** (Making Changes)
```bash
npm run dev
```
- Runs on: http://localhost:3000
- Auto-reloads when you edit files
- Hot reload enabled
- Use this when actively coding

**To stop:** Press `Ctrl + C`

---

### **Production Build** (Before Deployment)
```bash
npm run build
```
- Creates optimized production files
- Output goes to `/out` directory
- Checks for TypeScript errors
- Minifies code and optimizes assets

---

### **Test Production Build** (Preview Final Site)
```bash
npx serve@latest out -l 3000
```
- Serves the `/out` folder
- Shows exactly what will be deployed
- No hot reload (it's a static build)
- Use this to test before uploading to server

**To stop:** Press `Ctrl + C`

---

## 🔄 Typical Workflow

### **While Working on the Site:**
```bash
# Start development server
npm run dev

# Make your changes
# See them live at http://localhost:3000

# When done, press Ctrl+C
```

---

### **Before Deploying to Server:**
```bash
# 1. Build the production version
npm run build

# 2. Test the production build locally
npx serve@latest out -l 3000

# 3. Open http://localhost:3000 and test everything
# 4. If all looks good, upload /out folder to your server
# 5. Press Ctrl+C to stop the server
```

---

## 📦 Deployment to Your Server

### **Step 1: Build with Environment Variables**

Make sure `.env.production` has your Web3Forms key:
```bash
NEXT_PUBLIC_SITE_URL=https://fluxive.com
NEXT_PUBLIC_WEB3FORMS_KEY=dd3d144b-7de6-403f-9f89-26851d23ed82
```

Then build:
```bash
npm run build
```

### **Step 2: Upload to Server**

Upload the entire `/out` directory to your server:

**Via FTP/SFTP:**
- Upload contents of `/out` folder to your web root (e.g., `public_html`)

**Via SCP (Linux/SSH):**
```bash
scp -r out/* user@yourserver.com:/var/www/html/
```

**Via cPanel:**
- Go to File Manager
- Navigate to `public_html`
- Upload all files from `/out` directory

---

## 🔧 Other Useful Commands

### **Install Dependencies** (First time setup)
```bash
npm install
```

### **Update Dependencies**
```bash
npm update
```

### **Check for Vulnerabilities**
```bash
npm audit
```

### **Fix Vulnerabilities**
```bash
npm audit fix
```

### **Clean Build** (If having issues)
```bash
# Remove node_modules and reinstall
rmdir /s /q node_modules
npm install

# Remove .next cache
rmdir /s /q .next

# Rebuild
npm run build
```

---

## 🌐 URLs to Test

After starting the server (`npm run dev` or `npx serve@latest out`):

- **Homepage:** http://localhost:3000
- **404 Page:** http://localhost:3000/nonexistent-page
- **Robots.txt:** http://localhost:3000/robots.txt
- **Sitemap:** http://localhost:3000/sitemap.xml
- **Manifest:** http://localhost:3000/manifest.webmanifest

---

## 📊 Command Comparison

| Command | What It Does | When to Use | URL | Hot Reload |
|---------|--------------|-------------|-----|------------|
| `npm run dev` | Development server | While coding | http://localhost:3000 | ✅ Yes |
| `npm run build` | Build for production | Before deploying | N/A | N/A |
| `npx serve@latest out` | Serve production build | Test before deploy | http://localhost:3000 | ❌ No |

---

## ⚠️ Important Notes

### **Development vs Production:**
- **Development** (`npm run dev`): Fast, shows errors clearly, hot reload
- **Production** (`npm run build` → `serve`): Optimized, minified, exactly what users see

### **Always Test Production Build:**
```bash
npm run build
npx serve@latest out -l 3000
```
Before deploying to your server, always test the production build locally!

### **Environment Variables:**
- `.env.local` - For local development
- `.env.production` - For production builds
- Changes require rebuild: `npm run build`

---

## 🆘 Troubleshooting

### **Port 3000 Already in Use:**
```bash
# Use a different port
npx serve@latest out -l 3001
```

### **Build Fails:**
```bash
# Check for TypeScript errors
npm run build

# If errors, fix them in the code
# TypeScript errors will prevent build
```

### **Changes Not Showing:**
```bash
# In development mode - should auto-reload
# If not, restart:
# Press Ctrl+C, then npm run dev again

# In production mode - you MUST rebuild:
npm run build
npx serve@latest out -l 3000
```

### **Contact Form Not Working:**
1. Check `.env.production` has Web3Forms key
2. Rebuild: `npm run build`
3. Test: `npx serve@latest out -l 3000`

---

## 🎯 Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│  FLUXIVE - Quick Commands                       │
├─────────────────────────────────────────────────┤
│  Development:     npm run dev                   │
│  Build:          npm run build                  │
│  Test Build:     npx serve@latest out -l 3000   │
│  Stop Server:    Ctrl + C                       │
├─────────────────────────────────────────────────┤
│  Local URL:      http://localhost:3000          │
│  Contact Email:  info@fluxive.be                │
│  Phone:          +32 472 92 57 41               │
└─────────────────────────────────────────────────┘
```

---

**Save this file for quick reference!** 📌
