# 🚀 Quick Start: Deploy FLUXIVE in 15 Minutes

## ⚡ Fast Track to Production

Your site is **100% production-ready**. Follow these 4 steps:

---

## Step 1: Get Web3Forms Key (5 min)

1. Visit: https://web3forms.com
2. Sign up (free)
3. Create form → Set email: **info@fluxive.be**
4. **Copy your Access Key** (you'll need it in Step 3)

---

## Step 2: Deploy to Cloudflare Pages (5 min)

### Method A: GitHub (Recommended)
```bash
# If code is not in GitHub yet:
git add .
git commit -m "Production ready"
git push origin main
```

Then:
1. Go to https://dash.cloudflare.com → Pages
2. Click "Create a project"
3. Connect GitHub → Select your repo
4. Build settings:
   - Build command: `npm run build`
   - Build output: `out`
5. Click "Save and Deploy"

### Method B: Direct Upload (Faster)
```bash
# Build is already done! Just deploy:
npm install -g wrangler
wrangler login
wrangler pages deploy out --project-name fluxive
```

---

## Step 3: Set Environment Variables (2 min)

**CRITICAL**: Without these, contact form won't work!

In Cloudflare dashboard → Your project → Settings → Environment variables:

Add for **Production environment**:

```
NEXT_PUBLIC_WEB3FORMS_KEY = [Your key from Step 1]
NEXT_PUBLIC_SITE_URL = https://fluxive.com
```

Click "Save" → Redeploy the site

---

## Step 4: Test Your Live Site (3 min)

1. ✅ Visit your site (https://fluxive.pages.dev or https://fluxive.com)
2. ✅ Fill out contact form and submit
3. ✅ Check info@fluxive.be for email
4. ✅ Test dark/light mode toggle
5. ✅ Visit /robots.txt (should load)
6. ✅ Test on mobile

---

## ✅ Done! You're Live! 🎉

### What's Working:
- Contact form → info@fluxive.be
- Phone: +32 472 92 57 41
- Dark/Light theme toggle
- Mobile responsive
- SEO optimized
- Security headers enabled

### What to Update Later (Optional):
- Social media URLs (currently placeholders)
- Add testimonials back
- Set up analytics

---

## 📁 Quick Reference

**Your contact info:**
- Email: info@fluxive.be
- Phone: +32 472 92 57 41

**Domain:** https://fluxive.com

**Social media** (update these URLs later):
- Files: `src/components/Footer.tsx` & `src/components/FloatingSocial.tsx`

**Build command:** `npm run build`

**Deploy folder:** `/out`

---

## 🆘 Need Help?

**Contact form not working?**
1. Check Web3Forms dashboard
2. Verify env var is set in Cloudflare
3. Check spam folder

**Build failing?**
- Already built successfully!
- Output is in `/out` directory

**Questions?**
- Read PRODUCTION-READY.md (detailed guide)
- Read DEPLOYMENT.md (full deployment docs)

---

## 🎯 Summary

You have:
✅ Production build ready (`/out` folder)
✅ All critical issues fixed
✅ Contact form integrated
✅ Security hardened
✅ SEO optimized

Just do Steps 1-4 above and **you're live!**

**Time estimate: 15 minutes total** ⏱️
