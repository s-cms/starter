import z from "zod";

export const LinkSchema = z
  .object({
    title: z.string().optional().describe("Link title").default("Link title"),
    url: z.url().default("/"),
    icon: z.string().optional().describe("Link icon"),
    is_external: z.boolean().describe("Is external").default(false),
  })
  .meta({
    inputType: "link", // Signal to admin panel to render link builder
  });
const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 300;
export const ImageSchema = z
  .object({
    width: z
      .number()
      .optional()
      .describe("Width in pixels")
      .default(DEFAULT_WIDTH),
    height: z
      .number()
      .optional()
      .describe("Height in pixels")
      .default(DEFAULT_HEIGHT),
    source: z
      .string()
      .optional()
      .describe("Image source")
      .default("https://placehold.co/400"),
    alt: z.string().optional().describe("Alt text").default("Alt text"),
  })
  .meta({
    inputType: "image",
  });

const PageSchema = z.object({
  id: z.number().describe("Page ID").default(0),
  parent_id: z.number().describe("Parent ID").nullable().default(null),
  name: z.string().describe("Page name").default("Page name"),
  slug: z.string().describe("Page slug").default("slug"),
  url: z.url().describe("Page URL").default("url"),
  image: ImageSchema.nullable(),
  banner: ImageSchema.nullable(),
  heading: z.string().describe("Page heading").default("heading"),
  summary: z.string().describe("Page summary").default("summary"),
  is_root: z.coerce.boolean().describe("Is root").default(false),
  depth: z.number().describe("Depth").default(0),
});
export const PopularCategories = z
  .array(PageSchema)
  .describe("Popular categories")
  .meta({
    inputType: "popular_categories",
  })
  .default([]);
export const PopularItems = z
  .array(PageSchema)
  .describe("Popular items")
  .meta({
    inputType: "popular_items",
  })
  .default([]);
type NavigationItem = {
  title: string;
  url: string | z.infer<typeof LinkSchema>;
  active?: boolean;
  children?: NavigationItem[];
};
const NavigationItemSchema: z.ZodType<NavigationItem> = z.lazy(() =>
  z.object({
    title: z.string(),
    url: z.union([z.string(), LinkSchema]),
    active: z.boolean().optional(),
    children: z.array(NavigationItemSchema).optional(),
  })
);
export const NavigationSchema = z
  .array(NavigationItemSchema)
  .describe("Menu")
  .meta({
    inputType: "menu",
  })
  .default([
    {
      title: "Home",
      url: "/",
      active: true,
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Contact",
      url: "/contact",
      children: [
        {
          title: "Contact 1",
          url: "/contact/1",
        },
        {
          title: "Contact 2",
          url: "/contact/2",
        },
      ],
    },
  ]);

export const PhonesSchema = z
  .array(LinkSchema)
  .describe("Phones")
  .meta({
    inputType: "phones",
  })
  .default([
    {
      title: "+11 222 333 444",
      url: "tel:+11222333444",
      is_external: false,
    },
    {
      title: "+11 222 333 555",
      url: "tel:+11222333555",
      is_external: false,
    },
  ]);
export const EmailsSchema = z
  .array(LinkSchema)
  .describe("Emails")
  .meta({
    inputType: "emails",
  })
  .default([
    {
      title: "email@example.com",
      url: "mailto:email@example.com",
      is_external: false,
    },
    {
      title: "email2@example.com",
      url: "mailto:email2@example.com",
      is_external: false,
    },
  ]);
const SocialMediaSchema = z.object({
  name: z.string().describe("Social media name").default("Social media name"),
  url: LinkSchema,
  icon: z.string().optional(),
  image: ImageSchema.optional(),
});
export const SocialsSchema = z
  .array(SocialMediaSchema)
  .describe("Socials")
  .meta({
    inputType: "socials",
  })
  .default([
    {
      name: "Facebook",
      url: {
        title: "Facebook",
        url: "https://facebook.com",
        is_external: true,
      },
      icon: "icon-facebook",
    },
    {
      name: "Twitter",
      url: {
        title: "Twitter",
        url: "https://twitter.com",
        is_external: true,
      },
      icon: "icon-twitter",
    },
  ]);

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
