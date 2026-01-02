export default [
  {
    test: {
      name: "unit",
      include: ["tests/unit/**/*.test.ts"],
      setupFiles: ["tests/setup/unit.setup.ts"],
      environment: "node",
      testTimeout: 10_000, // unit tests should be fast
    },
  },
  {
    test: {
      name: "integration",
      include: ["tests/integration/**/*.test.ts"],
      setupFiles: ["tests/setup/integration.setup.ts"],
      environment: "node",
      testTimeout: 30_000, // integration tests may touch DB
    },
  },
  {
    test: {
      name: "e2e",
      include: ["tests/e2e/**/*.e2e.test.ts"],
      setupFiles: ["tests/setup/e2e.setup.ts"],
      environment: "node",
      testTimeout: 60_000, // e2e can be slower
    },
  },
];
