# Universal Section Creation Guide

This guide serves as a comprehensive prompt for creating reusable sections in the **Smart CMS platform**. Use this when creating new sections to ensure consistency, reusability, and best practices across any project using this stack.

## Technology Stack

This guide is designed for projects using:

- **Smart CMS** - Block-based CMS with Zod schema validation and automatic localization
- **Laravel 12+** - Backend framework
- **React** - Component library
- **Inertia.js** - Server-side routing with SPA-like experience
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zod** - TypeScript-first schema validation
- **TypeScript** - Type safety

### Important Smart CMS Features

**🌍 Automatic Localization**
Smart CMS handles multi-language support automatically. You don't need to:
- Manually detect the user's language
- Create separate routes for different languages
- Handle language switching in your sections

The CMS automatically:
- Detects language from the URL
- Serves the correct content for each language
- Manages language switching and routing

**📦 Automatic Section Registration**
Sections are automatically registered when you use `.meta()` with a unique ID. No manual registration needed!

## Table of Contents
1. [Understanding Sections](#understanding-sections)
2. [Section Creation Workflow](#section-creation-workflow)
3. [Available Variable Types](#available-variable-types)
4. [System Variables](#system-variables)
5. [Project-Specific Context](#project-specific-context)
6. [Best Practices](#best-practices)
7. [Information to Gather](#information-to-gather)
8. [Complete Examples](#complete-examples)

---

## Understanding Sections

### What are Sections?

Sections are **reusable page building blocks** that can be:
- Used multiple times on the same page with different content
- Configured independently through an admin panel
- Fully typed and validated using Zod schemas
- Combined to build complete pages

### How Sections Work

1. **Define Schema** - Zod schema defines variables, defaults, and validation
2. **Add .meta() with unique ID** - Section automatically registers in global registry
3. **Implement Component** - React component receives validated data as props
4. **Build** - Run `npm run build` to compile
5. **Use** - Section automatically appears in admin panel for page building

### Automatic Section Registration

Sections are **automatically registered** when you use `.meta()` on your schema with a unique ID. You don't need to manually register sections anywhere - Smart CMS handles this automatically.

```tsx
// Define your schema with .meta()
const mySchema = z.object({
  title: z.string().describe("Title").default("Default Title")
}).meta({
  id: "MyUniqueSection",     // ✅ Unique ID - REQUIRED for registration
  title: "My Section",        // Display name in admin panel
  description: "Description", // Help text for admin
  component: MySection        // React component to render
});

// That's it! No manual registration needed.
// After `npm run build`, this section will automatically:
// 1. Be registered in the global section registry
// 2. Be available in the admin panel
// 3. Be ready to use on any page
```

**Important:**
- The `id` in `.meta()` **must be unique** across all sections
- If two sections share the same ID, the last one will overwrite the first
- The `id` is used to identify the section in the database and admin panel
- Changing the `id` later will break existing section instances on pages

### Key Principles

- **Reusability First** - Design for multiple instances with different content
- **Default Values** - Always provide sensible defaults for immediate usability
- **Optional Fields** - Make fields optional when they enhance flexibility
- **Type Safety** - Use `z.infer<typeof schema>` for automatic TypeScript types
- **Validation** - Leverage Zod for runtime validation (URL, email, min/max, etc.)

### Critical Rules

1. **Schema Cannot Be Empty** - Every section schema MUST contain at least one variable. Empty schemas will cause errors.
   ```tsx
   // ❌ WRONG - Empty schema
   const schema = z.object({}).meta({...});

   // ✅ CORRECT - At least one field
   const schema = z.object({
     title: z.string().default("Default Title")
   }).meta({...});
   ```

2. **Use Predefined UI Components** - Always use existing UI components from `@/components/ui` for consistency
3. **Follow Color Palette** - Use Tailwind 4 theme colors defined in `resources/css/app.css`

---

## Section Creation Workflow

### Step 1: Define the Zod Schema

Create a file in `resources/js/sections/` with your section name (e.g., `my-section.tsx`):

```tsx
import z from "zod";
import { ImageSchema, LinkSchema } from "./types";

export const mySectionSchema = z.object({
  // Basic fields
  title: z.string().describe("Section title"),
  subtitle: z.string().optional().describe("Subtitle text"),

  // Predefined schemas
  image: ImageSchema.optional().describe("Hero image"),
  cta_button: LinkSchema.describe("Call-to-action button"),

  // Variants/options
  style: z.enum(['light', 'dark', 'gradient']).default('light').describe("Background style"),
  size: z.enum(['small', 'medium', 'large']).default('medium').describe("Section size"),

  // Arrays for repeatable content
  features: z.array(z.object({
    title: z.string().describe("Feature title"),
    description: z.string().describe("Feature description"),
    icon: z.string().optional().describe("Icon name"),
  })).default([
    { title: "Feature 1", description: "Description 1" },
    { title: "Feature 2", description: "Description 2" },
  ]).describe("Features list"),

}).meta({
  id: "MySectionId",                    // Unique ID (required)
  title: "My Section",                  // Display name in admin (required)
  description: "A brief description",   // Help text for admin (required)
  component: MySection                  // React component (required)
});
```

### Step 2: Implement the React Component

```tsx
export default function MySection(props: z.infer<typeof mySectionSchema>) {
  // Destructure props
  const { title, subtitle, image, cta_button, style, size, features } = props;

  // Access system variables if needed
  const { props: pageProps } = usePage();
  const logo = pageProps.logo as z.infer<typeof ImageSchema>;
  const companyName = pageProps.company_name as string;

  return (
    <section className={`my-section my-section--${style} my-section--${size}`}>
      <div className="container mx-auto px-4">

        {/* Always check optional fields */}
        <h2>{title}</h2>
        {subtitle && <p className="subtitle">{subtitle}</p>}

        {/* Render images safely */}
        {image?.source && (
          <img
            src={image.source}
            alt={image.alt || title}
            width={image.width}
            height={image.height}
          />
        )}

        {/* Render links with external target handling */}
        <a
          href={cta_button.url}
          target={cta_button.is_external ? "_blank" : "_self"}
          className="btn btn-primary"
        >
          {cta_button.title}
        </a>

        {/* Map over arrays */}
        {features && features.length > 0 && (
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                {feature.icon && <i className={feature.icon}></i>}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
```

---

## Available Variable Types

### Basic Zod Types

| Type | Schema | Example | Notes |
|------|--------|---------|-------|
| **String** | `z.string()` | `title: z.string().describe("Title")` | Basic text field |
| **Number** | `z.number()` | `count: z.number().default(0)` | Numeric values |
| **Boolean** | `z.boolean()` | `isActive: z.boolean().default(true)` | True/false toggle |
| **Enum** | `z.enum([...])` | `style: z.enum(['light', 'dark'])` | Dropdown select |
| **URL** | `z.string().url()` | `url: z.string().url()` | Validated URL |
| **Email** | `z.string().email()` | `email: z.string().email()` | Validated email |
| **Array** | `z.array(...)` | `tags: z.array(z.string())` | List of items |
| **Object** | `z.object({...})` | See nested objects below | Complex structures |

### Modifiers

```tsx
.optional()              // Field is not required
.nullable()              // Can be null
.default(value)          // Default value
.describe("text")        // Help text for admin panel
.min(5)                  // Minimum (string length or number)
.max(100)                // Maximum (string length or number)
```

### Predefined Schemas (from `types.ts`)

#### ImageSchema

```tsx
import { ImageSchema } from "./types";

hero_image: ImageSchema.describe("Hero image"),

// Provides:
{
  width?: number;      // Default: 300
  height?: number;     // Default: 300
  source?: string;     // Default: "https://placehold.co/400"
  alt?: string;        // Default: "Alt text"
}

// Usage in component:
{image?.source && (
  <img
    src={image.source}
    alt={image.alt}
    width={image.width}
    height={image.height}
  />
)}
```

#### LinkSchema

```tsx
import { LinkSchema } from "./types";

cta_link: LinkSchema.describe("CTA Link"),

// Provides:
{
  title?: string;      // Default: "Link title"
  url: string;         // Default: "/"
  icon?: string;       // Optional icon
  is_external: boolean; // Default: false
}

// Usage in component:
<a
  href={cta_link.url}
  target={cta_link.is_external ? "_blank" : "_self"}
>
  {cta_link.title}
</a>
```

#### NavigationSchema

```tsx
import { NavigationSchema } from "./types";

menu: NavigationSchema.describe("Main menu"),

// Provides: Array of items with recursive children
[{
  title: string;
  url: string | LinkSchema;
  active?: boolean;
  children?: NavigationItem[];
}]

// Usage in component:
{menu.map((item, index) => (
  <li key={index}>
    <a href={typeof item.url === 'string' ? item.url : item.url.url}>
      {item.title}
    </a>
    {item.children && (
      <ul>
        {item.children.map((child, i) => (
          <li key={i}>
            <a href={typeof child.url === 'string' ? child.url : child.url.url}>
              {child.title}
            </a>
          </li>
        ))}
      </ul>
    )}
  </li>
))}
```

#### PhonesSchema

```tsx
import { PhonesSchema } from "./types";

phones: PhonesSchema.optional(),

// Provides: Array of LinkSchema
// Default: [{ title: "+11 222 333 444", url: "tel:+11222333444", is_external: false }]

// Usage in component:
{phones?.map((phone, i) => (
  <a key={i} href={phone.url}>{phone.title}</a>
))}
```

#### EmailsSchema

```tsx
import { EmailsSchema } from "./types";

emails: EmailsSchema.optional(),

// Provides: Array of LinkSchema
// Default: [{ title: "email@example.com", url: "mailto:email@example.com", is_external: false }]

// Usage in component:
{emails?.map((email, i) => (
  <a key={i} href={email.url}>{email.title}</a>
))}
```

#### SocialsSchema

```tsx
import { SocialsSchema } from "./types";

socials: SocialsSchema.optional(),

// Provides: Array of social media objects
[{
  name: string;        // e.g., "Facebook"
  url: LinkSchema;
  icon?: string;       // Icon class name
  image?: ImageSchema; // Icon image
}]

// Usage in component:
{socials?.map((social, i) => (
  <a
    key={i}
    href={social.url.url}
    target="_blank"
    title={social.name}
  >
    {social.icon && <i className={social.icon}></i>}
    {social.image?.source && <img src={social.image.source} alt={social.name} />}
  </a>
))}
```

#### PopularItems & PopularCategories

```tsx
import { PopularItems, PopularCategories } from "./types";

popular_items: PopularItems.optional(),

// Provides: Array of page objects
[{
  id: number;
  name: string;
  slug: string;
  url: string;
  image?: ImageSchema;
  heading: string;
  summary: string;
  depth: number;
}]
```

---

## System Variables & Inertia Shared Props

System variables are automatically available via Inertia's `usePage()` hook and should **NOT** be included in your section schema. These props are globally available on every page.

### TypeScript Support

For full type safety and autocomplete, import the types from `@/types`:

```tsx
import { usePage } from "@inertiajs/react";
import type { InertiaSharedProps, PageProps } from "@/types";

export default function MySection(props: z.infer<typeof mySchema>) {
  // Option 1: Use InertiaSharedProps for shared data only
  const { props: pageProps } = usePage<InertiaSharedProps>();

  // Option 2: Use PageProps for full page data (includes shared props + page-specific data)
  const { props } = usePage<PageProps>();

  // Now you get full autocomplete for all available props!
  const logo = props.logo; // Typed as ImageData
  const companyName = props.company_name; // Typed as string
  const page = props.page; // Typed as PageData
}
```

### Available Inertia Shared Props

These props are available globally via `usePage<InertiaSharedProps>()`:

#### Site Information
```tsx
const { props } = usePage<InertiaSharedProps>();

// Company/site details
props.company_name    // string - Company name
props.hostname        // string - Domain hostname
props.host            // HostLink - Full host link object with URL
props.logo            // ImageData - Site logo
props.default_image   // ImageData - Fallback image
```

#### Localization (Handled Automatically)
```tsx
// Smart CMS handles localization automatically
// These props are available but you typically don't need to use them directly
props.locale          // string - Current locale code (e.g., "en", "es")
props.locales         // LanguageRoute[] - Available language routes
props.translations    // Record<string, string> - Translation strings

// ⚠️ NOTE: You don't need to manually handle localization in your sections!
// Smart CMS automatically detects and serves the correct language based on the URL
```

#### SEO & Meta (Managed by CMS)
```tsx
props.meta            // MetaData - SEO tags, title, description, microdata
props.meta.title      // string - Page title
props.meta.description // string - Page description
props.meta.canonical  // string - Canonical URL
props.meta.tags       // Array - Meta tags for social sharing
```

#### Authentication (Optional)
```tsx
props.auth?.user      // User object if authenticated
props.auth?.user?.id  // number
props.auth?.user?.name // string
props.auth?.user?.email // string
```

#### Flash Messages (Optional)
```tsx
props.flash?.success  // string - Success message
props.flash?.error    // string - Error message
props.flash?.warning  // string - Warning message
props.flash?.info     // string - Info message
```

### Available Page-Specific Props

Use `usePage<PageProps>()` to access both shared props AND page-specific data:

```tsx
import { usePage } from "@inertiajs/react";
import type { PageProps } from "@/types";

export default function MySection(props: z.infer<typeof mySchema>) {
  const { props } = usePage<PageProps>();

  // Current page data (fully typed)
  const page = props.page;              // PageData
  const pageContent = page.content;     // string - HTML content
  const pageHeading = page.heading;     // string - Page title/heading
  const pageImage = page.image;         // ImageData | null
  const pageBanner = page.banner;       // ImageData | null
  const pageUrl = page.url;             // string - Full URL
  const pageSlug = page.slug;           // string - URL slug

  // Blocks/sections on this page
  const blocks = props.blocks;          // BlockData[] - All blocks to render

  // Related pages (if available)
  const categories = props.categories;  // Paginated categories
  const items = props.items;            // Paginated items

  return (
    <section>
      {/* Use shared props */}
      {props.logo?.source && (
        <img src={props.logo.source} alt={props.company_name} />
      )}

      {/* Use page-specific props */}
      <h1>{pageHeading}</h1>
      {pageContent && (
        <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      )}

      {/* Render categories */}
      {categories?.data.map((category) => (
        <a key={category.id} href={category.url}>
          {category.name}
        </a>
      ))}
    </section>
  );
}
```

### Common Patterns

#### Using Logo and Company Name
```tsx
import { usePage } from "@inertiajs/react";
import type { InertiaSharedProps } from "@/types";

export default function Header(props: z.infer<typeof headerSchema>) {
  const { props } = usePage<InertiaSharedProps>();

  return (
    <header>
      <a href="/">
        <img
          src={props.logo.source}
          alt={props.company_name}
          width={props.logo.width}
          height={props.logo.height}
        />
      </a>
    </header>
  );
}
```

#### Accessing Current Page Data
```tsx
import { usePage } from "@inertiajs/react";
import type { PageProps } from "@/types";

export default function PageHeader(props: z.infer<typeof pageHeaderSchema>) {
  const { props } = usePage<PageProps>();
  const { page } = props;

  return (
    <section>
      {/* Page banner image */}
      {page.banner?.source && (
        <img src={page.banner.source} alt={page.heading} />
      )}

      {/* Page heading */}
      <h1>{page.heading}</h1>

      {/* Page summary */}
      {page.summary && <p>{page.summary}</p>}
    </section>
  );
}
```

#### Rendering Page Content
```tsx
import { usePage } from "@inertiajs/react";
import type { PageProps } from "@/types";

export default function ContentSection(props: z.infer<typeof contentSchema>) {
  const { props } = usePage<PageProps>();

  return (
    <section>
      {props.page.content && (
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: props.page.content }}
        />
      )}
    </section>
  );
}
```

### Important Notes

1. **Don't include system variables in your schema** - They're automatically available via `usePage()`
2. **Always use TypeScript types** - Import `InertiaSharedProps` or `PageProps` for autocomplete
3. **Check for optional fields** - Many page props like `content`, `banner`, `image` can be null
4. **Localization is automatic** - You don't need to manually handle language switching
5. **SEO is managed by CMS** - Meta tags, titles, and descriptions are handled automatically

---

## Project-Specific Context

Before creating sections, gather the following project-specific information to ensure consistency with the existing codebase.

### 1. Design System

**Color Palette** - Ask about the project's color scheme:
- What are the primary brand colors?
- Where is the color palette defined? (e.g., `resources/css/app.css`)
- What Tailwind color classes are available? (e.g., `bg-primary`, `text-accent`)
- When should each color be used? (primary for CTAs, secondary for accents, etc.)

**Example Questions:**
```
- What colors should I use for this section?
- Is there a dark/light mode variant?
- Should this section use the primary or accent color?
```

### 2. UI Component Library

**Available Components** - Identify reusable UI components:
- Where are UI components located? (e.g., `resources/js/components/ui/`)
- What button variants exist? (primary, secondary, outline, etc.)
- Are there card, modal, or other layout components?
- What Kit components are available? (KitImage, KitLink, KitIcon, etc.)

**Example Questions:**
```
- Do you have a Button component I should use?
- What button variants are available?
- Should I create a new component or use an existing one?
```

### 3. Typography

**Font System** - Understand font usage:
- What fonts are used for headings vs body text?
- Are there specific font sizes for different heading levels?
- What's the font family configuration?

**Example:**
```tsx
// Project might use:
--font-display: 'Inter', sans-serif;
--font-body: 'Roboto', sans-serif;

// Or different fonts:
--font-display: 'M PLUS Rounded 1c';
--font-body: 'Exo 2';
```

### 4. Spacing & Layout

**Standard Spacing** - Check consistent spacing patterns:
- What container classes are used? (`container mx-auto px-4`)
- Standard section padding? (`py-16`, `py-12 md:py-16`)
- Gap sizes for flex/grid? (`gap-4`, `gap-8`, `gap-12`)

### 5. Animations & Transitions

**Animation Standards** - Identify animation patterns:
- Are there predefined keyframe animations?
- Standard transition durations? (`duration-300`, `duration-500`)
- Hover effects? (`hover:scale-105`, `hover:shadow-xl`)
- Are animations defined in CSS or Tailwind config?

**Example:**
```tsx
// Check for custom animations in CSS:
@keyframes fade-in-up { ... }
@keyframes slideDown { ... }
```

### 6. Responsive Design

**Breakpoint Strategy** - Understand responsive patterns:
- Mobile-first or desktop-first?
- Standard breakpoints? (Tailwind defaults: sm, md, lg, xl, 2xl)
- Common responsive patterns used?

### 7. Accessibility

**A11y Standards** - Check accessibility requirements:
- ARIA label conventions?
- Keyboard navigation patterns?
- Focus state styling?
- Screen reader considerations?

### Where to Find This Information

1. **CSS Files** - `resources/css/app.css` or `tailwind.config.js`
2. **Component Files** - `resources/js/components/ui/` and `resources/js/components/kit/`
3. **Existing Sections** - `resources/js/sections/` (check Header, Footer, Hero for patterns)
4. **Documentation** - Check project docs for design system guidelines

### Template for Gathering Context

When starting work on a new section, ask:

```
Before I create this section, I need some context about the project:

1. **Colors**: What color palette should I use? Where is it defined?
2. **Components**: Do you have a Button component or other UI components I should use?
3. **Typography**: What fonts are used for headings and body text?
4. **Spacing**: What standard padding/gaps should sections use?
5. **Animations**: Are there standard animations or transitions I should follow?

Please point me to:
- CSS file with theme variables (usually resources/css/app.css)
- UI component directory (usually resources/js/components/ui/)
- Any existing similar sections I should reference
```

---

## Best Practices

### Schema Design

1. **Schema cannot be empty** - Always include at least one field
2. **Always provide defaults** for non-critical fields
3. **Use `.describe()`** on all fields for admin panel clarity
4. **Make fields optional** when they add flexibility
5. **Use enums** for fixed sets of options (variants, sizes, colors)
6. **Group related fields** logically
7. **Reuse predefined schemas** (ImageSchema, LinkSchema) instead of creating custom ones

### Component Implementation

1. **Use existing UI components** - Always check for Button, Card, or other UI components before creating custom styles
2. **Always check optional fields** before rendering (`image?.source && ...`)
3. **Use type inference** with `z.infer<typeof schema>` for props
4. **Destructure props** at the top for clarity
5. **Handle external links** properly (`target={link.is_external ? "_blank" : "_self"}`)
6. **Provide fallback alt text** for images
7. **Use key props** when mapping arrays
8. **Import Kit components** for images, links, and icons

### Styling

1. **Follow the project's design system** - Use defined color palette and spacing
2. **Use variant classes** for different styles (`section--dark`, `section--large`)
3. **Make responsive** by default (mobile-first approach)
4. **Use container** classes for consistent width
5. **Apply transitions** for hover states
6. **Check existing sections** for animation and spacing patterns

### Validation Rules

```tsx
// Enforce minimum/maximum lengths
title: z.string().min(3).max(100).describe("Title"),

// Validate specific formats
email: z.string().email().describe("Email"),
url: z.string().url().describe("Website URL"),

// Numeric ranges
price: z.number().min(0).max(10000).describe("Price"),

// Array length constraints
items: z.array(z.string()).min(1).max(10).describe("Items"),
```

---

## Information to Gather

When creating a new section, gather the following information:

### 1. Content Requirements

- [ ] What text fields are needed? (title, subtitle, description, etc.)
- [ ] Are images needed? How many? What purpose?
- [ ] Are there calls-to-action (buttons/links)?
- [ ] Is there repeatable content (lists, cards, features)?
- [ ] What's optional vs required?

### 2. Design & Layout

- [ ] What are the visual variants? (light/dark, sizes, colors)
- [ ] Background style options? (solid, gradient, image)
- [ ] Layout options? (centered, left-aligned, grid, etc.)
- [ ] Spacing preferences? (compact, normal, spacious)
- [ ] Responsive behavior?

### 3. Interactive Elements

- [ ] Navigation/menu items needed?
- [ ] Contact information? (phones, emails, social media)
- [ ] Forms or inputs?
- [ ] Modals or overlays?
- [ ] Animations or transitions?

### 4. Data & Content

- [ ] Default content examples?
- [ ] Maximum/minimum content limits?
- [ ] Validation requirements?
- [ ] Dynamic content sources? (popular items, categories, etc.)

### 5. Brand & Style

- [ ] Color scheme variants?
- [ ] Icon style? (outline, solid, custom)
- [ ] Typography needs? (headings levels, font weights)
- [ ] Brand-specific elements?

### 6. Functionality

- [ ] Does it need system variables? (logo, company name, etc.)
- [ ] Page-specific data? (current page content, heading, etc.)
- [ ] SEO requirements? (structured data, meta tags)
- [ ] Accessibility needs? (ARIA labels, keyboard navigation)

---

## Complete Examples

### Example 1: Simple Hero Section

```tsx
import z from "zod";
import { ImageSchema, LinkSchema } from "./types";

export const heroSchema = z.object({
  heading: z.string().describe("Main heading").default("Welcome to Our Site"),
  subheading: z.string().optional().describe("Subheading text"),
  background_image: ImageSchema.describe("Background image"),
  cta_primary: LinkSchema.describe("Primary CTA button"),
  cta_secondary: LinkSchema.optional().describe("Secondary CTA button"),
  style: z.enum(['dark', 'light', 'overlay']).default('dark').describe("Text style"),
}).meta({
  id: "HeroSection",
  title: "Hero Section",
  description: "Main hero banner with heading, background image, and CTAs",
  component: HeroSection
});

export default function HeroSection(props: z.infer<typeof heroSchema>) {
  const { heading, subheading, background_image, cta_primary, cta_secondary, style } = props;

  return (
    <section
      className={`hero hero--${style}`}
      style={{
        backgroundImage: background_image?.source ? `url(${background_image.source})` : undefined
      }}
    >
      <div className="hero__overlay"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <h1 className="text-5xl font-bold mb-4">{heading}</h1>
        {subheading && <p className="text-xl mb-8">{subheading}</p>}

        <div className="flex gap-4">
          <a
            href={cta_primary.url}
            target={cta_primary.is_external ? "_blank" : "_self"}
            className="btn btn-primary"
          >
            {cta_primary.title}
          </a>

          {cta_secondary && (
            <a
              href={cta_secondary.url}
              target={cta_secondary.is_external ? "_blank" : "_self"}
              className="btn btn-secondary"
            >
              {cta_secondary.title}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
```

### Example 2: Features Grid Section

```tsx
import z from "zod";
import { ImageSchema } from "./types";

export const featuresSchema = z.object({
  title: z.string().describe("Section title").default("Our Features"),
  subtitle: z.string().optional().describe("Section subtitle"),
  features: z.array(z.object({
    title: z.string().describe("Feature title"),
    description: z.string().describe("Feature description"),
    icon: z.string().optional().describe("Icon class name"),
    image: ImageSchema.optional().describe("Feature image"),
  })).min(1).max(12).default([
    { title: "Fast Performance", description: "Lightning-fast load times" },
    { title: "Secure", description: "Bank-level security" },
    { title: "Scalable", description: "Grows with your business" },
  ]).describe("Features list"),
  columns: z.enum(['2', '3', '4']).default('3').describe("Number of columns"),
}).meta({
  id: "FeaturesSection",
  title: "Features Grid",
  description: "Display features in a responsive grid layout",
  component: FeaturesSection
});

export default function FeaturesSection(props: z.infer<typeof featuresSchema>) {
  const { title, subtitle, features, columns } = props;

  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  }[columns];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
        </div>

        <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              {feature.image?.source ? (
                <img
                  src={feature.image.source}
                  alt={feature.image.alt || feature.title}
                  className="w-16 h-16 mb-4"
                />
              ) : feature.icon ? (
                <i className={`${feature.icon} text-4xl mb-4 text-primary`}></i>
              ) : null}

              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Example 3: Contact CTA with Multiple Channels

```tsx
import z from "zod";
import { PhonesSchema, EmailsSchema, SocialsSchema } from "./types";

export const contactCTASchema = z.object({
  heading: z.string().describe("Section heading").default("Get in Touch"),
  message: z.string().optional().describe("Contact message"),
  phones: PhonesSchema.optional(),
  emails: EmailsSchema.optional(),
  socials: SocialsSchema.optional(),
  background_color: z.enum(['primary', 'secondary', 'accent', 'gray']).default('primary').describe("Background color"),
}).meta({
  id: "ContactCTASection",
  title: "Contact CTA",
  description: "Contact section with phone, email, and social media links",
  component: ContactCTASection
});

export default function ContactCTASection(props: z.infer<typeof contactCTASchema>) {
  const { heading, message, phones, emails, socials, background_color } = props;

  return (
    <section className={`py-16 bg-${background_color}`}>
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">{heading}</h2>
        {message && <p className="text-xl mb-8 opacity-90">{message}</p>}

        <div className="flex flex-wrap justify-center gap-12 mt-8">
          {/* Phones */}
          {phones && phones.length > 0 && (
            <div>
              <h3 className="text-sm uppercase tracking-wide mb-4 opacity-75">Phone</h3>
              <div className="space-y-2">
                {phones.map((phone, i) => (
                  <a
                    key={i}
                    href={phone.url}
                    className="block text-lg font-semibold hover:opacity-75 transition"
                  >
                    {phone.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Emails */}
          {emails && emails.length > 0 && (
            <div>
              <h3 className="text-sm uppercase tracking-wide mb-4 opacity-75">Email</h3>
              <div className="space-y-2">
                {emails.map((email, i) => (
                  <a
                    key={i}
                    href={email.url}
                    className="block text-lg font-semibold hover:opacity-75 transition"
                  >
                    {email.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Social Media */}
          {socials && socials.length > 0 && (
            <div>
              <h3 className="text-sm uppercase tracking-wide mb-4 opacity-75">Follow Us</h3>
              <div className="flex gap-4 justify-center">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.url.url}
                    target="_blank"
                    className="hover:opacity-75 transition"
                    title={social.name}
                  >
                    {social.icon && <i className={`${social.icon} text-2xl`}></i>}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

---

## Quick Reference Checklist

When creating a new section, ensure:

- [ ] Schema has unique `.meta({ id, title, description, component })`
- [ ] All fields have `.describe()` for admin clarity
- [ ] Sensible defaults are provided with `.default()`
- [ ] Optional fields use `.optional()`
- [ ] Validation is added where appropriate (`.min()`, `.max()`, `.url()`, `.email()`)
- [ ] Component uses `z.infer<typeof schema>` for props type
- [ ] Optional fields are checked before rendering
- [ ] Arrays use proper `key` props when mapping
- [ ] External links have appropriate `target` attribute
- [ ] Images have alt text
- [ ] System variables accessed via `usePage()` (not in schema)
- [ ] Responsive design is considered

---

## Common Patterns

### Toggleable Features

```tsx
show_icon: z.boolean().default(true).describe("Show icon"),
show_description: z.boolean().default(true).describe("Show description"),
```

### Content Limits

```tsx
items: z.array(z.object({...})).min(1).max(6).describe("Items"),
title: z.string().min(3).max(100).describe("Title"),
```

### Multiple Variants

```tsx
variant: z.enum(['default', 'modern', 'classic', 'minimal']).default('default').describe("Design variant"),
size: z.enum(['sm', 'md', 'lg', 'xl']).default('md').describe("Section size"),
alignment: z.enum(['left', 'center', 'right']).default('center').describe("Text alignment"),
```

### Conditional Content

```tsx
// In schema
has_background_image: z.boolean().default(false).describe("Use background image"),
background_image: ImageSchema.optional().describe("Background image"),

// In component
{has_background_image && background_image?.source && (
  <div style={{ backgroundImage: `url(${background_image.source})` }}>
    {/* Content */}
  </div>
)}
```

---

## Project-Specific Documentation

This universal guide should be complemented with project-specific documentation. Create additional docs that define:

### 1. Project Design System (`project-design-system.md`)

Document your specific design choices:

```markdown
# Project Design System

## Color Palette
- **Primary**: #001F54 (Dark Blue) - Use for main CTAs, headings
- **Secondary**: #D4A574 (Gold) - Use for accents, highlights
- **Accent**: #FFD700 (Yellow) - Use for attention-grabbing elements

## Typography
- **Headings**: M PLUS Rounded 1c
- **Body**: Exo 2

## Spacing Standards
- Section padding: `py-16` (desktop), `py-12` (mobile)
- Container: `container mx-auto px-4`
- Gaps: `gap-4`, `gap-8`, `gap-12`

## Component Usage
- Buttons: Use `<Button variant="primary|secondary|outline" />` from `@/components/ui`
- Images: Use `<KitImage />` with lazy loading
- Links: Use `<KitLink />` for routing
```

### 2. Component Library Reference (`components-reference.md`)

Document all available UI components:

```markdown
# Component Library

## Button (`@/components/ui/Button`)
- Variants: primary, secondary, outline
- Sizes: sm, md, lg
- Props: variant, size, href, onClick, icon, etc.

## Card Component
[Document your card component if you have one]

## Modal Component
[Document your modal component if you have one]
```

### 3. Section Examples (`section-examples.md`)

Provide real examples from your project:

```markdown
# Section Examples

See `resources/js/sections/Header.tsx` for:
- Complex navigation handling
- Mobile menu patterns
- Fixed navbar on scroll

See `resources/js/sections/Footer.tsx` for:
- Multi-column layouts
- Contact information display
- Social media integration
```

### How to Use Both Guides

1. **Start with this Universal Guide** - Understand the Smart CMS patterns, Zod schemas, and workflow
2. **Refer to Project-Specific Docs** - Get exact color codes, component names, and design patterns
3. **Check Existing Sections** - Look at similar sections in `resources/js/sections/` for patterns
4. **Ask Questions** - When in doubt, ask about project-specific conventions

---

## Quick Start Checklist

When creating a new section:

- [ ] Read this universal guide to understand Smart CMS patterns
- [ ] Check project-specific design system docs for colors, fonts, spacing
- [ ] Look at `resources/css/app.css` for theme variables
- [ ] Check `resources/js/components/ui/` for available UI components
- [ ] Review similar sections in `resources/js/sections/` for patterns
- [ ] Create schema with at least one field
- [ ] Use `z.infer<typeof schema>` for type safety
- [ ] Add `.describe()` to all fields
- [ ] Provide sensible defaults
- [ ] Use existing UI components (Button, etc.)
- [ ] Use Kit components (KitImage, KitLink, KitIcon)
- [ ] Follow project color palette and spacing
- [ ] Make it responsive
- [ ] Test in admin panel
- [ ] Run `npm run build`

---

This universal guide provides the foundation for creating sections in any Smart CMS project. Combine it with your project-specific documentation for best results.
