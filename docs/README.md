# Project Documentation

Smart CMS project built with React + Zod + Inertia.js with validation and type safety.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build the project
npm run build
```

## How to Use This Documentation

### For Creating New Sections

1. **Read the [Universal Section Creation Guide](universal-section-creation-guide.md)** - Learn the Smart CMS patterns, Zod schemas, and workflow
2. **Reference [Project Design System](project-design-system.md)** - Get exact colors, components, and design patterns for this project
3. **Check existing sections** in `resources/js/sections/` for real examples
4. **Build and test** with `npm run build`

### Documentation Approach

This project uses a **two-guide approach**:

- **Universal Guide** = Smart CMS stack patterns (works for any project)
- **Project Design System** = This project's specific choices (colors, components, etc.)

This separation allows the universal guide to be reused across different Smart CMS projects while keeping project-specific details separate.

---

## Documentation Structure

### Core Documentation (English)

#### [universal-section-creation-guide.md](universal-section-creation-guide.md) ⭐ **START HERE**
Universal guide for creating sections in any Smart CMS project. Technology stack-specific but project-agnostic.

**What's inside:**
- Smart CMS + Tailwind 4 + Laravel 12+ stack overview
- Complete Zod schema patterns
- Section creation workflow (3 steps)
- All available variable types (Image, Link, Navigation, etc.)
- System variables reference
- Project-specific context gathering template
- Best practices and validation patterns
- Complete code examples

#### [project-design-system.md](project-design-system.md) ⭐ **PROJECT REFERENCE**
This project's specific design choices, colors, components, and patterns.

**What's inside:**
- Color palette with usage guidelines
- Typography (fonts, sizes, weights)
- Spacing standards
- Button component variants
- Kit components reference
- Animations and transitions
- Responsive patterns
- Common section templates

---

## Core Concepts

### Creating a Section

```tsx
import z from "zod";

// 1. Schema
const mySchema = z.object({
  title: z.string().describe("Title"),
}).meta({
  id: "MySection",
  title: "My Section",
  component: MySection
});

// 2. Component
export default function MySection(props: z.infer<typeof mySchema>) {
  return <section><h2>{props.title}</h2></section>;
}

// 3. Build
// npm run build
```

### System Variables & TypeScript Types

Smart CMS provides comprehensive TypeScript types for all shared props and page data:

```tsx
import { usePage } from "@inertiajs/react";
import type { InertiaSharedProps, PageProps } from "@/types";

// Access shared props (logo, company_name, etc.)
const { props } = usePage<InertiaSharedProps>();
const logo = props.logo;
const companyName = props.company_name;

// Access page-specific props (page data, blocks, etc.)
const { props } = usePage<PageProps>();
const page = props.page;
const blocks = props.blocks;
```

**Key Features:**
- ✅ Full TypeScript autocomplete for all props
- ✅ Type-safe access to page data, logo, company info
- ✅ Automatic localization (no manual handling needed)
- ✅ SEO and meta data managed by CMS

### Using Components

```tsx
import { Button } from '@/components/ui';
import { KitLink, KitImage } from '@/components/kit';

<Button variant="primary" href="/contact">Contact</Button>
<KitImage options={{ url: logo.source, alt: companyName }} />
```

---

## Available Sections

- **Header** - Header with topbar, navbar, dropdown menu
- **Footer** - Footer with 4 columns
- **HeroBanner** - Main banner with background and CTA
- **ContentFlat** - Page content with sidebar

## Available Components

### UI Components
- **Button** - Button with 3 variants (primary, secondary, outline)

### Kit Components
- **KitLink** - Link with automatic routing
- **KitImage** - Image with lazy loading
- **KitIcon** - Icons
- **KitHeading** - Headings

## Color Palette

```css
--color-primary: #001F54      /* Dark Blue */
--color-secondary: #D4A574    /* Gold */
--color-accent: #FFD700       /* Bright Yellow */
--color-dark: #0F1A2E         /* Dark */
--color-light: #F8F9FA        /* Light */
```

## Typography

- **M PLUS Rounded 1c** - Headings
- **Exo 2** - Body text

## Workflow

1. Create section file `resources/js/sections/MySection.tsx`
2. Define Zod schema with `.meta()` (includes unique ID)
3. Implement React component
4. Run `npm run build`
5. **Section automatically registers** and appears in admin panel

### Automatic Features

**🚀 Automatic Section Registration**
- Sections register automatically when using `.meta()` with a unique ID
- No manual registration required
- Just define your schema and build

**🌍 Automatic Localization**
- Multi-language support handled automatically by Smart CMS
- No need to manually detect or handle language switching
- CMS serves the correct content based on URL

**🎨 TypeScript Types**
- Full type safety for all page props and shared data
- Import types from `@/types` for autocomplete
- Types for `InertiaSharedProps`, `PageProps`, `PageData`, and more

---

## Technology Stack

- **Smart CMS** - Block-based content management system
- **Laravel 12+** - Backend framework
- **React** - Frontend framework
- **Inertia.js** - Server-side routing with SPA experience
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zod** - TypeScript-first schema validation
- **TypeScript** - Type safety

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev)
- [Inertia.js Documentation](https://inertiajs.com)
- [React Documentation](https://react.dev)
