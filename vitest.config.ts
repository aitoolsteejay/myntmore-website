import { defineConfig } from "vitest/config";
import path from "node:path";

// Unit tests for lib/ (no DOM, so the node environment is enough). "server-only" throws outside a
// React server bundle, so tests import its empty build instead.
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "."), "server-only": path.resolve(__dirname, "node_modules/server-only/empty.js") } },
  test: { environment: "node", include: ["lib/**/*.test.ts"] },
});
