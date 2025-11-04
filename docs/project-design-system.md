# Project Design System

This document defines the specific design choices for this Smart CMS project. Use this alongside the [Universal Section Creation Guide](./universal-section-creation-guide.md).

## Technology Stack

- **Smart CMS** - Block-based CMS
- **Laravel 12+** - Backend
- **React + Inertia.js** - Frontend
- **Tailwind CSS v4** - Styling
- **TypeScript + Zod** - Type safety

---

## Color Palette

**Location:** `resources/css/app.css`

| Color | Variable | Hex Value | Tailwind Class | Usage |
|-------|----------|-----------|----------------|-------|
| **Primary** | `--color-primary` | `#001F54` | `bg-primary`, `text-primary` | Main brand color (dark blue). Use for primary buttons, important headings, navigation highlights |
| **Secondary** | `--color-secondary` | `#D4A574` | `bg-secondary`, `text-secondary` | Secondary brand color (gold). Use for accents, highlights, hover states |
| **Accent** | `--color-accent` | `#FFD700` | `bg-accent`, `text-accent` | Bright accent (yellow). Use for CTAs, attention-grabbing elements, hover transitions |
| **Dark** | `--color-dark` | `#0F1A2E` | `bg-dark`, `text-dark` | Dark backgrounds and text. Use for dark sections, footer, high-contrast text |
| **Light** | `--color-light` | `#F8F9FA` | `bg-light`, `text-light` | Light backgrounds. Use for section backgrounds, cards, alternating sections |

### Color Usage Guidelines

**Primary (#001F54 - Dark Blue)**
- Primary buttons
- Main headings (h1, h2)
- Active navigation items
- Brand elements

**Secondary (#D4A574 - Gold)**
- Secondary buttons
- Subheadings accents
- Decorative elements
- Hover states for secondary actions

**Accent (#FFD700 - Yellow)**
- Call-to-action buttons
- Hover backgrounds
- Highlight effects
- Attention-grabbing elements

**Example:**
```tsx
// Primary CTA
<Button variant="primary" /> // Uses accent hover

// Dark section with light text
<section className="bg-dark text-light">

// Light section with dark text
<section className="bg-light text-dark">
```

---

## Typography

**Location:** `resources/css/app.css`

### Font Families

| Purpose | Font | Variable | Usage |
|---------|------|----------|-------|
| **Display/Headings** | M PLUS Rounded 1c | `--font-display` | All headings (h1-h6), hero text, important labels |
| **Body Text** | Exo 2 | `--font-body` | Paragraphs, descriptions, UI text |

### Font Sizes & Weights

```tsx
// Headings (automatically use display font)
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">  // Hero headings
<h2 className="text-3xl md:text-4xl font-bold">              // Section headings
<h3 className="text-2xl md:text-3xl font-bold">              // Subsection headings
<h4 className="text-xl font-semibold">                       // Card headings

// Body text (uses body font)
<p className="text-base leading-relaxed">     // Standard paragraphs
<p className="text-lg">                       // Large body text
<p className="text-sm">                       // Small text, captions
```

---

## Spacing Standards

### Container

```tsx
// Standard container
<div className="container mx-auto px-4">
```

### Section Padding

```tsx
// Desktop sections
<section className="py-16">

// Responsive sections
<section className="py-12 md:py-16 lg:py-20">

// Compact sections
<section className="py-8 md:py-12">
```

### Element Gaps

```tsx
// Small gap (16px)
className="gap-4"

// Medium gap (32px)
className="gap-8"

// Large gap (48px)
className="gap-12"

// Extra large gap (64px)
className="gap-16"
```

---

## Component Library

### Button Component

**Location:** `resources/js/components/ui/Button.tsx`

**Import:**
```tsx
import { Button } from '@/components/ui';
```

**Variants:**

1. **Primary** - White background with primary text, accent on hover
   ```tsx
   <Button variant="primary" size="lg" href="/contact">
     Contact Us
   </Button>
   ```

2. **Secondary** - Transparent with white border, white background on hover
   ```tsx
   <Button variant="secondary" size="md" onClick={handleClick}>
     Learn More
   </Button>
   ```

3. **Outline** - Primary border, primary background on hover
   ```tsx
   <Button variant="outline" size="sm" href="/about">
     Read More
   </Button>
   ```

**Sizes:**
- `sm` - Small (px-4 py-2, text-sm)
- `md` - Medium (px-6 py-3, text-base) - Default
- `lg` - Large (px-8 py-4, text-lg)

**Features:**
- Animated background slide effect
- Default icons per variant
- Hover scale (1.05x)
- Disabled state support
- Auto-renders as link with `href` prop

### Kit Components

**Location:** `resources/js/components/kit/`

**Import:**
```tsx
import { KitImage, KitLink, KitIcon } from '@/components/kit';
```

**KitImage** - Smart image component
```tsx
<KitImage
  options={{ url: image.source, alt: image.alt }}
  className="w-full h-auto rounded-lg"
  loading="lazy" // or "eager" for above-fold images
/>
```

**KitLink** - Smart link component (handles internal/external)
```tsx
<KitLink options={link.url} className="hover:text-accent">
  {link.title}
</KitLink>
```

**KitIcon** - Icon component
```tsx
<KitIcon options={iconName} className="w-6 h-6" />
```

---

## Animations & Transitions

**Location:** `resources/css/app.css`

### Available Animations

```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-100%); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { transform: scale(1.1); }
  to { transform: scale(1); }
}
```

### Usage

```tsx
// Slide down animation
<div className="animate-slideDown">

// Custom animation (define in CSS)
<div className="animate-fade-in-up">
```

### Standard Transitions

```tsx
// Default transition (all properties)
className="transition-all duration-300"

// Specific transitions
className="transition-colors duration-300"
className="transition-transform duration-500"

// Common hover effects
className="hover:scale-105 transition-transform duration-300"
className="hover:shadow-xl transition-shadow duration-300"
className="hover:text-accent transition-colors duration-300"
```

---

## Responsive Design

### Breakpoint Strategy

**Mobile-first approach** - Design for mobile, enhance for desktop

```tsx
// Mobile: full width, Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// Mobile: stack, Desktop: flex row
<div className="flex flex-col md:flex-row gap-4">

// Mobile: text-2xl, Desktop: text-5xl
<h1 className="text-2xl md:text-4xl lg:text-5xl">
```

### Standard Breakpoints (Tailwind defaults)

- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

---

## Common Patterns

### Hero Section

```tsx
<section className="relative min-h-screen flex items-center bg-primary text-white">
  <div className="container mx-auto px-4 py-24">
    <h1 className="text-4xl md:text-6xl font-bold mb-6">Heading</h1>
    <p className="text-lg md:text-xl mb-8">Subheading</p>
    <Button variant="primary" size="lg" href="/action">
      Call to Action
    </Button>
  </div>
</section>
```

### Features Grid

```tsx
<section className="py-16 bg-light">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
      Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### CTA Section

```tsx
<section className="py-16 bg-gradient-to-r from-primary to-dark text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
    <Button variant="primary" size="lg" href="/contact">
      Contact Us Today
    </Button>
  </div>
</section>
```

---

## Rich Editor Styles

For content areas using the rich editor (`.rich-editor` or `.prose` classes):

- **Headings**: Use primary color for h1-h2, dark for h3-h6
- **Links**: Primary color with secondary hover
- **Blockquotes**: Accent border with light background
- **Code**: Gray background with mono font
- **Tables**: Primary header background

See `resources/css/app.css` for complete styles.

---

## Best Practices

### Do's ✅

- Use `<Button variant="primary" />` instead of custom button styles
- Use `<KitImage />` for all images
- Use `<KitLink />` for all links
- Follow color palette (primary, secondary, accent)
- Use container for consistent width
- Make sections responsive (mobile-first)
- Add transitions for hover states
- Use `gap-4`, `gap-8`, `gap-12` for consistent spacing
- Use `py-16` for section padding

### Don'ts ❌

- Don't create custom button styles
- Don't use arbitrary hex colors
- Don't forget responsive variants
- Don't skip accessibility (alt text, ARIA labels)
- Don't use inline styles unless necessary
- Don't forget to check existing sections for patterns

---

## Quick Reference

```tsx
// Typical section structure
<section className="py-16 bg-light">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 text-primary">
      Section Title
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Content */}
    </div>
    <div className="text-center mt-12">
      <Button variant="primary" size="lg" href="/action">
        Call to Action
      </Button>
    </div>
  </div>
</section>
```

---

For section creation patterns and Zod schema examples, see the [Universal Section Creation Guide](./universal-section-creation-guide.md).
