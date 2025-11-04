// vite-plugin-schema-generator.ts
import { spawn } from "node:child_process";
import type { Plugin } from "vite";

export function schemaGeneratorPlugin(): Plugin {
  let isGenerating = false;

  function runSchemaGenerator() {
    if (isGenerating) {
      return;
    }
    isGenerating = true;

    return new Promise((resolve, reject) => {
      // biome-ignore lint: for development, uses only in vite
      console.log("🔄 Regenerating schemas...");
      const child = spawn("npm", ["run", "generate:schemas"], {
        stdio: "inherit",
        shell: true,
      });

      child.on("close", (code) => {
        isGenerating = false;
        if (code === 0) {
          // biome-ignore lint: for development, uses only in vite
          console.log("✅ Schemas regenerated");
          resolve(true);
        } else {
          reject(new Error(`Schema generation failed with code ${code}`));
        }
      });
    });
  }

  // Debounce to avoid multiple rapid regenerations

  return {
    name: "schema-generator",

    async buildStart() {
      await runSchemaGenerator();
    },

    configureServer(server) {
      // Watch for changes in dev mode
      server.watcher.add("resources/js/sections/**/*.tsx");

      server.watcher.on("change", (file) => {
        if (file.includes("/sections/") && file.endsWith(".tsx")) {
          runSchemaGenerator();
        }
      });

      server.watcher.on("add", (file) => {
        if (file.includes("/sections/") && file.endsWith(".tsx")) {
          runSchemaGenerator();
        }
      });

      server.watcher.on("unlink", (file) => {
        if (file.includes("/sections/") && file.endsWith(".tsx")) {
          runSchemaGenerator();
        }
      });
    },

    handleHotUpdate({ file, server }) {
      if (file.includes("/sections/") && file.endsWith(".tsx")) {
        runSchemaGenerator();

        // Trigger HMR for files that import the generated schemas
        const generatedModule = server.moduleGraph.getModuleById(
          "/resources/js/generated/schema-registry.ts"
        );
        if (generatedModule) {
          server.ws.send({
            type: "full-reload", // or 'update' for HMR
          });
        }
      }
    },
  };
}
