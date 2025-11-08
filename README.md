# FLUXIVE - Premium IT Services Website

## 🚀 Project Overview

**FLUXIVE** is a modern, premium IT services website built with **Next.js 14+**, **shadcn/ui**, and **Framer Motion**. The site features stunning glassmorphism aesthetics, smooth animations, and a professional cyan/teal/emerald color theme.

## ✨ Features Completed

### 💬 AI Chat Widget (NEW!)
- ✅ **Modern Chat UI**: Vercel AI SDK-inspired design with rounded sidebar
- ✅ **Streaming Responses**: Real-time AI responses with typing indicators
- ✅ **Generative UI**: 8+ dynamic components (pricing tables, feature grids, etc.)
- ✅ **Session Management**: Persistent sessions via localStorage
- ✅ **User Context**: Automatic timezone and local time detection
- ✅ **Mobile Optimized**: Swipe-to-close gesture, responsive design
- ✅ **Modern Animations**: Smooth slide-in/out, message bubbles with avatars
- ✅ **Hybrid Architecture**: Static site + Vercel serverless API
- ✅ **n8n Integration**: Backend automation and AI orchestration

### 🎨 Design & Styling
- ✅ **Glassmorphism UI**: Premium glass-card effects with blur and transparency
- ✅ **Gradient Text**: Beautiful cyan-to-emerald gradient text effects
- ✅ **Custom Scrollbar**: Styled scrollbar matching the theme
- ✅ **Responsive Design**: Fully responsive across all devices
- ✅ **Dark Theme**: Sleek dark mode with glowing accents

### 🎬 Animations
- ✅ **Framer Motion**: Smooth scroll-triggered animations throughout
- ✅ **Particle Background**: Interactive particle system in hero section
- ✅ **Floating Elements**: Animated floating badges and social icons
- ✅ **3D Card Effects**: Service cards with hover tilt effects
- ✅ **Staggered Animations**: Sequential fade-in effects
- ✅ **Counter Animations**: Animated statistics in hero section

### 📄 Sections
- ✅ **Hero Section**: Eye-catching hero with particle background and animated stats
- ✅ **Services Section**: 6 premium service cards with unique colors
  - IT Services (Cyan)
  - Marketing Solutions (Teal)
  - AI Automation (Emerald)
  - Web Development (Cyan)
  - Penetration Testing (Orange)
  - Cybersecurity (Red)
- ✅ **About Section**: Company mission and trust indicators
- ✅ **Testimonials Section**: Carousel with 5 client testimonials using Embla
- ✅ **FAQ Section**: Accordion with 8 frequently asked questions
- ✅ **Contact Form**: Fully validated form with react-hook-form + zod
- ✅ **Navbar**: Glassmorphism navbar with theme toggle and mobile menu
- ✅ **Footer**: Comprehensive footer with links
- ✅ **Floating Social Icons**: Animated social media icons (desktop only)

### 🛠️ Technical Features
- ✅ **Next.js 14+**: Latest App Router architecture
- ✅ **TypeScript**: Fully typed codebase
- ✅ **Tailwind CSS 3**: Utility-first CSS framework
- ✅ **shadcn/ui**: High-quality, accessible components (15+ components)
- ✅ **next-themes**: Dark/light mode with system preference support
- ✅ **Embla Carousel**: Smooth, touch-enabled carousel for testimonials
- ✅ **Radix UI**: Accessible primitives (Accordion, Tooltip, etc.)
- ✅ **Form Validation**: react-hook-form with zod schemas
- ✅ **Toast Notifications**: User feedback on form submission
- ✅ **Dynamic Imports**: Optimized loading for client components
- ✅ **Static Export**: Optimized for Cloudflare Pages deployment

## 🎯 Functional Entry Points

### Main Navigation
- **Home** (`/`): Landing page with all sections
- **Services** (`/#services`): Service offerings showcase
- **About** (`/#about`): Company information and mission
- **Contact** (`/#contact`): Contact form and business info

### Interactive Elements
- **Contact Form**: Submit inquiries with validation
  - Fields: Name, Email, Phone, Company, Service, Budget, Timeline, Message
  - Validation: Real-time error display
  - Submission: Toast notification on success
- **Mobile Menu**: Slide-out navigation on small screens
- **Social Media Links**: Quick access to social platforms
- **Smooth Scrolling**: Animated scroll between sections

## 📊 Data Models & Structure

### Contact Form Schema
```typescript
{
  name: string (min 2 chars)
  email: string (valid email)
  phone?: string (optional)
  company?: string (optional)
  service: enum [IT Services, Marketing, AI, Web Dev, Pen Testing, Cybersecurity]
  budget?: string (optional)
  timeline?: string (optional)
  message: string (min 10 chars)
}
```

### Service Cards Data Structure
```typescript
{
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  color: string (gradient classes)
  bgColor: string
  borderColor: string
}
```

## 🆕 NEW Features (Inspired by BaseHub Template)

### Just Added! 🎉
- ✨ **Dark/Light Theme Toggle**: Seamless theme switching with next-themes
- 🎠 **Testimonials Carousel**: Beautiful Embla carousel with 5 client reviews
- ❓ **FAQ Accordion**: 8 common questions with smooth expand/collapse
- 🎨 **Enhanced UI Components**: Accordion, Tooltip, and more from Radix UI
- 🌈 **Light Mode Support**: Full styling for both dark and light themes
- ⚡ **Dynamic Loading**: Optimized component loading for better performance

### What Makes It Special
- **BaseHub-Inspired**: Modern design patterns from top-tier templates
- **Carousel Navigation**: Touch and mouse wheel support for testimonials
- **Accessible**: ARIA compliant components from Radix UI
- **Theme Persistence**: Remembers user's theme preference

## 🚀 Deployment Status

### Hybrid Architecture

- **Static Site (EasyHost)**: `fluxive.be` - Main website with chat widget
- **Serverless API (Vercel)**: `api.fluxive.be` - Chat API endpoint
- **Backend (n8n)**: AI orchestration and automation workflows

### Deployment Details

- **Platform**: EasyHost (static) + Vercel (API routes)
- **Build Status**: ✅ Production ready
- **Output**: `/out` directory with static HTML/CSS/JS
- **API Endpoint**: `https://api.fluxive.be/api/chat`
- **Tech Stack**: Next.js + React + TypeScript + Tailwind CSS + Framer Motion
- **Last Updated**: November 8, 2025

### Environment Variables

**EasyHost (.env.production)**:

- `NEXT_PUBLIC_SITE_URL=https://fluxive.be`
- `NEXT_PUBLIC_API_URL=https://api.fluxive.be/api/chat`
- `NEXT_PUBLIC_WEB3FORMS_KEY=...`

**Vercel (Dashboard)**:

- `N8N_WEBHOOK_URL=...` (server-side only)



## 📦 Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

## 🎨 Color Palette

- **Primary (Cyan)**: `#06b6d4` - Main brand color
- **Secondary (Teal)**: `#14b8a6` - Accent color
- **Accent (Emerald)**: `#10b981` - Highlight color
- **Background**: Dark gradient (`#0f172a` to `#1e293b`)

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance Optimizations

- **Static Export**: Pre-rendered HTML for fast loading
- **Optimized Images**: Next.js Image component (unoptimized for static)
- **Code Splitting**: Automatic code splitting by Next.js
- **CSS Optimization**: Tailwind CSS purged unused styles
- **Font Optimization**: Google Fonts with Next.js font optimization

## 🔮 Future Enhancements

- [ ] Add CMS integration for dynamic content
- [ ] Implement blog section
- [ ] Add team member profiles
- [ ] Integrate real email service (SendGrid/Mailgun)
- [ ] Add case studies/portfolio section
- [ ] Implement multilingual support
- [ ] Add dark/light theme toggle
- [ ] Integrate analytics (Google Analytics/Plausible)
- [ ] Add testimonials section
- [ ] Implement chatbot for instant support

## 📞 Contact Information

- **Email**: <contact@fluxive.com>
- **Phone**: +1 (555) 123-4567
- **Address**: 123 Tech Street, Silicon Valley, CA 94025
- **Business Hours**: Mon-Fri 9:00 AM - 6:00 PM, Sat 10:00 AM - 4:00 PM

## 📄 License

© 2025 FLUXIVE. All rights reserved.

## 🤝 Contributing

This is a production website. For any suggestions or issues, please contact the development team.

---

### Built with ❤️ using Next.js, shadcn/ui, and Framer Motion

