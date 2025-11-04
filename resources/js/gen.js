import fs from "node:fs";
import { pathToFileURL } from "node:url";
import dotenv from "dotenv";
import { glob } from "glob";
import z from "zod";

dotenv.config();

function exportToJson() {
  const schemas = z.toJSONSchema(z.globalRegistry, {
    target: "openapi-3.0",
    override(ctx) {
      const zodSchema = ctx.zodSchema;
      const def = ctx.zodSchema._zod.def;
      if (def.type === "array") {
        ctx.jsonSchema.default = zodSchema.safeParse(undefined)?.data ?? [];
      }
    },
  });
  return JSON.stringify(schemas, null, 2);
}

async function syncBlocksWithBackend() {
  // Get backend URL from environment, fallback to localhost:8000
  const backendUrl = process.env.APP_URL || "http://localhost:8000";
  const syncUrl = `${backendUrl}/api/blocks/sync-schemas`;

  try {
    // biome-ignore lint: for development, uses only in vite
    console.log(`🔄 Syncing blocks with backend at ${backendUrl}...`);

    const response = await fetch(syncUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      // biome-ignore lint: for development, uses only in vite
      console.warn("⚠ Failed to sync blocks with backend:", {
        status: response.status,
        statusText: response.statusText,
      });
      return;
    }

    const result = await response.json();

    if (result.success) {
      // biome-ignore lint: for development, uses only in vite
      console.log(
        `✅ Blocks synced: ${result.updated} updated, ${result.unchanged} unchanged`
      );
    } else {
      // biome-ignore lint: for development, uses only in vite
      console.warn(`⚠ Block sync completed with errors: ${result.message}`);
    }
  } catch (error) {
    // biome-ignore lint: for development, uses only in vite
    console.warn(
      "⚠ Could not connect to backend to sync blocks:",
      error.message
    );
    // biome-ignore lint: for development, uses only in vite
    console.warn(`   Attempted URL: ${syncUrl}`);
  }
}

async function buildSchema() {
  const sectionFiles = await glob("resources/js/sections/**/*.{ts,tsx}", {
    ignore: ["**/*.test.*", "**/*.spec.*"],
    absolute: true,
  });
  for (const file of sectionFiles) {
    const fileUrl = pathToFileURL(file).href;
    try {
      await import(fileUrl);
    } catch (error) {
      // biome-ignore lint: for development, uses only in vite
      console.error(`Failed to import section file: ${file}`, error);
    }
  }
  const json = exportToJson();

  fs.writeFileSync("storage/app/sections_1.json", json);
  // biome-ignore lint: for development, uses only in vite
  console.log("✅ Schema file written to storage/app/sections_1.json");

  // Sync blocks with backend
  await syncBlocksWithBackend();
}
buildSchema();
