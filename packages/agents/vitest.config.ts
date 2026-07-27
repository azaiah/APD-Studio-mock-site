import { defineConfig } from 'vitest/config';

// Pins the Vitest root to this package. Without a config file here, Vitest walks
// up the directory tree and picks up an unrelated vite.config.ts outside the repo.
//
// passWithNoTests: this package is currently roster/prompt data only. Its agent
// eval suites arrive in Phase 5 (see WORK-ORDER.md); until then "no tests" is the
// honest state, not a failure.
export default defineConfig({
  test: { include: ['test/**/*.test.ts'], passWithNoTests: true },
});
