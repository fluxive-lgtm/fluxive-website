# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FLUXIVE is a premium IT services website built with Next.js 14+ (App Router), TypeScript, shadcn/ui, and Framer Motion. The site features glassmorphism aesthetics, smooth animations, and is configured for static export deployment on Cloudflare Pages.

## Development Commands

### Core Commands
```bash
# Development server (runs on port 3000)
npm run dev

# Production build (generates static export in /out directory)
npm run build

# Production server (serves the built application)
npm start

# Linting
npm run lint
```

### Important Notes
- The project is configured for **static export** (`output: 'export'` in next.config.js)
- TypeScript build errors are ignored (`ignoreBuildErrors: true`)
- Images are unoptimized for static export compatibility

## Architecture Overview

### Application Structure

**Single-Page Layout**: The site is a single-page application with smooth scroll navigation between sections. All sections are rendered on the homepage (`src/app/page.tsx`).

**Component Organization**:
- `src/app/layout.tsx` - Root layout with font configuration (Inter + Orbitron), ThemeProvider, MouseTrail effect, and Toaster
- `src/app/page.tsx` - Main page assembling all sections in order: Navbar → Hero → Services → About → Testimonials → FAQ → Contact → Footer → FloatingSocial
- `src/components/` - Page section components (Hero, Services, About, etc.)
- `src/components/ui/` - shadcn/ui components (Button, Card, Input, Toast, etc.)

### Key Architectural Patterns

**Theme System**: Uses `next-themes` for dark/light mode switching with system preference support. ThemeProvider wraps the entire application at the root layout level.

**Form Handling**: Contact form uses `react-hook-form` with `zod` validation via `@hookform/resolvers`. Form schema should be imported from `@/lib/validations` (note: this file may need to be created if missing).

**Animations**: Framer Motion powers all animations with scroll-triggered effects using `whileInView` and `viewport={{ once: true }}` for performance. Common pattern:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
```

**Client Components**: Animation-heavy components use `"use client"` directive (Hero, Services, Contact, Testimonials, FAQ, etc.). This is required for Framer Motion and interactive hooks.

### Styling System

**Glassmorphism Classes**: Custom utility classes defined in globals.css:
- `.glass-card` - Standard glass effect with subtle backdrop blur
- `.glass-strong` - More pronounced glass effect
- `.gradient-text` - Cyan-to-emerald gradient text effect

**Color Palette**:
- Primary colors use cyan/teal/emerald gradients (#00DC82 Nuxt green)
- Custom color scales defined in tailwind.config.ts (primary-500, secondary-500, accent-500)
- Theme-aware colors via CSS variables (--primary, --background, etc.)

**Font Configuration**:
- Body font: Inter (`--font-inter`)
- Display font: Orbitron (`--font-orbitron`) used for headings via `font-display` class

### Component-Specific Architecture

**Services Section**: Service cards are defined as a data array with icon, title, description, features, and color scheme. Uses TiltCard wrapper for 3D hover effects.

**Contact Form**: Controlled form with real-time validation. Currently simulates API submission with 1.5s delay. Toast notifications provide user feedback.

**Testimonials**: Uses Embla Carousel (`embla-carousel-react`) for touch-enabled, responsive testimonial slider.

**FAQ**: Built with Radix UI Accordion for accessible expand/collapse behavior.

**Navbar**: Glassmorphic navbar with mobile responsive menu (Sheet component). Includes theme toggle and smooth scroll navigation to section IDs.

### Path Aliases

TypeScript is configured with `@/*` path alias pointing to `./src/*`. Always use this alias for imports:
```tsx
import { Button } from "@/components/ui/button"
import Contact from "@/components/Contact"
```

### Static Export Configuration

The project is configured for static site generation:
- No server-side features (API routes, ISR, etc.)
- All images must be unoptimized
- Contact form submission needs external service integration (currently mocked)
- Build output goes to `/out` directory

### PM2 Configuration

The `ecosystem.config.cjs` file configures PM2 to serve the production build using a `serve.js` script (ensure this file exists before deploying with PM2).

## Common Patterns

### Adding New Sections
1. Create component in `src/components/`
2. Add `"use client"` if using Framer Motion or hooks
3. Wrap content in Framer Motion with scroll animations
4. Import and add to `src/app/page.tsx` in desired order
5. Update navbar links if needed

### Adding New Service Cards
Edit the `services` array in `src/components/Services.tsx`. Each service requires: icon (from lucide-react), title, description, features array, and color scheme (color gradient, bgColor, borderColor).

### Form Validation
Forms should use react-hook-form + zod. Reference Contact.tsx for the pattern. Validation schemas should be defined in `src/lib/validations.ts` (create if missing).

## Deployment

The site is optimized for Cloudflare Pages deployment:
1. Run `npm run build` to generate static export in `/out`
2. Deploy `/out` directory to Cloudflare Pages
3. No environment variables or build configuration needed for basic deployment

## Known Considerations

- Contact form currently has simulated submission - integrate with SendGrid, Mailgun, or serverless function for production
- TypeScript errors are ignored during build - address type issues before production deployment
- No CMS integration - all content is hardcoded in components
- PM2 deployment requires a `serve.js` file (not currently in repository)
