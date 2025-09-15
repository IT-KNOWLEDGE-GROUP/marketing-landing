# IT Knowledge Group - Marketing Landing Pages

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Modular landing page system for IT Knowledge Group marketing campaigns, built with layout-oriented components for maximum flexibility and reusability.

## 🎯 Project Overview

This is a **layout-based component system** that enables rapid composition of landing pages for different:
- **Marketing campaigns** (products, services, events)
- **Geographic locations** (Sant Cugat, Barcelona, etc.)
- **Target audiences** (students, professionals, businesses)

**Key Features:**
- 🧩 **Modular Components**: Layout-oriented rather than semantic
- 📝 **Content-Driven**: YAML-based content management
- 🎨 **Consistent Design**: Unified Nuxt UI design system
- 📱 **Responsive**: Mobile-first approach
- ⚡ **Performance**: Static site generation with Nuxt

## 🏗️ Architecture

Built on modern web technologies:
- **Nuxt.js 4** - Full-stack framework
- **Nuxt UI Pro** - Component library
- **Nuxt Content** - Content management
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## 📚 Documentation

For comprehensive development guidelines, component documentation, and best practices, see:

**📖 [AGENTS.md](./AGENTS.md)** - Complete development guide

## 🚀 Quick Start

### Prerequisites
- Node.js 22.5.0+ (for native SQLite connector)
- pnpm (recommended package manager)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the landing page system.

### Available Pages

- `/` - Redirects to main landing page
- `/landing/sant-cugat` - Sant Cugat location landing page

**Production URL**: https://it-knowledge-group.github.io/marketing-landing/

## 📝 Creating a New Landing Page

1. **Create content file**:
   ```bash
   # Create content/landing/{name}.yml
   ```

2. **Add prerender route**:
   ```typescript
   // nuxt.config.ts
   nitro: {
     prerender: {
       routes: ['/', '/landing/{name}']
     }
   }
   ```

3. **Add assets**:
   ```bash
   # Create public/images/landing-{name}/
   ```

4. **Test**: Visit `/landing/{name}`

## 🛠️ Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm generate     # Generate static site
pnpm preview      # Preview production build
pnpm lint         # Run ESLint (required before commits)
pnpm typecheck    # Run TypeScript checks (required before commits)
```

## 📋 Available Components

### Layout Components
- `LandingVerticalSection` - Stacked content layout
- `LandingHorizontalSection` - Side-by-side layout
- `LandingIconEnumSection` - Timeline with icons

### Specialized Components
- `LandingContactSection` - Contact forms
- `LandingAcordeonSection` - FAQ accordions
- `LandingFooter` - Contact information footer

## 🎨 Content Structure

Landing pages are built from YAML files:

```yaml
seo:
  title: "Page Title"
  description: "Page description"

header:
  logo: "/images/logo.svg"

sections:
  - type: "vertical"
    title: "Hero [Title]{.text-primary}"
    description: "Hero description"
    buttons:
      - label: "CTA Button"
        to: "#contact"
        color: "primary"

  - type: "contact"
    title: "Contact Us"
    fields:
      - name: "email"
        type: "email"
        required: true

  - type: "footer"
    address: "Your address"
    phone: "Your phone"
    email: "your@email.com"
```

## 🚀 Deployment

The project includes GitHub Actions for automated deployment. Build artifacts are generated using:

```bash
pnpm generate
```

This creates a `dist/` folder with static files ready for deployment to any static hosting service.

## 🔧 Development Guidelines

- **Always run linting**: `pnpm lint` before commits
- **Type checking**: `pnpm typecheck` before commits
- **Use Nuxt UI components**: Check [ui.nuxt.com](https://ui.nuxt.com) first
- **Follow naming conventions**: kebab-case for files, PascalCase for components
- **Mobile-first**: Design for mobile, enhance for desktop

For detailed development guidelines, see **[AGENTS.md](./AGENTS.md)**.
