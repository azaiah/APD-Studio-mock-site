import { defineConfig } from 'vitest/config';

// Pins the Vitest root to this package. Without a config file here, Vitest walks
// up the directory tree and picks up an unrelated vite.config.ts outside the repo.
export default defineConfig({
  test: { include: ['test/**/*.test.ts'] },
});
