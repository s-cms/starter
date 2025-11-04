import { Head } from "@inertiajs/react";
import { type BlockData, renderBlocks } from "@/lib/blocks";

export type PageProps = {
  blocks: BlockData[];
  meta?: {
    title?: string;
    description?: string;
    canonical?: string;
    image?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export default function Page({ blocks, meta }: PageProps) {
  return (
    <>
      <Head title={meta?.title || "Page"}>
        {meta?.description && (
          <meta content={meta.description} name="description" />
        )}
        {meta?.canonical && <link href={meta.canonical} rel="canonical" />}
        {meta?.image && <meta content={meta.image} property="og:image" />}
      </Head>
      {renderBlocks(blocks)}
    </>
  );
}
