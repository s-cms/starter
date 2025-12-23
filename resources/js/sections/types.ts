import { z } from 'zod'

// ============================================================================
// Mock Data (for default values)
// ============================================================================

const mockImage = {
    alt: "Sample image",
    src: "/images/sample.jpg",
    srcset: "/images/sample.jpg 1x, /images/sample@2x.jpg 2x",
    width: 800,
    height: 600,
}

const mockLink = {
    title: "Sample Link",
    type: "link",
    is_external: false,
    icon: "arrow-right",
    url: "/sample",
}

const mockPage = {
    id: 1,
    name: "Sample Page",
    slug: "sample-page",
    url: "/sample-page",
    image: mockImage,
    banner: mockImage,
    title: "Sample Page Title",
    heading: "Sample Heading",
    summary: "This is a sample page summary",
    content: "<p>Sample page content</p>",
    description: "Sample page description",
    keywords: "sample, page, test",
    depth: 1,
    published_at: "2024-01-01 12:00:00",
    views: 100,
    children_count: 0,
    breadcrumbs: [
        {
            name: "Home",
            url: {
                title: "Home",
                is_external: false,
                url: "/",
            },
        },
    ],
    settings: {},
    layout_settings: {},
    is_root: false,
}

const mockPhones = [
    {
        title: "+1 234 567 8900",
        type: "tel",
        is_external: false,
        icon: "phone",
        url: "tel:+12345678900",
    },
    {
        title: "+1 234 567 8901",
        type: "tel",
        is_external: false,
        icon: "phone",
        url: "tel:+12345678901",
    },
]

const mockEmails = [
    {
        title: "contact@example.com",
        type: "email",
        is_external: false,
        icon: "mail",
        url: "mailto:contact@example.com",
    },
    {
        title: "support@example.com",
        type: "email",
        is_external: false,
        icon: "mail",
        url: "mailto:support@example.com",
    },
]

const mockSocials = [
    {
        name: "Facebook",
        url: {
            title: "Facebook",
            type: "link",
            is_external: true,
            icon: "facebook",
            url: "https://facebook.com/example",
        },
        icon: "facebook",
        image: {
            alt: "Facebook",
            src: "/images/facebook-icon.png",
            srcset: "/images/facebook-icon.png 1x, /images/facebook-icon@2x.png 2x",
            width: 32,
            height: 32,
        },
    },
    {
        name: "Twitter",
        url: {
            title: "Twitter",
            type: "link",
            is_external: true,
            icon: "twitter",
            url: "https://twitter.com/example",
        },
        icon: "twitter",
        image: {
            alt: "Twitter",
            src: "/images/twitter-icon.png",
            srcset: "/images/twitter-icon.png 1x, /images/twitter-icon@2x.png 2x",
            width: 32,
            height: 32,
        },
    },
]

const mockMenu = [
    {
        title: "Home",
        url: "/",
        icon: "home",
    },
    {
        title: "About",
        url: "/about",
        icon: "info",
    },
]

const mockPages = [
    mockPage,
    {
        ...mockPage,
        id: 2,
        name: "Another Page",
        slug: "another-page",
        url: "/another-page",
    },
]

// ============================================================================
// HTTP Resources Schemas
// ============================================================================

/**
 * Image schema
 * Used for image/media data in Inertia responses
 */
const ImageSchema = z.object({
    alt: z.string(),
    src: z.string(),
    srcset: z.string(),
    width: z.number(),
    height: z.number(),
})
    .describe("Image")
    .meta({
        inputType: "image",
    })
    .default(mockImage)

/**
 * Breadcrumb item schema
 */
const breadcrumbItemSchema = z.object({
    name: z.string(),
    url: z.object({
        title: z.string(),
        is_external: z.boolean(),
        url: z.string(),
    }),
})

/**
 * Page schema
 * Used for page data in Inertia responses
 */
const PageSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    url: z.string(),
    image: ImageSchema,
    banner: ImageSchema,
    title: z.string().nullable(),
    heading: z.string().nullable(),
    summary: z.string().nullable(),
    content: z.string().nullable(),
    description: z.string().nullable(),
    keywords: z.string().nullable(),
    depth: z.number(),
    published_at: z.string().nullable(),
    views: z.number(),
    children_count: z.number().optional(),
    breadcrumbs: z.array(breadcrumbItemSchema).optional(),
    is_root: z.boolean().optional(),
}).passthrough()
    .describe("Page Resource")

// ============================================================================
// Variable Types Schemas
// ============================================================================

/**
 * Link object schema (used in PhonesType, EmailsType, LinkType)
 */
const linkObjectSchema = z.object({
    title: z.string(),
    type: z.string(),
    is_external: z.boolean(),
    icon: z.string(),
    url: z.string(),
})

/**
 * Phones schema
 * Returns array of phone link objects
 */
const PhonesSchema = z.array(linkObjectSchema)
    .describe("Phones")
    .meta({
        inputType: "phones",
    })
    .default(mockPhones)

/**
 * Emails schema
 * Returns array of email link objects
 */
const EmailsSchema = z.array(linkObjectSchema)
    .describe("Emails")
    .meta({
        inputType: "emails",
    })
    .default(mockEmails)

/**
 * Socials schema
 * Returns array of social media objects
 */
const SocialsSchema = z.array(
    z.object({
        name: z.string(),
        url: linkObjectSchema,
        icon: z.string(),
        image: ImageSchema,
    })
)
    .describe("Social Media Links")
    .meta({
        inputType: "socials",
    })
    .default(mockSocials)

/**
 * Menu schema
 * Returns array of menu link items (structure may vary, this is a base schema)
 */
const MenuSchema = z.array(
    z.object({
        title: z.string(),
        url: z.string(),
        icon: z.string().optional(),
        target: z.string().optional(),
        children: z.array(z.any()).optional(), // Nested menu items
    }).passthrough() // Allow additional menu item properties
)
    .describe("Menu")
    .meta({
        inputType: "menu",
    })
    .default(mockMenu)

/**
 * PopularCategories schema
 * Returns array of Page resources
 */
const PopularCategoriesSchema = z.array(PageSchema)
    .describe("Popular Categories")
    .meta({
        inputType: "popular_categories",
    })
    .default(mockPages)

/**
 * RandomCategories schema
 * Returns array of Page resources
 */
const RandomCategoriesSchema = z.array(PageSchema)
    .describe("Random Categories")
    .meta({
        inputType: "random_categories",
    })
    .default(mockPages)

/**
 * LatestCategories schema
 * Returns array of Page resources
 */
const LatestCategoriesSchema = z.array(PageSchema)
    .describe("Latest Categories")
    .meta({
        inputType: "latest_categories",
    })
    .default(mockPages)

/**
 * PopularItems schema
 * Returns array of Page resources
 */
const PopularItemsSchema = z.array(PageSchema)
    .describe("Popular Items")
    .meta({
        inputType: "popular_items",
    })
    .default(mockPages)

/**
 * RandomItems schema
 * Returns array of Page resources
 */
const RandomItemsSchema = z.array(PageSchema)
    .describe("Random Items")
    .meta({
        inputType: "random_items",
    })
    .default(mockPages)

/**
 * LatestItems schema
 * Returns array of Page resources
 */
const LatestItemsSchema = z.array(PageSchema)
    .describe("Latest Items")
    .meta({
        inputType: "latest_items",
    })
    .default(mockPages)

/**
 * Link schema
 * Returns a single link object
 */
const LinkSchema = linkObjectSchema
    .describe("Link")
    .meta({
        inputType: "link",
    })
    .default(mockLink)

/**
 * Icon schema
 * Returns icon identifier string (e.g., "lucide-iconname")
 */
const IconSchema = z.string()
    .describe("Icon")
    .meta({
        inputType: "icon",
    })
    .default("lucide-bug")

/**
 * Image schema (variable type)
 * Same as ImageSchema but with variable type metadata
 */
const ImageTypeSchema = ImageSchema
    .describe("Image")
    .meta({
        inputType: "image",
    })

/**
 * File schema
 * Returns file URL string
 */
const FileSchema = z.string()
    .describe("File")
    .meta({
        inputType: "file",
    })
    .default("/favicon.ico")

/**
 * KeyValue schema
 * Returns key-value object/dictionary
 */
const KeyValueSchema = z.record(z.string(), z.unknown())
    .describe("Key-Value Pairs")
    .meta({
        inputType: "key_value",
    })
    .default({
        key: "value",
    })

// ============================================================================
// Schema Registry
// ============================================================================

const Schemas = {
    phones: PhonesSchema,
    emails: EmailsSchema,
    socials: SocialsSchema,
    menu: MenuSchema,
    popular_categories: PopularCategoriesSchema,
    random_categories: RandomCategoriesSchema,
    latest_categories: LatestCategoriesSchema,
    popular_items: PopularItemsSchema,
    random_items: RandomItemsSchema,
    latest_items: LatestItemsSchema,
    link: LinkSchema,
    icon: IconSchema,
    image: ImageTypeSchema,
    file: FileSchema,
    key_value: KeyValueSchema,
} as const

// ============================================================================
// Exports
// ============================================================================

// HTTP Resources
export { ImageSchema, PageSchema }

// Variable Types
export {
    EmailsSchema, FileSchema, IconSchema,
    ImageTypeSchema, KeyValueSchema, LatestCategoriesSchema, LatestItemsSchema,
    LinkSchema, MenuSchema, PhonesSchema, PopularCategoriesSchema, PopularItemsSchema, RandomCategoriesSchema, RandomItemsSchema, SocialsSchema
}

// Registry
export { Schemas }

// Types
export type ImageType = z.infer<typeof ImageSchema>
export type PageType = z.infer<typeof PageSchema>
export type PhonesType = z.infer<typeof PhonesSchema>
export type EmailsType = z.infer<typeof EmailsSchema>
export type SocialsType = z.infer<typeof SocialsSchema>
export type MenuType = z.infer<typeof MenuSchema>
export type PopularCategories = z.infer<typeof PopularCategoriesSchema>
export type RandomCategories = z.infer<typeof RandomCategoriesSchema>
export type LatestCategories = z.infer<typeof LatestCategoriesSchema>
export type PopularItems = z.infer<typeof PopularItemsSchema>
export type RandomItems = z.infer<typeof RandomItemsSchema>
export type LatestItems = z.infer<typeof LatestItemsSchema>
export type LinkType = z.infer<typeof LinkSchema>
export type IconType = z.infer<typeof IconSchema>
export type ImageTypeVariable = ImageType // Same type as ImageType since structure is identical
export type FileType = z.infer<typeof FileSchema>
export type KeyValueType = z.infer<typeof KeyValueSchema>

// Utility Types
export type SchemaName = keyof typeof Schemas

/**
 * Helper function to validate variable type data
 */
export function validateVariableType<T extends SchemaName>(
    type: T,
    data: unknown
): z.infer<typeof Schemas[T]> {
    return Schemas[type].parse(data) as z.infer<typeof Schemas[T]>
}

const originalAdd = z.globalRegistry.add;

// terrible hack for vite's HMR:
// without this monkey-patch, zod will throw an error whenever editing a schema file that uses
// `.register` as it would try to re-register the schema with the same ID again
// with this patch, re-registering will just replace the schema in the registry
z.globalRegistry.add = (
  schema: Parameters<typeof originalAdd>[0],
  meta: Parameters<typeof originalAdd>[1]
) => {
  if (!meta.id) {
    return originalAdd.call(z.globalRegistry, schema, meta);
  }
  const existingSchema = z.globalRegistry._idmap.get(meta.id);
  if (existingSchema) {
    z.globalRegistry.remove(existingSchema);
    z.globalRegistry._idmap.delete(meta.id);
  }
  return originalAdd.call(z.globalRegistry, schema, meta);
};
