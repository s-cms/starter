import type { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import z from "zod";

export const contentSchema = z.object({
    container: z.boolean().default(true).describe("Enable container"),
    style: z
        .enum(["primary", "secondary", "basic"])
        .default("primary")
        .describe("Background style variant"),
})
    .meta({
        id: "Content",
        title: "Content",
        description:
            "Content section for pages",
        component: Content,
    })


function Content(props: z.infer<typeof contentSchema>) {
    const { container, style } = props;
    const { page } = usePage().props as unknown as PageProps;
    const backgroundClasses = {
        primary: {
            background: "bg-primary",
            text: "text-primary-foreground",
        },
        secondary: {
            background: "bg-secondary",
            text: "text-secondary-foreground",
        },
        basic: {
            background: "bg-background",
            text: "text-foreground",
        },
    }

    return (
        <section className={`${backgroundClasses[style].background} ${backgroundClasses[style].text}`}>
            <div className={`relative z-10 mx-auto px-4 ${container ? "container mx-auto" : ""}`}>
                {page.content && (
                    <div
                        className={`prose ${backgroundClasses[style].text}`}
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                )}
            </div>
        </section>
    )
}
