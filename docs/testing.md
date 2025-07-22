# Testing

## Setup

> Vitest is used in this repo for testing.

To setup testing in a project in this workspace, update the `vitest.config.mts`
file with the following:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    ...
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ['text', 'json', 'json-summary', 'lcovonly'],
    },
    reporters: ['default', 'junit'],
    outputFile: './coverage/test-report.junit.xml',
    ...
  },
});
```

If you do not have a `vitest.config.mts` file, and you have a Vite config file, `vite.config.ts`,
update it the test config to include the following:

```ts
export default defineConfig({
  ...
  test: {
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'lcovonly'],
    },
    reporters: ['default', 'junit'],
    outputFile: './coverage/test-report.junit.xml',
  },
  ...
});
```
