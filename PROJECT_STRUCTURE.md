# 📁 FLUXIVE Project Structure

## Directory Overview

```
webapp/
├── src/                        # Source code directory
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   ├── page.tsx            # Main page (all sections)
│   │   └── globals.css         # Global styles & glassmorphism
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx      # Button component
│   │   │   ├── card.tsx        # Card components
│   │   │   ├── input.tsx       # Input component
│   │   │   ├── label.tsx       # Label component
│   │   │   ├── textarea.tsx    # Textarea component
│   │   │   ├── badge.tsx       # Badge component
│   │   │   ├── separator.tsx   # Separator component
│   │   │   ├── sheet.tsx       # Sheet (mobile menu) component
│   │   │   ├── toast.tsx       # Toast notification component
│   │   │   ├── toaster.tsx     # Toast provider
│   │   │   └── use-toast.ts    # Toast hook
│   │   ├── Hero.tsx            # Hero section with particles
│   │   ├── Services.tsx        # Services showcase
│   │   ├── About.tsx           # About section
│   │   ├── Contact.tsx         # Contact form
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer section
│   │   └── FloatingSocial.tsx  # Floating social icons
│   └── lib/                    # Utility functions
│       ├── utils.ts            # cn() utility for classnames
│       └── validations.ts      # Zod schemas for forms
├── public/                     # Static assets
│   └── images/                 # Image files
├── out/                        # Build output (static export)
├── .next/                      # Next.js build cache
├── node_modules/               # Dependencies
├── .git/                       # Git repository
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS configuration
├── package.json                # Dependencies & scripts
├── serve.js                    # Static file server
├── ecosystem.config.cjs        # PM2 configuration
├── README.md                   # Project documentation
├── DEPLOYMENT.md               # Deployment guide
└── PROJECT_STRUCTURE.md        # This file
```

## Key Files Explained

### Configuration Files

- **`next.config.js`**: Next.js configuration for static export
- **`tailwind.config.ts`**: Custom colors, fonts, and theme settings
- **`tsconfig.json`**: TypeScript compiler options
- **`postcss.config.mjs`**: PostCSS plugins (Tailwind + Autoprefixer)
- **`ecosystem.config.cjs`**: PM2 process manager configuration

### Source Code

#### App Router (`src/app/`)
- **`layout.tsx`**: Root layout with Google Fonts (Inter, Orbitron) and metadata
- **`page.tsx`**: Main entry point importing all sections
- **`globals.css`**: Custom CSS including glassmorphism effects

#### Components (`src/components/`)

**Main Sections:**
- **`Hero.tsx`**: Landing section with animated particles, stats counter, CTA buttons
- **`Services.tsx`**: 6 service cards with icons and features
- **`About.tsx`**: Company mission and trust indicators
- **`Contact.tsx`**: Contact form with validation and info cards
- **`Navbar.tsx`**: Sticky navigation with glassmorphism and mobile menu
- **`Footer.tsx`**: Footer with links and social icons
- **`FloatingSocial.tsx`**: Fixed floating social media icons (desktop only)

**UI Components (`src/components/ui/`):**
All shadcn/ui components with proper accessibility and variants

#### Utilities (`src/lib/`)
- **`utils.ts`**: `cn()` function for conditional classnames
- **`validations.ts`**: Zod schemas for form validation

### Build Output

- **`out/`**: Static HTML/CSS/JS files ready for deployment
- **`.next/`**: Next.js build cache (can be deleted)

### Static Assets

- **`public/`**: Public assets accessible from root URL
- **`public/images/`**: Image files (currently empty, ready for logos/photos)

## Component Dependencies

```
page.tsx
├── Navbar.tsx
│   ├── Button (shadcn)
│   └── Sheet (shadcn) - mobile menu
├── Hero.tsx
│   ├── Badge (shadcn)
│   ├── Button (shadcn)
│   └── Canvas (custom particles)
├── Services.tsx
│   ├── Card (shadcn)
│   └── Icons (lucide-react)
├── About.tsx
│   ├── Card (shadcn)
│   └── Icons (lucide-react)
├── Contact.tsx
│   ├── Card (shadcn)
│   ├── Input (shadcn)
│   ├── Textarea (shadcn)
│   ├── Label (shadcn)
│   ├── Button (shadcn)
│   ├── Toast (shadcn)
│   └── Form validation (react-hook-form + zod)
├── Footer.tsx
│   ├── Separator (shadcn)
│   └── Icons (lucide-react)
└── FloatingSocial.tsx
    ├── Button (shadcn)
    └── Icons (lucide-react)
```

## Styling Architecture

### Tailwind CSS Layers

1. **Base Layer**: Reset and base styles
2. **Components Layer**: Custom reusable components
   - `.glass-card`: Glassmorphism effect
   - `.glass-strong`: Stronger glass effect
   - `.gradient-text`: Cyan to emerald gradient
   - `.gradient-border`: Animated gradient border
3. **Utilities Layer**: Tailwind utility classes

### Color System

- **Primary (Cyan)**: Brand identity
- **Secondary (Teal)**: Complementary accent
- **Accent (Emerald)**: Highlights and CTAs
- **Background**: Dark gradient (#0f172a → #1e293b)

### Typography

- **Display Font**: Orbitron (headings)
- **Body Font**: Inter (body text)
- **Font Sizes**: Following Tailwind's scale

## Animation System

### Framer Motion

- **Scroll Animations**: `initial`, `whileInView`, `viewport`
- **Hover Effects**: `whileHover` with scale and tilt
- **Stagger Children**: Sequential animations
- **Custom Animations**: Float, glow, particle movement

### CSS Animations

- `@keyframes float`: Floating effect
- `@keyframes glow`: Glowing effect
- Custom scrollbar animation

## Data Flow

### Contact Form

1. User fills form
2. React Hook Form captures input
3. Zod validates data
4. Submit handler processes
5. Toast notification displays
6. Form resets

### Navigation

1. User clicks nav link
2. Smooth scroll to section
3. Mobile menu closes (if open)

## Performance Optimizations

- **Static Export**: Pre-rendered HTML
- **Code Splitting**: Automatic by Next.js
- **CSS Purging**: Tailwind removes unused styles
- **Font Optimization**: Next.js font loading
- **Image Optimization**: Next/Image (configured for static)

## Development Workflow

1. **Development**: `npm run dev` (Next.js dev server)
2. **Build**: `npm run build` (static export to `out/`)
3. **Preview**: `node serve.js` or `pm2 start ecosystem.config.cjs`
4. **Deploy**: Upload `out/` to Cloudflare Pages

## Git Workflow

```bash
# Feature development
git add .
git commit -m "Add feature X"

# Deploy
npm run build
wrangler pages deploy out --project-name fluxive
```

## Adding New Sections

1. Create component in `src/components/NewSection.tsx`
2. Import in `src/app/page.tsx`
3. Add to navigation in `Navbar.tsx`
4. Add ID for smooth scrolling: `<section id="new-section">`
5. Style with Tailwind + glassmorphism classes
6. Add Framer Motion animations

## Modifying Existing Sections

- **Colors**: Edit `tailwind.config.ts`
- **Content**: Edit component files directly
- **Styles**: Use Tailwind classes or add to `globals.css`
- **Animations**: Adjust Framer Motion props

## Testing

- **Local**: `npm run dev` and test in browser
- **Build**: `npm run build` to verify production build
- **Preview**: Start server and test static files
- **Responsive**: Test on different screen sizes
- **Browsers**: Test on Chrome, Firefox, Safari, Edge

## Maintenance

- **Update deps**: `npm update`
- **Security**: `npm audit`
- **Clean build**: `rm -rf .next out && npm run build`

---

**Last Updated:** November 5, 2025
**Version:** 1.0.0
