import { build } from "vite";

const widgets = [
    { name: "pan", entry: "src/widgets/mountWidget.tsx" },
];


async function buildWidgets() {
    for (const widget of widgets) {
        await build({
            configFile: "./vite.config.ts",
            build: {
                sourcemap: false,
                emptyOutDir: false,
                assetsInlineLimit: Infinity,
                assetsDir: "assets",
                outDir: "dist-widgets",
                rollupOptions: {
                    input: widget.entry,
                    output: {
                        format: "iife",
                        name: widget.name.charAt(0).toUpperCase() + widget.name.slice(1) + "Widget",
                        entryFileNames: `${widget.name}.js`,
                        assetFileNames: "assets/[name]-[hash][extname]"
                    },
                },
            },
        });
        console.log(`Built ${widget.name}`);
    }
}

buildWidgets().catch((err) => {
    console.error(err);
    process.exit(1);
});
