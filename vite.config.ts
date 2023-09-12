// vite.config.ts

import { defineConfig } from "vite"

export default defineConfig({
  test: {
    deps: {
      // https://github.com/vitejs/vite/issues/7879
      fallbackCJS: true,
    },
  },
})
