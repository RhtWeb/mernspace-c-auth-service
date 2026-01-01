import { defineConfig } from "vitest/config";

export default defineConfig({
  // plugins:[tsconfigPaths()],
  test: {
    environment: "node",
    globals: true,
    typecheck: {
      tsconfig: "./tsconfig.test.json",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
    exclude: ["node_modules", "dist"],
  },
});
