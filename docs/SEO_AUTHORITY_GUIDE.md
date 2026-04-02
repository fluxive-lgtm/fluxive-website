# Fluxive.be SEO \u0026 Authority Strategy Guide

This document contains the manual/server-level optimizations and the ongoing authority-building strategy for Fluxive.be to rank competitively in Belgium for IT services.

## 1. Server Configuration: HTTPS Redirect \u0026 HTTP/2
Next.js static exports (`out` directory) cannot handle server redirects or protocol upgrades on their own. These must be configured at your web server or CDN level.

### EasyHost / Apache (`.htaccess`)
If you define routes on EasyHost using Apache, ensure your `.htaccess` forces HTTPS:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Nginx
If running on a VPS using Nginx:
```nginx
server {
    listen 80;
    server_name fluxive.be www.fluxive.be;
    return 301 https://fluxive.be$request_uri;
}

server {
    listen 443 ssl http2; # HTTP/2 enabled here
    server_name fluxive.be;
    
    # SSL config goes here...
}
```

### Cloudflare (Recommended)
If you use Cloudflare (free tier is fine):
1. Go to **SSL/TLS** -\u003e **Edge Certificates** -\u003e Enable **"Always Use HTTPS"**.
2. Go to **Network** -\u003e Ensure **HTTP/2** and **HTTP/3** are toggled *ON*.
3. Go to **Speed** -\u003e **Optimization** -\u003e Enable **Auto Minify** (HTML, CSS, JS) and **Brotli** compression.

---

## 2. Google Business Profile (GBP) Review Strategy
Getting from 0 to 30+ reviews is critical for local trust and Maps SEO.

### Workflow:
1. **Timing:** Ask *immediately* after a successful project or support ticket resolution.
2. **The Ask (Template):**
   \u003e "Hi [Name], glad we could get the [Wi-Fi/Cybersecurity/IT issue] sorted for you! To help other local businesses find us, would you mind leaving a quick 1-2 sentence review here? [LINK] It really helps us out."
3. **What to encourage:** Try to softly encourage them to mention the *service* and *location* (e.g., "Fluxive set up amazing Wi-Fi for our hotel in Ninove").

---

## 3. Link-Building Engine (First Wave)
Because the domain currently has 0 backlinks, you must start building authority. 

### Phase 1: Local \u0026 Foundation
* **Belgian Business Directories:** Get listed consistently with your exact Name, Address, and Phone number (NAP). Focus on high-trust ones first:
  * Golden Pages (Pages d'Or / Gouden Gids)
  * Yelp Belgium
  * Foursquare
  * Local Ninove/East Flanders business directories or Chamber of Commerce.

### Phase 2: Partner/Vendor Links
* Look at the software, hardware, and tools you deploy for clients (e.g., Ubiquiti, specific cybersecurity vendors, Microsoft/Google partner portals).
* Often, these vendors have "Find a Partner" pages. Ensure you are listed and linking back to `https://fluxive.be`.

### Phase 3: Case Studies \u0026 PR
* Pitch your existing success stories (like fixing hotel Wi-Fi) to local hospitality blogs or business networks.
* Write guest posts for Belgian business portals about the "Top 3 Cybersecurity Threats for SMEs in 2024".

---

## 4. Next.js Technical Check
* **Canonical Tags:** Verified as automatically injecting `\u003clink rel=\"canonical\" href=\"https://fluxive.be/...\"\u003e` across all pages.
* **Mobile PageSpeed:** Heavy below-the-fold components (like Contact, FAQ, Testimonials) are now dynamically imported `next/dynamic`. This dramatically reduces the initial unused JavaScript payload.
* **Metadata Alignment:** Titles have been rewritten to hit specific service intents like "Premium IT \u0026 Cybersecurity Partner in Belgium".
