import * as Sentry from "@sentry/astro";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  
  // Profiling integration
  integrations: [nodeProfilingIntegration()],
  
  // Set profilesSampleRate to 1.0 to profile 100% of sampled transactions.
  profilesSampleRate: 1.0,
});