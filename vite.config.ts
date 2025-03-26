// vite.config.ts
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const isWidgetBuild = process.env.BUILD_TARGET === "widgets";

export default defineConfig({
  base: isWidgetBuild ? "/widgets/" : "/",
  plugins: [
    react(),
    ...(isWidgetBuild
      ? [
          cssInjectedByJsPlugin({
            jsAssetsFilterFunction: (fileName) =>
              ["nps.js", "esign.js", "protean.js"].includes(
                fileName.preliminaryFileName
              ),
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: isWidgetBuild
    ? {
        outDir: "dist-widgets",
        assetsDir: "assets",
        assetsInlineLimit: Infinity,
        rollupOptions: {
          input: {
            nps: path.resolve(__dirname, "src/widgets/nps/mountWidget.tsx"),
            esign: path.resolve(__dirname, "src/widgets/esign/mountWidget.tsx"),
            protean: path.resolve(
              __dirname,
              "src/widgets/protean/mountWidget.tsx"
            ),
            protean_employee: path.resolve(
              __dirname,
              "src/widgets/protean_employee/mountWidget.tsx"
            ),
            protean_international: path.resolve(
              __dirname,
              "src/widgets/protean_international/mountWidget.tsx"
            ),
            protean_plus: path.resolve(
              __dirname,
              "src/widgets/protean_plus/mountWidget.tsx"
            ),
            protean_rise: path.resolve(
              __dirname,
              "src/widgets/protean_rise/mountWidget.tsx"
            ),
            protean_tinpan: path.resolve(
              __dirname,
              "src/widgets/protean_tinpan/mountWidget.tsx"
            ),
            protean_x: path.resolve(
              __dirname,
              "src/widgets/protean_x/mountWidget.tsx"
            ),
          },
          output: {
            entryFileNames: "[name].js",
            format: "iife",
          },
        },
      }
    : {},
});
