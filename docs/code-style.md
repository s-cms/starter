# Code Style Guide

**Note:** This guide complements `laravel-boost.mdc` (base Laravel/React/TypeScript conventions). Only unique project-specific patterns are documented here.

## Core Principles

### Code Philosophy
- **Minimalism:** Write only what's necessary. Avoid over-abstraction unless truly needed.
- **Practicality:** Favor simple, working, maintainable code over theoretically "perfect" patterns.
- **DRY with Discipline:** Only abstract when you have **3+ similar use cases**. If use cases will diverge, keep them separate.

### Argument Order Convention
Main entities first, options/configs last. Use DTOs/arrays for multiple options.

```php
// ✅ Good
public function createPost(User $user, string $title, array $options = [])

// ❌ Bad
public function createPost(string $title, User $user, $option1, $option2, $option3)
```

### Error Handling
Never silence errors. Always handle or propagate. Never log sensitive data (passwords, tokens, personal info).

```php
// ✅ Good
try {
    $data = $api->fetch();
} catch (\Exception $e) {
    Log::error('API fetch failed', ['error' => $e->getMessage()]);
    throw new ApiException('Failed to fetch data', 0, $e);
}
```

---

## Backend Patterns

### Model Organization
Follow this strict order for consistency:

```php
/**
 * Post model
 *
 * @property int $id
 * @property string $title
 * @property string $content
 * @property string $status
 * @property \Carbon\Carbon $published_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Post extends Model
{
    // 1. Constants
    const STATUS_DRAFT = 'draft';
    const STATUS_PUBLISHED = 'published';

    // 2. Properties ($guarded, $casts, etc.)
    protected $guarded = [];

    // 3. Relationships
    public function author() { ... }

    // 4. Scopes
    public function scopePublished($query) { ... }

    // 5. Accessors/Mutators
    public function getTitleAttribute($value) { ... }

    // 6. Business Logic Methods
    public function publish() { ... }
}
```

**Note:** This project uses `$guarded = []` instead of `$fillable`. Always add PHPDoc blocks with `@property` annotations for IDE support.

### Traits Pattern
Encapsulate reusable model behavior. Keep them isolated and single-purpose.

```php
// app/Traits/HasStatus.php
trait HasStatus
{
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }
}

// Usage
class Post extends Model
{
    use HasStatus, HasSeo, HasTranslates;
}
```

---

## Frontend Patterns

### Component Organization Structure
Follow this exact order within components:

```tsx
// 1. Imports
import { useState } from 'react';
import { usePage } from '@inertiajs/react';

// 2. Interfaces/Types
interface MyComponentProps {
  title: string;
  items: Item[];
}

// 3. Component
export default function MyComponent({ title, items }: MyComponentProps) {
  // 4. Hooks
  const { props } = usePage<PageProps>();
  const [isOpen, setIsOpen] = useState(false);

  // 5. Derived state (no useState)
  const activeItems = items.filter(item => item.isActive);

  // 6. Event handlers
  const handleClick = () => { ... };

  // 7. Effects (if needed)
  // useEffect(...)

  // 8. Early returns
  if (!items.length) return <EmptyState />;

  // 9. Render
  return <div>...</div>;
}
```

### Conditional Classes
Use `cn` helper (combines clsx + tailwind-merge) from `@/lib/utils`:

```tsx
import { cn } from '@/lib/utils';

<button
  className={cn(
    'px-4 py-2 rounded transition-colors',
    isActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Button
</button>
```

---

## Smart CMS Specific

### Section Schema Rules

**Critical:** Schema cannot be empty (minimum 1 field). Always use predefined schemas.

```tsx
import z from "zod";
import { ImageSchema, LinkSchema } from "./types";

export const heroSchema = z.object({
  title: z.string().describe("Hero title").default("Welcome"),
  subtitle: z.string().optional().describe("Subtitle"),
  image: ImageSchema.describe("Background image"),
  cta: LinkSchema.describe("Call to action"),
  style: z.enum(['light', 'dark']).default('dark'),
}).meta({
  id: "HeroSection",
  title: "Hero Section",
  description: "Main hero banner",
  component: HeroSection
});
```

### Component Implementation

Use `z.infer` for types. Always check optional fields. Use existing UI components.

```tsx
import { Button } from '@/components/ui';
import { KitImage, KitLink, KitIcon } from '@/components/kit';

export default function HeroSection(props: z.infer<typeof heroSchema>) {
  const { title, subtitle, image, cta, style } = props;

  return (
    <section className={`hero hero--${style}`}>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {image?.source && (
        <KitImage
          options={{ url: image.source, alt: image.alt }}
          loading="eager"
        />
      )}
      <Button variant="primary" size="lg" href={cta.url}>
        {cta.title}
      </Button>
    </section>
  );
}
```

### Predefined Schemas (from `types.ts`)
Always use these instead of creating custom ones:

- `ImageSchema` - Image data (source, alt, width, height)
- `LinkSchema` - Link data (url, title, is_external, icon)
- `NavigationSchema` - Navigation menu with nested children
- `PhonesSchema`, `EmailsSchema`, `SocialsSchema` - Contact links
- `PopularItems`, `PopularCategories` - Page collections

### System Variables (via usePage)
Access global data without adding to schema:

```tsx
import { usePage } from "@inertiajs/react";

export default function MySection(props: z.infer<typeof mySchema>) {
  const { props: pageProps } = usePage();

  const logo = pageProps.logo;              // ImageSchema
  const companyName = pageProps.company_name; // string
  const page = pageProps.page;              // Current page data

  return <section>...</section>;
}
```

### Common Patterns to Avoid
- ❌ Empty schemas: `z.object({})`
- ❌ Custom button styling instead of `<Button>`
- ❌ Custom CSS instead of Tailwind utilities
- ❌ Recreating predefined schemas (Image, Link, etc.)
- ❌ Over-abstraction (abstract only at 3+ use cases)
- ❌ Index as key: `key={index}` (use unique IDs)
- ❌ Unnecessary state for derived values
- ❌ Using `clsx` directly (use `cn` from `@/lib/utils` instead)
- ❌ Using `$fillable` in models (use `$guarded = []` instead)

---

## Related Documentation

- **[Universal Section Creation Guide](./universal-section-creation-guide.md)** - Comprehensive guide for creating Smart CMS sections
- **[Project Design System](./project-design-system.md)** - Project-specific colors, components, and patterns
- **[laravel-boost.mdc](./laravel-boost.mdc)** - Base Laravel/React/TypeScript conventions

---

**Note:** For Laravel/React/TypeScript base conventions (Actions, Eloquent, Inertia patterns, TypeScript rules, testing), refer to `laravel-boost.mdc`. This guide covers only project-specific patterns unique to Smart CMS.
