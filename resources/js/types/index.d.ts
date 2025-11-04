import type z from "zod";
import type { ImageSchema, LinkSchema } from "@/sections/types";

/**
 * Type definitions for Smart CMS page data and Inertia.js shared props
 * These types provide autocomplete and type safety when accessing data via usePage() hook
 */

// ============================================================================
// PAGE DATA TYPES (from PageController)
// ============================================================================

/**
 * Page resource data structure returned from PageController
 * This represents a single page/category/item in the CMS
 */
export interface PageData {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  url: string;
  image: z.infer<typeof ImageSchema> | null;
  banner: z.infer<typeof ImageSchema> | null;
  heading: string;
  summary: string;
  content?: string; // HTML content
  title?: string; // SEO title
  description?: string; // SEO description
  is_root: boolean;
  depth: number;
}

/**
 * Block data structure for sections
 * Each block represents a section instance on a page
 */
export interface BlockData {
  id: string; // Block type ID (e.g., "WelcomeBanner", "Header")
  data: Record<string, unknown>; // Section schema data
}

/**
 * Meta data for SEO and social sharing
 */
export interface MetaData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  microdata?: Record<string, unknown>;
  tags?: Array<{
    name: string;
    content: string;
  }>;
  scripts?: string[];
}

// ============================================================================
// INERTIA SHARED PROPS (from HandleInertiaRequests)
// ============================================================================

/**
 * Language/locale routing information
 */
export interface LanguageRoute {
  locale: string;
  url: string;
  name: string;
  is_current: boolean;
}

/**
 * Host information as a link
 */
export interface HostLink {
  title: string;
  type: "link";
  is_external: boolean;
  url: string;
}

/**
 * Inertia.js shared props available globally via usePage()
 * These props are available on every page request
 *
 * @example
 * ```tsx
 * import { usePage } from "@inertiajs/react";
 * import type { InertiaSharedProps } from "@/types";
 *
 * const { props } = usePage<InertiaSharedProps>();
 * const logo = props.logo;
 * const companyName = props.company_name;
 * ```
 */
export interface InertiaSharedProps {
  // Site information
  host: HostLink;
  hostname: string;
  company_name: string;
  logo: z.infer<typeof ImageSchema>;
  default_image: z.infer<typeof ImageSchema>;

  // Localization
  locale: string; // Current locale code (e.g., "en", "es")
  locales: LanguageRoute[]; // Available language routes
  translations: Record<string, string>; // Translation strings for current locale

  // SEO and meta information
  meta: MetaData;

  // Auth (optional, may be undefined if not authenticated)
  auth?: {
    user?: {
      id: number;
      name: string;
      email: string;
      [key: string]: unknown;
    };
  };

  // Flash messages (optional)
  flash?: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
  };

  // Errors (optional, for form validation)
  errors?: Record<string, string>;
}

/**
 * Page-specific props passed from PageController
 * These props are specific to the current page being rendered
 *
 * @example
 * ```tsx
 * import { usePage } from "@inertiajs/react";
 * import type { PageProps } from "@/types";
 *
 * const { props } = usePage<PageProps>();
 * const page = props.page;
 * const blocks = props.blocks;
 * ```
 */
export interface PageProps extends InertiaSharedProps {
  // Current page data
  page: PageData;

  // Blocks/sections to render on this page
  blocks: BlockData[];

  // Related pages (categories or items)
  categories?: {
    data: PageData[];
    links: unknown[];
    meta: {
      current_page: number;
      total: number;
      per_page: number;
      last_page: number;
    };
  };

  items?: {
    data: PageData[];
    links: unknown[];
    meta: {
      current_page: number;
      total: number;
      per_page: number;
      last_page: number;
    };
  };
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Helper type to extract schema types
 * Use this when you need to get the inferred type from a Zod schema
 *
 * @example
 * ```tsx
 * type MyImage = SchemaType<typeof ImageSchema>;
 * type MyLink = SchemaType<typeof LinkSchema>;
 * ```
 */
export type SchemaType<T extends z.ZodTypeAny> = z.infer<T>;

/**
 * Helper type for image data
 */
export type ImageData = z.infer<typeof ImageSchema>;

/**
 * Helper type for link data
 */
export type LinkData = z.infer<typeof LinkSchema>;

/**
 * Legacy type for backward compatibility
 * @deprecated Use InertiaSharedProps instead
 */
export type SharedData = InertiaSharedProps;
