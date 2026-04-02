# SEO Local Authority & Link Building Execution Plan

## 1. Google Business Profile (GBP) Review Strategy
Getting from 0 to 30+ reviews is the fastest way to build local trust in Belgium.

### The "Right After Delivery" Workflow
**Who to ask:** Every satisfied client immediately after project delivery (e.g., "Wi-Fi fixed," "Maps ranking improved," "Pentest delivered").
**How to ask:** Send a short, templated email or WhatsApp message.

### Review Prompt Template (Dutch)
> "Hoi [Naam], bedankt voor het vertrouwen in Fluxive! Zou je een korte review willen achterlaten over onze samenwerking? Dit helpt andere bedrijven in [Regio/Ninove] om ons beter te vinden voor [Specifieke Dienst, bijv. sterke Wi-Fi]. Alvast enorm bedankt! [LINK_NAAR_GBP_REVIEW]"

### Review Prompt Template (English)
> "Hi [Name], thanks for trusting Fluxive! Would you mind leaving a quick review about our work together? It really helps other businesses in [Region/Ninove] find us for [Specific Service, e.g., reliable Wi-Fi]. Thanks so much! [LINK_TO_GBP_REVIEW]"

**Action:** Go to your Google Business Profile, click "Ask for reviews," get the short link, and save it in your CRM/Notes to use consistently.

## 2. Link Building Engine (0 to 10+ Referring Domains)
Since Fluxive currently has 0 backlinks, building foundation links will move the needle immediately.

### Wave 1: Local Directories & Citations (Belgium)
Ensure your NAP (Name, Address, Phone) is identical across all platforms:
- **Google Business Profile** (Ensure verified and 100% complete)
- **Apple Maps / Bing Places**
- Local Belgian business directories (e.g., FCR Media / Gouden Gids, local Chamber of Commerce / VOKA, Unizo, local Ninove business directories).

### Wave 2: Partner & Vendor Links
- Reach out to software and hardware vendors whose tools you implement (e.g., Ubiquiti, firewall brands, AI software). Ask to be listed as a "Certified Partner" or "Local Implementer in Belgium" in their directory.

### Wave 3: Case Studies & Digital PR
- **Hospitality focus:** Write a detailed case study: *"How Fluxive eliminated Wi-Fi dead zones for [Hotel Name] in [City]"*. 
- Pitch this case study as a guest post to Belgian hospitality blogs, local tourism boards, or Horeca Vlaanderen newsletters.
- **SME Cybersecurity focus:** Offer to write a free, non-technical guide on "Top 3 Cyber Threats for Belgian SMEs in 2026" for local business networks (like VOKA/Unizo blogs) in exchange for a bio link.

## 3. Server Configuration (HTTPS & HTTP/2)
Since Fluxive's Next.js app is statically exported and served via `serve.js`, the web server sitting in front (Nginx, Apache, or Cloudflare CDN) must handle the HTTPS redirect and HTTP/2 protocol.

### Option A: Cloudflare (Recommended & Easiest)
If you route your DNS through Cloudflare:
1. Go to **SSL/TLS -> Edge Certificates**.
2. Turn ON **Always Use HTTPS** (This achieves the 301 redirect).
3. Under **Network**, ensure **HTTP/2** (or HTTP/3) is toggled ON.

### Option B: Nginx Proxy
If you use Nginx to reverse-proxy port 3000, ensure your server block looks like this:
```nginx
server {
    listen 80;
    server_name fluxive.be www.fluxive.be;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2; # HTTP/2 enabled here
    server_name fluxive.be www.fluxive.be;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
