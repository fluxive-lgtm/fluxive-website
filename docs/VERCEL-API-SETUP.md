# Vercel API Setup Guide

## Architecture Overview

Your website uses a **hybrid deployment model**:

- **EasyHost (Static)**: Main website at `fluxive.be`
- **Vercel (Serverless)**: Chat API at `api.fluxive.be`
- **n8n (Backend)**: AI chatbot webhook (hidden from client)

```
┌─────────────────────────────────────────────────────────────┐
│                    User's Browser                           │
│                     fluxive.be                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Chat request
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Vercel Serverless API                          │
│              api.fluxive.be/api/chat                        │
│         (Hides n8n webhook from client)                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Secure backend call
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    n8n Webhook                              │
│   whise-bibek.app.n8n.cloud/webhook/...                    │
│              (Never exposed to browser)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Vercel Project Details

### **Project Information**
- **Project Name**: `fluxive-api`
- **URL**: https://vercel.com/bibek-projects/fluxive-api
- **Production Domain**: `api.fluxive.be`
- **Auto-generated URL**: `https://fluxive-api-xxx.vercel.app` (backup)

### **Environment Variables**
Set in Vercel dashboard: [Settings → Environment Variables](https://vercel.com/bibek-projects/fluxive-api/settings/environment-variables)

| Variable | Value | Environment |
|----------|-------|-------------|
| `N8N_WEBHOOK_URL` | `https://whise-bibek.app.n8n.cloud/webhook/4fa64e18-ddf7-40c3-8b43-88f7d04749ce` | Production, Preview, Development |

---

## DNS Configuration

### **Domain Setup**
Your DNS provider should have this CNAME record:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `api` | `cname.vercel-dns.com` | Auto/3600 |

This creates: `api.fluxive.be` → Vercel

### **Verify DNS**
```bash
nslookup api.fluxive.be
# Should return: vercel-dns-xxx.com
```

---

## Local Development

### **Environment Files**

**`.env.local` (Local development)**
```bash
# Web3Forms API Key
NEXT_PUBLIC_WEB3FORMS_KEY=dd3d144b-7de6-403f-9f89-26851d23ed82

# Site URL
NEXT_PUBLIC_SITE_URL=https://fluxive.be

# n8n Webhook (for local API testing)
N8N_WEBHOOK_URL=https://whise-bibek.app.n8n.cloud/webhook/4fa64e18-ddf7-40c3-8b43-88f7d04749ce
```

**`.env.production` (For EasyHost static build)**
```bash
# Web3Forms API Key
NEXT_PUBLIC_WEB3FORMS_KEY=dd3d144b-7de6-403f-9f89-26851d23ed82

# Site URL
NEXT_PUBLIC_SITE_URL=https://fluxive.be

# Vercel API URL - Stable custom domain
NEXT_PUBLIC_API_URL=https://api.fluxive.be/api/chat
```

### **Run Locally**
```bash
# Development mode (uses local API route)
npm run dev

# Test production build
npm run build
node serve.js
```

---

## Deployment Workflows

### **Deploy to Vercel (API only)**

```bash
# Deploy to production
vercel --prod

# Or let GitHub auto-deploy (if connected)
git push origin main
```

**When to redeploy Vercel:**
- ✅ Changed API route code (`src/app/api/chat/route.ts`)
- ✅ Updated environment variables
- ✅ Modified Vercel configuration (`vercel.json`)
- ❌ Changed frontend code (use EasyHost workflow instead)

### **Deploy to EasyHost (Static website)**

```bash
# Build static export
npm run build

# Upload 'out' folder to EasyHost via FTP/cPanel
```

**When to rebuild for EasyHost:**
- ✅ Changed frontend components
- ✅ Updated styles or content
- ✅ Modified ChatWidget
- ✅ Changed generative UI components
- ✅ Updated API URL in `.env.production`

---

## File Structure

### **Key Files for Vercel**

```
fluxive-source/
├── src/
│   └── app/
│       └── api/
│           └── chat/
│               ├── route.ts          # API endpoint (Vercel serverless)
│               └── README.md         # API documentation
├── vercel.json                       # Vercel configuration
├── next.config.js                    # Next.js config (auto-detects Vercel)
└── .env.production                   # Production build config
```

### **Important Code Snippets**

**`src/app/api/chat/route.ts`** - The secure proxy:
```typescript
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { message, sessionId } = body
  
  // Get webhook URL from server-side env (hidden from client)
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  
  // Forward to n8n and stream response back
  const response = await fetch(webhookUrl, {
    method: 'POST',
    body: JSON.stringify({ message, sessionId }),
  })
  
  return new NextResponse(response.body, ...)
}
```

**`src/components/ChatWidget.tsx`** - API call:
```typescript
// Use API route (will be on Vercel)
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/chat'

const response = await fetch(apiUrl, {
  method: "POST",
  body: JSON.stringify({ message, sessionId }),
})
```

**`next.config.js`** - Auto-detects environment:
```javascript
const nextConfig = {
  // For EasyHost: build static export
  // For Vercel: enable API routes
  output: process.env.VERCEL ? undefined : 'export',
  images: { unoptimized: true },
}
```

---

## Vercel Configuration

**`vercel.json`** - CORS and security headers:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://fluxive.be"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "POST, OPTIONS"
        }
      ]
    }
  ]
}
```

---

## Testing

### **Test API Endpoint**
```bash
# PowerShell
Invoke-WebRequest -Uri "https://api.fluxive.be/api/chat" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"message":"test","sessionId":"test123"}'

# Should return: Status 200 with streaming response
```

### **Test Full Integration**
1. Open https://fluxive.be
2. Click chat widget
3. Send a message
4. Verify bot responds (check browser Network tab for `api.fluxive.be` calls)

---

## Troubleshooting

### **Chat not responding**

**Check 1:** Verify Vercel API is accessible
```bash
curl https://api.fluxive.be/api/chat
# Should return: Cannot GET /api/chat (404 is expected for GET)
```

**Check 2:** Test with POST request (see Testing section)

**Check 3:** Check Vercel logs
- Go to: https://vercel.com/bibek-projects/fluxive-api
- Click "Logs" tab
- Look for errors

**Check 4:** Verify environment variable
- Go to: https://vercel.com/bibek-projects/fluxive-api/settings/environment-variables
- Ensure `N8N_WEBHOOK_URL` is set
- Redeploy if you just added it: `vercel --prod`

### **CORS errors in browser**

Update `vercel.json` to allow your domain:
```json
{
  "source": "/api/(.*)",
  "headers": [
    {
      "key": "Access-Control-Allow-Origin",
      "value": "https://fluxive.be"
    }
  ]
}
```

Redeploy after changes: `vercel --prod`

### **API URL keeps changing**

If not using custom domain, Vercel generates new URLs per deployment.

**Solution:** Use custom domain `api.fluxive.be` (already configured)

---

## Updating Components

### **Update Chat API Logic**

1. Edit `src/app/api/chat/route.ts`
2. Test locally: `npm run dev`
3. Deploy to Vercel: `vercel --prod`
4. No need to rebuild EasyHost

### **Update Chat Widget UI**

1. Edit `src/components/ChatWidget.tsx` or generative components
2. Build for EasyHost: `npm run build`
3. Upload `out` folder to EasyHost
4. No need to redeploy Vercel

### **Update n8n Webhook URL**

1. Update in Vercel: https://vercel.com/bibek-projects/fluxive-api/settings/environment-variables
2. Change `N8N_WEBHOOK_URL` value
3. Redeploy: `vercel --prod`
4. Update `.env.local` for local testing (optional)

---

## Security Notes

### **What's Secure** ✅
- n8n webhook URL never exposed to browser
- Only Vercel server knows the webhook URL
- CORS limits API access to `fluxive.be` only
- Environment variables encrypted on Vercel

### **What's Visible** ⚠️
- Vercel API URL (`api.fluxive.be`) is visible in browser (expected)
- Web3Forms key is visible (expected for client-side forms)
- Chat messages pass through Vercel before reaching n8n

### **Best Practices**
- ✅ Never commit `.env.local` to Git (in `.gitignore`)
- ✅ Use different webhook URLs for dev/production
- ✅ Monitor Vercel usage (free tier: 100GB bandwidth/month)
- ✅ Add rate limiting in n8n if needed

---

## Cost & Limits

### **Vercel Free Tier**
- ✅ 100GB bandwidth per month
- ✅ Unlimited API requests (within bandwidth)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ⚠️ Serverless function timeout: 10 seconds
- ⚠️ If exceeded: Upgrade to Pro ($20/month)

### **Monitoring Usage**
- Dashboard: https://vercel.com/bibek-projects/fluxive-api/analytics
- Check bandwidth and function executions

---

## Quick Reference Commands

```bash
# Deploy to Vercel
vercel --prod

# Build for EasyHost
npm run build

# Test locally
npm run dev

# Test API endpoint
Invoke-WebRequest -Uri "https://api.fluxive.be/api/chat" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"message":"test","sessionId":"test123"}'

# Check DNS
nslookup api.fluxive.be

# View Vercel logs
vercel logs --prod
```

---

## Support Resources

- **Vercel Dashboard**: https://vercel.com/bibek-projects/fluxive-api
- **Vercel Docs**: https://vercel.com/docs
- **Next.js API Routes**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **n8n Webhooks**: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/

---

## Backup & Recovery

### **If Vercel deployment fails:**
1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Verify environment variables are set
4. Rollback to previous deployment in Vercel dashboard

### **If you need to migrate:**
All code is in your GitHub repo. Just:
1. Connect new Vercel project to GitHub
2. Add environment variable: `N8N_WEBHOOK_URL`
3. Add custom domain: `api.fluxive.be`
4. Update DNS CNAME if needed

---

## Change Log

- **2025-11-08**: Initial Vercel setup
  - Created `fluxive-api` project
  - Added custom domain `api.fluxive.be`
  - Configured CORS for `fluxive.be`
  - Set up n8n webhook integration
  - Deployed API route for secure chat proxy
