import { defineConfig } from 'astro/config';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [
        viteCommonjs()
    ]
  }
});
