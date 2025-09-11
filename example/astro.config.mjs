// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",

  adapter: node({
    mode: "standalone",
  }),

  integrations: [
    sentry({
      project: "test",
      org: "test",
      authToken: "test",
    }),
  ],

  vite: {
    ssr: {
      noExternal: true,
      external: ["@sentry/profiling-node"],
    },
  },
});
