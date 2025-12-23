import { Link } from "@inertiajs/react";
import { Rocket, Sparkles, Zap } from "lucide-react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { ImageSchema, LinkSchema } from "./types";

const DELAY = 100;
const welcomeBannerSchema = z
    .object({
        title: z
            .string()
            .describe("Welcome banner title")
            .default("Welcome to Smart CMS"),
        subtitle: z
            .string()
            .optional()
            .describe("Subtitle or description text")
            .default(
                "Get started building beautiful pages with our block-based content management system. Create, customize, and manage your content effortlessly."
            ),
        primary_cta: LinkSchema.describe("Primary call-to-action button"),
        secondary_cta: LinkSchema.optional()
            .describe("Secondary call-to-action button"),
        background_image: ImageSchema.optional().describe(
            "Optional background image"
        ),
        features: z
            .array(
                z.object({
                    icon: z
                        .enum(["sparkles", "zap", "rocket"])
                        .default("sparkles")
                        .describe("Feature icon"),
                    title: z.string().describe("Feature title"),
                    description: z.string().optional().describe("Feature description"),
                })
            )
            .default([
                {
                    icon: "sparkles" as const,
                    title: "Easy to Use",
                    description: "Intuitive block-based editor",
                },
                {
                    icon: "zap" as const,
                    title: "Fast & Powerful",
                    description: "Built with modern technology",
                },
                {
                    icon: "rocket" as const,
                    title: "Flexible",
                    description: "Customize everything you need",
                },
            ])
            .describe("Feature highlights"),
        style: z
            .enum(["gradient", "solid", "image"])
            .default("gradient")
            .describe("Background style variant"),
    })
    .meta({
        id: "WelcomeBanner",
        title: "Welcome Banner",
        description:
            "Attractive welcome banner for new Smart CMS users with features and CTAs",
        component: WelcomeBanner,
    });

const iconMap = {
    sparkles: Sparkles,
    zap: Zap,
    rocket: Rocket,
};

export default function WelcomeBanner(
    props: z.infer<typeof welcomeBannerSchema>
) {
    const {
        title,
        subtitle,
        primary_cta,
        secondary_cta,
        background_image,
        features,
        style,
    } = props;

    const backgroundClasses = {
        gradient:
            "bg-gradient-to-br from-primary via-primary/90 to-muted text-primary-foreground",
        solid: "bg-primary text-primary-foreground",
        image: "bg-primary/95 text-primary-foreground relative",
    };

    return (
        <section
            className={`relative overflow-hidden py-20 md:py-32 ${backgroundClasses[style]}`}
        >
            {style === "image" && background_image?.src && (
                <div className="absolute inset-0 z-0">
                    <img
                        alt={background_image.alt || "Background"}
                        className="h-full w-full object-cover opacity-20"
                        height={background_image.height}
                        src={background_image.src}
                        width={background_image.width}
                    />
                    <div className="absolute inset-0 bg-primary/80" />
                </div>
            )}

            <div className="container relative z-10 mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Main Content */}
                    <div className="fade-in-up mb-12 animate-in space-y-6 duration-700">
                        <h1 className="font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mx-auto max-w-2xl text-lg leading-relaxed opacity-90 md:text-xl">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Feature Highlights */}
                    {features && features.length > 0 && (
                        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => {
                                const IconComponent = iconMap[feature.icon] || Sparkles;
                                return (
                                    <div
                                        className="group rounded-lg bg-background/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-background/20"
                                        key={`${feature.icon}-${feature.title}`}
                                        style={{
                                            animationDelay: `${index * DELAY}ms`,
                                        }}
                                    >
                                        <div className="mb-4 inline-flex rounded-lg bg-background/20 p-3">
                                            <IconComponent className="size-6 text-current" />
                                        </div>
                                        <h3 className="mb-2 font-semibold text-lg">
                                            {feature.title}
                                        </h3>
                                        {feature.description && (
                                            <p className="text-sm opacity-80">
                                                {feature.description}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Call-to-Action Buttons */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        {primary_cta && (
                            <Button asChild className="gap-2" size="lg" variant="default">
                                <Link
                                    href={primary_cta.url}
                                    rel={
                                        primary_cta.is_external ? "noopener noreferrer" : undefined
                                    }
                                    target={primary_cta.is_external ? "_blank" : "_self"}
                                >
                                    {primary_cta.title}
                                    <Rocket className="size-4" />
                                </Link>
                            </Button>
                        )}
                        {secondary_cta && (
                            <Button
                                asChild
                                className="gap-2 border-background/30 bg-background/10 text-current backdrop-blur-sm hover:bg-background/20"
                                size="lg"
                                variant="outline"
                            >
                                <Link
                                    href={secondary_cta.url}
                                    rel={
                                        secondary_cta.is_external
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    target={secondary_cta.is_external ? "_blank" : "_self"}
                                >
                                    {secondary_cta.title}
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="-z-10 absolute inset-0 overflow-hidden">
                <div className="-top-40 -right-40 absolute size-80 rounded-full bg-accent/20 blur-3xl" />
                <div className="-bottom-40 -left-40 absolute size-80 rounded-full bg-secondary/20 blur-3xl" />
            </div>
        </section>
    );
}

export { welcomeBannerSchema };
