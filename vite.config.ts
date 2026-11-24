import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/oxfmt.ts", "src/oxlint.ts"],
    dts: true,
  },
});
