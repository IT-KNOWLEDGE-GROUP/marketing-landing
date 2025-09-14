# AGENTS.md

This file provides comprehensive guidance to AI agents (Claude Code, Cursor, etc.) when working with this repository.

## 🎯 Project Purpose

This repository is designed to **facilitate the composition of modular landing pages** using a layout-based component system. Rather than semantic components (like "Hero" or "CTA"), this system uses **layout-oriented components** that can be combined and reused to create diverse landing page experiences.

Each landing page is built by composing layout components like `LandingVerticalSection`, `LandingHorizontalSection`, `LandingGridSection`, etc. This approach enables rapid iteration and flexible page creation for different marketing campaigns, products, or audiences.

**Key Architecture**: Layout-based component system with modular composition, built on Nuxt.js 4 + Nuxt UI Pro + Nuxt Content.

## 🗂️ Project Structure

```
app/
├── pages/
│   ├── index.vue                    # Root redirect to main landing
│   └── landing/
│       └── [slug].vue              # Dynamic landing pages (/landing/sant-cugat, etc.)
├── components/
│   └── landing/
│       ├── LandingContent.vue       # Main content orchestrator
│       ├── LandingSections.vue      # Section renderer
│       ├── LandingHeader.vue        # Landing page header
│       └── sections/                # Individual section components
│           ├── LandingVerticalSection.vue
│           ├── LandingHorizontalSection.vue
│           ├── LandingIconEnumSection.vue
│           ├── LandingContactSection.vue
│           ├── LandingAcordeonSection.vue
│           └── LandingFooter.vue
├── layouts/
│   └── landing.vue                  # Landing page layout
├── assets/css/
│   ├── main.css                     # Global styles
│   └── landing/
│       └── codelearn.css           # Landing-specific styles
└── app.vue                         # Root component

content/
└── landing/
    └── sant-cugat.yml              # Sant Cugat landing content

public/
├── images/
│   ├── flags/                      # Country/language flags
│   ├── landing-sant-cugat/         # Sant Cugat specific assets
│   └── testimonials/               # Testimonial images
└── logos/                          # Brand assets
```

## 🧩 Layout-Based Component System

This repository implements a **layout-first approach** to building landing pages. Instead of semantic components like "Hero" or "CTA", we use layout-oriented components that can be repurposed for different content types.

### 🔄 **Implemented Layout Components**

#### **LandingVerticalSection**
- **Layout**: Content stacked vertically, centered
- **Use Cases**: Heroes, introductions, announcements, centered CTAs
- **Props**:
  - `title` (required) - Supports markdown inline
  - `description` - Supports markdown inline
  - `headline` - Optional headline above title
  - `image` - Object with `desktop`, `mobile`, `alt` properties or direct string
  - `buttons` - Array of button objects with `label`, `to`, `href`, `icon`, `color`, `variant`, `size`, `target`
  - `caption` - Image caption text
  - `background` - 'white' | 'gray' | 'dark' | 'gradient' | 'image'
  - `background_image` - URL for background image
  - `padding`, `textAlign`, `maxWidth` - Layout control
- **Features**: Responsive images, background image support, markdown processing

#### **LandingHorizontalSection**
- **Layout**: Two-column side-by-side layout with configurable image placement
- **Use Cases**: Feature explanations with images, comparisons, product showcases
- **Props**:
  - `title` (required) - Supports markdown inline
  - `description` - Supports markdown inline
  - `content` - Additional content paragraph
  - `headline` - Optional headline above title
  - `image` - Object with `src` and `alt` properties
  - `bullets` - Array of bullet point strings
  - `footer` - Footer text with markdown support
  - `buttons` - Array of button objects
  - `layout` - 'image-left' | 'image-right' (controls image placement)
  - `background` - Background variant
- **Features**: Flexible image positioning, bullet lists, markdown processing

#### **LandingIconEnumSection**
- **Layout**: Two-column layout with content on left and timeline on right
- **Use Cases**: Benefits showcase, process steps, feature enumeration with icons
- **Props**:
  - `title` (required) - Main title with markdown support
  - `subtitle` - Optional subtitle with markdown
  - `description` - Additional description text with markdown
  - `items` - Array of objects with `icon`, `title`, `content`
  - `buttons` - Array of button objects
  - `background` - Background variant
- **Features**: Uses UTimeline component, icon display, grid layout

### 📦 **Content Structure Components**

#### **LandingGridSection**
- **Layout**: Responsive grid (2, 3, or 4 columns)
- **Use Cases**: Features, benefits, services, team members
- **Props**: `title`, `description`, `items[]`, `columns` (2/3/4), `layout`
- **Current Implementation**: `LandingBenefitsSection`

#### **LandingListSection**
- **Layout**: Vertical list with icons/numbers
- **Use Cases**: Process steps, advantages, feature lists
- **Props**: `title`, `description`, `items[]`, `style` (`bullets`/`numbers`/`icons`)

#### **LandingTimelineSection**
- **Layout**: Timeline (vertical or horizontal)
- **Use Cases**: Company history, product roadmap, process flow
- **Props**: `title`, `items[]`, `orientation` (`vertical`/`horizontal`)

### 🎨 **Background/Visual Components**

#### **LandingBandSection**
- **Layout**: Full-width with background (image/color/gradient)
- **Use Cases**: Highlighted CTAs, quotes, visual separators
- **Props**: `title`, `description`, `background`, `overlay`, `buttons`
- **Current Implementation**: `LandingCtaBandSection`

#### **LandingOverlaySection**
- **Layout**: Content over background image with customizable overlay
- **Use Cases**: Dramatic headers, impactful CTAs
- **Props**: `title`, `description`, `backgroundImage`, `overlayColor`, `buttons`

### 📝 **Specialized Content Components**

#### **LandingContactSection**
- **Layout**: Centered contact form with title
- **Use Cases**: Contact forms, lead capture, user registration
- **Props**:
  - `contact` - Contact section data object containing:
    - `title` - Section title
    - `subtitle` - Section subtitle
    - `fields` - Array of form field definitions with properties:
      - `name` - Field identifier
      - `label` - Field label
      - `type` - 'text' | 'email' | 'tel' | 'number' | 'textarea'
      - `placeholder` - Field placeholder text
      - `min`, `max` - Number field constraints
      - `required` - Boolean validation
    - `buttons` - Button configuration object
    - `contact_info` - Contact information (`address`, `phone`, `email`)
- **Features**: Form validation, responsive design, Nuxt UI components

#### **LandingAcordeonSection**
- **Layout**: Accordion-style expandable FAQ list
- **Use Cases**: FAQs, expandable content sections, documentation
- **Props**:
  - `section` - Section data object containing:
    - `title` - Section title
    - `subtitle` - Optional subtitle
    - `description` - Section description
    - `class` - CSS classes for styling
    - `background` - Background variant
    - `background_image` - Background image URL
    - `items` - Array of accordion items with:
      - `question` - Question text (becomes accordion header)
      - `answer` - Answer text (becomes accordion content)
- **Features**: Uses UAccordion component, HTML content support, responsive design

#### **LandingFooter**
- **Layout**: Horizontal footer with contact information
- **Use Cases**: Page footer, contact information display
- **Props**:
  - `footer` - Footer data object containing:
    - `address` - Physical address with map pin icon
    - `phone` - Phone number with phone icon
    - `email` - Email address with mail icon
- **Features**: Responsive layout, icon integration with Lucide icons, green brand styling

#### **LandingTestimonialSection**
- **Layout**: Testimonials with photos, names, and quotes
- **Use Cases**: Reviews, success stories, social proof
- **Props**: `title`, `testimonials[]`, `layout` (`single`/`grid`/`carousel`)

#### **LandingPricingSection**
- **Layout**: Pricing cards in grid layout
- **Use Cases**: Service plans, product tiers, subscriptions
- **Props**: `title`, `description`, `plans[]`, `highlight`

### 📊 **Data Display Components**

#### **LandingStatsSection**
- **Layout**: Large numbers with descriptive labels
- **Use Cases**: Company metrics, achievements, KPIs
- **Props**: `title`, `stats[]` (`number`, `label`, `suffix`)

#### **LandingComparisonSection**
- **Layout**: Comparison table or before/after display
- **Use Cases**: Competitor comparison, feature matrices
- **Props**: `title`, `items[]`, `highlight`

### 🖼️ **Media Components**

#### **LandingGallerySection**
- **Layout**: Grid of images/videos with optional lightbox
- **Use Cases**: Portfolio, case studies, product gallery
- **Props**: `title`, `items[]`, `columns`, `lightbox`

#### **LandingVideoSection**
- **Layout**: Centered video with controls
- **Use Cases**: Product demos, explanatory videos
- **Props**: `title`, `description`, `videoUrl`, `poster`, `autoplay`

### 🔗 **Navigation/Resource Components**

#### **LandingLinkGridSection**
- **Layout**: Grid of clickable cards
- **Use Cases**: Resource links, documentation, categories
- **Props**: `title`, `links[]` (`title`, `description`, `icon`, `url`)

#### **LandingFaqSection**
- **Layout**: Accordion-style FAQ list
- **Use Cases**: Common questions, support documentation
- **Props**: `title`, `faqs[]` (`question`, `answer`), `defaultOpen`

### ⚡ **Specialized Interactive Components**

#### **LandingCountdownSection**
- **Layout**: Countdown timer with CTA
- **Use Cases**: Limited offers, event launches, urgency creation
- **Props**: `title`, `targetDate`, `description`, `buttons`

#### **LandingNewsletterSection**
- **Layout**: Email input with subscribe button
- **Use Cases**: Newsletter signup, lead capture
- **Props**: `title`, `description`, `placeholder`, `buttonText`

#### **LandingSocialProofSection**
- **Layout**: Logo grid or carousel
- **Use Cases**: Client logos, partner badges, trust indicators
- **Props**: `title`, `logos[]`, `layout` (`grid`/`carousel`)

### 🎯 **Component Composition Philosophy**

1. **Layout Over Semantics**: Components are named by their visual layout, not their business purpose
2. **Reusability**: The same component can serve different content purposes
3. **Modularity**: Mix and match components like building blocks
4. **Consistency**: Unified design system across all layout types
5. **Flexibility**: Easy to iterate and experiment with different page structures

### 🛠️ **Unified Props System**

All components share a common base interface:

```typescript
interface BaseSectionProps {
  title?: string
  description?: string
  background?: 'white' | 'gray' | 'dark' | 'gradient' | 'image'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  textAlign?: 'left' | 'center' | 'right'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  class?: string
  id?: string
}
```

### ✨ **Benefits of This Approach**

- **🚀 Faster Development**: Reuse layouts for different purposes
- **🔄 Easy Iteration**: Change page structure without rebuilding components
- **📱 Consistent Design**: Unified styling across all sections
- **🎯 Better Testing**: Test layout logic separately from content
- **📈 Scalable**: Add new layouts without affecting existing ones
- **🧩 Composable**: Create unique pages by combining different layouts

## ⚡ Development Commands

- **Install**: `pnpm install`
- **Dev server**: `pnpm dev` (http://localhost:3000)
- **Build**: `pnpm build`
- **Preview**: `pnpm preview`
- **Lint**: `pnpm lint` ⚠️ **Always run before commits**
- **Typecheck**: `pnpm typecheck` ⚠️ **Always run before commits**

## 📝 Creating a New Landing Page

### Step 1: Create Content File

Create `content/landing-{name}.yml` using the layout-based approach:

```yaml
seo:
  title: "Your Landing Title"
  description: "SEO description under 160 characters"

# Layout-based sections - compose as needed
sections:
  # Hero section using vertical layout
  - type: "vertical"
    title: "Main [value proposition]{.text-primary}"
    description: "Hero subtitle describing the value proposition"
    image: "/images/landing-{name}/hero.jpg"
    background: "dark"
    buttons:
      - label: "Primary CTA"
        icon: i-lucide-arrow-right
        color: primary
        to: "/signup"
      - label: "Secondary CTA"
        variant: outline
        to: "#demo"

  # Feature explanation using horizontal layout
  - type: "horizontal"
    orientation: "image-left"
    title: "Feature Title"
    description: "Feature description with benefits"
    image: "/images/landing-{name}/feature.jpg"
    background: "white"

  # Benefits using grid layout
  - type: "grid"
    title: "Why Choose Us"
    description: "Key benefits of our solution"
    columns: 3
    items:
      - title: "Benefit 1"
        description: "Benefit explanation"
        icon: "💡"
      - title: "Benefit 2"
        description: "Benefit explanation"
        icon: "🚀"

  # Call-to-action using band layout
  - type: "band"
    title: "Ready to Get Started?"
    description: "Join thousands of satisfied customers"
    background: "gradient"
    buttons:
      - label: "Start Free Trial"
        color: primary
        to: "/signup"

  # Contact form
  - type: "form"
    title: "Get In Touch"
    description: "We'd love to hear from you"
    fields:
      - name: "email"
        type: "email"
        label: "Email Address"
        required: true
      - name: "message"
        type: "textarea"
        label: "Message"
        required: true
```

### Step 2: Add Route Configuration

Update `nuxt.config.ts` prerender routes:

```typescript
nitro: {
  prerender: {
    routes: [
      '/',
      '/landing/{name}'  // Note: actual URL structure uses /landing/name
    ]
  }
}
```

### Step 3: Create Assets

1. Create `/public/images/landing-{name}/` folder
2. Add light/dark theme variants: `hero-desktop.svg`, `hero-mobile.svg`
3. Optimize images (use SVGs when possible, WebP for photos)

### Step 4: Update Content Schema (if needed)

If adding new content types, update `content.config.ts`:

```typescript
// Add new schema definitions following existing patterns
const createNewSectionSchema = () => z.object({
  // Define your schema
})
```

## 🎨 Design & Development Guidelines

### **MANDATORY: Use Nuxt UI Components First**

**⚠️ NEVER create custom components when Nuxt UI equivalents exist.**

Check https://ui.nuxt.com/components before building anything:

- **Buttons**: Use `UButton` with proper variants
- **Cards**: Use `UCard` for content blocks
- **Forms**: Use `UInput`, `UTextarea`, etc.
- **Navigation**: Use `UHeader`, `UFooter`
- **Icons**: Use `UIcon` with Iconify (i-lucide-*, i-simple-icons-*)

### Naming Conventions

- **Files**: kebab-case (`landing-crypto.yml`, `hero-section.vue`)
- **Components**: PascalCase (`AppHeader.vue`, `FeatureGrid.vue`)
- **Routes**: kebab-case (`/landing-crypto`, `/product-saas`)
- **Content keys**: camelCase (`heroSection`, `callToAction`)
- **CSS classes**: kebab-case following Nuxt UI patterns

### CSS Guidelines

- **Primary**: Use Nuxt UI utility classes
- **Custom styles**: Only in `assets/css/main.css` or component `<style>` blocks
- **Responsive**: Mobile-first approach with Tailwind breakpoints
- **Theme support**: Always provide light/dark variants

## ✅ Pre-Commit Checklist

### SEO Optimization
- [ ] Meta title ≤ 60 characters
- [ ] Meta description ≤ 160 characters
- [ ] Hero title includes primary keyword
- [ ] All images have alt text
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Internal/external links configured correctly

### Performance
- [ ] Images optimized (SVG preferred, WebP for photos)
- [ ] No unused components imported
- [ ] Lazy loading for below-fold content
- [ ] Prerender route added to `nuxt.config.ts`
- [ ] Build passes without warnings: `pnpm build`

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Screen reader friendly (proper ARIA labels)
- [ ] Alternative text for all images

### Code Quality
- [ ] TypeScript errors resolved: `pnpm typecheck`
- [ ] Linting passes: `pnpm lint`
- [ ] Content schema validates in `content.config.ts`
- [ ] No console.log statements in production code

## 🚀 Pull Request Guidelines

### **Before Opening PR**

1. **Run full validation**:
   ```bash
   pnpm lint && pnpm typecheck && pnpm build
   ```

2. **Test all landing pages**:
   - Root page loads correctly
   - Dynamic routes work (`/landing-{name}`)
   - Images load in light/dark modes
   - CTAs link to correct destinations

### **PR Description Template**

```markdown
## 🎯 Landing Page: [Name]

**Purpose**: [Campaign/Product/Audience this targets]

### ✅ Changes Made
- [ ] Created content file: `content/landing-{name}.yml`
- [ ] Added prerender route to `nuxt.config.ts`
- [ ] Uploaded optimized assets to `/public/images/landing-{name}/`
- [ ] Validated content schema
- [ ] Tested responsive design
- [ ] Verified SEO meta tags

### 🔍 Testing Done
- [ ] Desktop/mobile responsive ✅
- [ ] Light/dark theme switching ✅
- [ ] All CTAs functional ✅
- [ ] Build passes without errors ✅
- [ ] Performance audit score > 90 ✅

### 📊 Performance
- Lighthouse score: [XX]/100
- Bundle size impact: [+XX KB]

### 🔗 Preview
- Local: http://localhost:3000/landing-{name}
- Staging: [URL when deployed]
```

## 📝 Commit Message Convention

Follow Conventional Commits specification for consistent git history

### Format
```
<type>(<scope>): <description>
```

The scope is optional.

### Commit Types
- `feat`: New features or functionality
- `fix`: Bug fixes
- `refactor`: Code improvements without behavior changes
- `chore`: Maintenance, dependencies, build tasks
- `doc`: Documentation updates
- `test`: Testing related changes
- `style`: Code formatting, linting fixes
- `content`: Content updates

### Examples (from project history)
```bash
fix: fix bug
feat(i18n): add internationalization support
chore(deps): bump packages
doc(readme): update readme with last updates
feat(debug): add debug layer
```

### Rules
- Use present tense: "add" not "added"
- Start description with lowercase
- No period at the end
- Keep total message under 72 characters
- Be descriptive but concise
- Focus on what and why, not how

## 📚 Nuxt Content v3 Notes

**IMPORTANT**: This project uses Nuxt Content v3 with a simplified approach:

### Content Access Pattern
```vue
<script setup>
// Direct import approach (recommended for type safety)
import contentData from '@/content/landing-name.yml'
const data = contentData

// Alternative: Use queryCollection (requires proper schema setup)
// const { data } = await queryCollection('content').where({ _source: 'landing-name.yml' }).first()
</script>
```

### Schema Configuration
- Content collections defined in `content.config.ts`
- Use `source: '*.yml'` to include all YAML files
- Schema must match all possible content structures
- Extend base schema for new landing page types

### SQLite Connector Configuration
This project uses the **native SQLite connector** to avoid better-sqlite3 compatibility issues:

```typescript
// nuxt.config.ts
content: {
  experimental: {
    sqliteConnector: 'native'  // Requires Node.js 22.5.0+
  }
}
```

**Benefits**: Works in all environments, no binary compilation issues.

## 🔧 Troubleshooting

### **Nitro Prerender Errors**

**Problem**: `Error prerendering /landing-xyz`

**Solution**:
```typescript
// nuxt.config.ts - Add explicit route
nitro: {
  prerender: {
    routes: ['/landing-xyz'],
    failOnError: false // During development only
  }
}
```

### **Icons Not Loading**

**Problem**: `i-lucide-xyz` not displaying

**Solutions**:
1. Check if icon exists: https://lucide.dev/icons/
2. Verify iconify collection installed: `@iconify-json/lucide`
3. Use correct prefix: `i-lucide-arrow-right` not `i-arrow-right`

### **Content Schema Errors**

**Problem**: `Invalid content structure`

**Debug**:
```bash
# Check schema validation
pnpm dev --debug
# Look for content errors in terminal
```

**Common fixes**:
- Ensure required fields (`title`, `description`) are present
- Verify YAML indentation (2 spaces, no tabs)
- Check enum values match `content.config.ts` definitions

### **Build Performance Issues**

**Problem**: Slow build times or large bundle

**Solutions**:
- Audit unused components: Check import statements
- Optimize images: Use SVG for icons, WebP for photos
- Enable lazy loading: Wrap heavy components in `<ClientOnly>`
- Check bundle analyzer: `npx nuxi analyze`

## 📚 Key Resources

- **Nuxt UI Components**: https://ui.nuxt.com/components
- **Nuxt Content**: https://content.nuxt.com
- **Iconify Icons**: https://icones.js.org
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Content Schema Reference**: `content.config.ts` in this repo

---

**⚡ Quick Start**: `pnpm install && pnpm dev` → Create content file → Add prerender route → Ship! 🚀
