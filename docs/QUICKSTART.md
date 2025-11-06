# 🚀 FLUXIVE - Quick Start Guide

Get up and running with FLUXIVE website in less than 5 minutes!

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- A code editor (VS Code recommended)
- Git (optional, for version control)

## ⚡ Quick Start (3 Steps)

### Step 1: Extract & Navigate

```bash
# Extract the downloaded archive
tar -xzf fluxive-source-code.tar.gz

# Navigate to the project directory
cd home/user/fluxive-source
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install
```

This will install:
- Next.js 14.2.18
- React 18
- TypeScript 5.6.3
- Tailwind CSS 3.4.0
- Framer Motion
- shadcn/ui components
- And all other dependencies

### Step 3: Run Development Server

```bash
# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

The page will auto-reload when you make changes!

---

## 🎨 What You'll See

After starting the dev server, you'll see:

- ✨ **Hero Section** with particle animation and animated stats
- 🎯 **Services Section** with 6 interactive service cards
- 👥 **About Section** with company mission
- 💬 **Testimonials Carousel** with client reviews
- ❓ **FAQ Accordion** with common questions
- 📬 **Contact Form** with validation
- 🌓 **Dark/Light Theme Toggle** in the navbar

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build for production
npm start            # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

---

## 🏗️ Project Structure

```
fluxive-source/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── globals.css   # Global styles & Tailwind
│   │   ├── layout.tsx    # Root layout with providers
│   │   └── page.tsx      # Homepage
│   └── components/       # React components
│       ├── ui/           # shadcn/ui components
│       ├── Hero.tsx      # Hero section
│       ├── Services.tsx  # Services section
│       ├── About.tsx     # About section
│       ├── Contact.tsx   # Contact form
│       ├── Navbar.tsx    # Navigation bar
│       ├── Footer.tsx    # Footer
│       ├── MouseTrail.tsx    # Cursor trail effect
│       ├── TiltCard.tsx      # 3D tilt effect
│       ├── MagneticButton.tsx # Magnetic button effect
│       └── ...
├── public/               # Static assets
│   ├── fluxive-logo-dark.png   # Logo for dark mode
│   ├── fluxive-logo-light.png  # Logo for light mode
│   └── favicon.png             # Browser icon
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.ts    # Tailwind CSS config
├── next.config.js        # Next.js config
└── README.md             # Full documentation
```

---

## 🎨 Customization Guide

### Change Brand Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        500: '#00DC82', // Change this to your brand color
        // ...
      }
    }
  }
}
```

### Update Company Info

Edit `src/components/Contact.tsx`:

```typescript
// Update contact information
const contactInfo = [
  { icon: Mail, text: "your-email@company.com" },
  { icon: Phone, text: "+1 (555) YOUR-NUMBER" },
  // ...
];
```

### Modify Services

Edit `src/components/Services.tsx`:

```typescript
const services = [
  {
    icon: Server,
    title: "Your Service Name",
    description: "Your service description",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    // ...
  },
  // Add more services
];
```

### Change Logo

Replace files in `public/`:
- `fluxive-logo-dark.png` - Logo for dark theme
- `fluxive-logo-light.png` - Logo for light theme
- `favicon.png` - Browser tab icon

---

## 🚀 Deployment

### Deploy to Cloudflare Pages

```bash
# 1. Build the project
npm run build

# 2. Install Wrangler CLI (if not installed)
npm install -g wrangler

# 3. Login to Cloudflare
wrangler login

# 4. Deploy to Cloudflare Pages
wrangler pages deploy out --project-name your-project-name
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --dir=out --prod
```

---

## 🛠️ Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clean Next.js cache
rm -rf .next
npm run build
```

---

## 📚 Tech Stack Details

- **Framework**: Next.js 14.2.18 (App Router)
- **Language**: TypeScript 5.6.3
- **Styling**: Tailwind CSS 3.4.0
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Theme**: next-themes
- **Forms**: react-hook-form + zod validation
- **Icons**: Lucide React
- **Fonts**: Inter & Orbitron (Google Fonts)

---

## 🎯 Key Features

✨ **Interactive Effects**
- Mouse cursor trail with particle animation
- 3D tilt effect on service cards
- Magnetic button hover effect
- Smooth scroll animations
- Particle background in hero section

🎨 **Design**
- Glassmorphism UI with blur effects
- Nuxt green color theme (#00DC82)
- Theme-aware logos (dark/light mode)
- Responsive design (mobile, tablet, desktop)
- Professional gradient text effects

🚀 **Performance**
- Static site generation (SSG)
- Optimized images and fonts
- Code splitting
- Fast page loads

---

## 📞 Need Help?

- 📖 **Full Documentation**: See `README.md`
- 🌐 **Live Preview**: https://3000-iqyfuzmnmsbi92lfefilz-d0b9e1e2.sandbox.novita.ai
- 💬 **Issues**: Contact the development team

---

## ✅ Checklist After Setup

- [ ] Project runs on localhost:3000
- [ ] All sections are visible
- [ ] Theme toggle works (dark/light)
- [ ] Animations are smooth
- [ ] Contact form validation works
- [ ] Mobile menu works on small screens
- [ ] Logos display correctly in both themes

---

**Congratulations! 🎉 You're all set up and ready to build something amazing!**

Made with ❤️ using Next.js, TypeScript, and Tailwind CSS
