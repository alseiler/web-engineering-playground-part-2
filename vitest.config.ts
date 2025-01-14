import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,ts,tsx}'],
    setupFiles: './tests/setupTests.ts',
    coverage: {
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
});
