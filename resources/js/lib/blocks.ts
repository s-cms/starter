import React from "react";
import z from "zod";
export const sections = import.meta.glob("../sections/*.tsx", { eager: true });
export function exportToJson(): string {
  const schemas = z.toJSONSchema(z.globalRegistry, {
    target: "openapi-3.0",
    override(ctx) {
      // biome-ignore lint: schema generation
      const zodSchema = ctx.zodSchema as z.ZodObject<any>;
      const def = ctx.zodSchema._zod.def;
      if (def.type === "array") {
        ctx.jsonSchema.default = zodSchema.safeParse(undefined)?.data ?? [];
      }
    },
  });
  return JSON.stringify(schemas, null, 2);
}

function BlockPlaceholder({ id, reason }: { id: string; reason: string }) {
  return React.createElement(
    "section",
    {
      className:
        "container mx-auto my-8 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 px-4 py-10 text-center",
    },
    React.createElement(
      "p",
      { className: "font-semibold text-foreground text-lg" },
      "Block under construction"
    ),
    React.createElement(
      "p",
      { className: "mt-1 text-muted-foreground text-sm" },
      `"${id}" — ${reason}`
    )
  );
}

export function renderBlock(id: string, data?: unknown) {
  // biome-ignore lint: schema generation
  const entry = z.globalRegistry._idmap.get(id) as z.ZodType<any>;
  if (!entry) {
    const errorMessage = `Section component not found: "${id}"`;
    if (import.meta.env.DEV) {
      // biome-ignore lint: for development, uses only in vite
      console.error(`[BlockRenderer] ${errorMessage}`, {
        id,
        availableComponents: Object.keys(z.globalRegistry._idmap),
      });
    }
    return React.createElement(BlockPlaceholder, {
      id,
      reason: "section component not registered",
    });
  }
  const component = entry.meta()?.component || null;
  if (!component) {
    const errorMessage = `Section component not found: "${id}"`;
    if (import.meta.env.DEV) {
      // biome-ignore lint: for development, uses only in vite
      console.error(`[BlockRenderer Component] ${errorMessage}`, {
        id,
      });
    }
    return React.createElement(BlockPlaceholder, {
      id,
      reason: "component missing from schema meta",
    });
  }
  const safeData = entry.safeParse(data);
  if (!safeData.success) {
    const errorMessage = "Block data failed schema validation";
    if (import.meta.env.DEV) {
      // biome-ignore lint: for development, uses only in vite
      console.error(`[BlockRenderer] ${errorMessage}`, {
        id,
        data: safeData,
        actualData: data,
      });
    }
    return React.createElement(BlockPlaceholder, {
      id,
      reason: "missing or invalid content for this locale",
    });
  }
  return React.createElement(
    component as React.ComponentType<unknown>,
    safeData.data
  );
}

export type BlockData = {
  id: string;
  data?: unknown;
};

export function renderBlocks(blocks: BlockData[]) {
  return blocks.map((block, index) =>
    React.createElement(
      React.Fragment,
      { key: `block-${index}` },
      renderBlock(block.id, block.data)
    )
  );
}
