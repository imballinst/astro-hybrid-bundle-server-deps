import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sentry from '@sentry/astro';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    sentry({
      dsn: process.env.SENTRY_DSN,
      sourceMapsUploadOptions: {
        enabled: false,
      },
    }),
  ],
  vite: {
    ssr: {
      // Bundle all dependencies for standalone deployment
      noExternal: true,
    },
    build: {
      // Ensure all dependencies are bundled
      rollupOptions: {
        external: [],
      },
    },
  },
});