import { type BlockData, renderBlocks } from "@/lib/blocks";
import { Head } from "@inertiajs/react";

export type PageProps = {
    blocks: BlockData[];
    meta?: {
        microdata?: any;
        meta?: MetaData;
        links: {
            canonical: string;
            alternate: {
                hreflang: string;
                href: string;
            }[];
        }
    };
};

type MetaData = {
    title?: string;
    description?: string;
    robots?: string;
    image?: string;
    'og:type'?: string;
    'og:title'?: string;
    'og:description'?: string;
    'og:url'?: string;
    'og:image'?: string;
    'og:locale'?: string;
    'og:site_name'?: string;
    'twitter:card'?: string;
    'twitter:site'?: string;
    'twitter:title'?: string;
    'twitter:description'?: string;
}

export default function Page({ blocks, meta }: PageProps) {
    const metaData = meta?.meta;
    return (
        <>
            <Head title={metaData?.title || 'Page'}>
                {metaData?.description && (
                    <meta name="description" content={metaData.description} />
                )}
                {metaData?.robots && (
                    <meta name="robots" content={metaData.robots} />
                )}
                {metaData?.['og:title'] && (
                    <meta property="og:title" content={metaData['og:title']} />
                )}
                {metaData?.['og:description'] && (
                    <meta property="og:description" content={metaData['og:description']} />
                )}
                {metaData?.['og:image'] && (
                    <meta property="og:image" content={metaData['og:image']} />
                )}
                {metaData?.['og:url'] && (
                    <meta property="og:url" content={metaData['og:url']} />
                )}
                {metaData?.['og:type'] && (
                    <meta property="og:type" content={metaData['og:type']} />
                )}
                {metaData?.['og:locale'] && (
                    <meta property="og:locale" content={metaData['og:locale']} />
                )}
                {metaData?.['og:site_name'] && (
                    <meta property="og:site_name" content={metaData['og:site_name']} />
                )}
                {metaData?.['twitter:card'] && (
                    <meta name="twitter:card" content={metaData['twitter:card']} />
                )}
                {metaData?.['twitter:site'] && (
                    <meta name="twitter:site" content={metaData['twitter:site']} />
                )}
                {metaData?.['twitter:title'] && (
                    <meta name="twitter:title" content={metaData['twitter:title']} />
                )}
                {metaData?.['twitter:description'] && (
                    <meta name="twitter:description" content={metaData['twitter:description']} />
                )}
                {meta?.links?.canonical && (
                    <link rel="canonical" href={meta.links.canonical} />
                )}
                {meta?.links?.alternate && meta.links.alternate.map((link, index) => (
                    <link
                        key={index}
                        rel={link.hreflang === 'x-default' ? 'alternate' : 'alternate'}
                        hrefLang={link.hreflang}
                        href={link.href}
                    />
                ))}

                {meta?.microdata && meta.microdata.map((item, index) => (
                    <script key={index}
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} type="application/ld+json" />
                ))}
            </Head>
            {renderBlocks(blocks)}
        </>
    );
}
