import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/ai',
  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{src,lib,components}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: process.env.GITHUB_ACTIONS ? ['verbose', 'github-actions', 'junit'] : ['verbose'],
    outputFile: './coverage/test-report.junit.xml',
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'json-summary', 'lcovonly'],
    },
  },
});
