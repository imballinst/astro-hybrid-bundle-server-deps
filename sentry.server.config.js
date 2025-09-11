import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Note: @sentry/profiling-node is available in package.json but requires
  // native binaries that cannot be bundled in standalone deployments.
  // For production use with profiling, consider using traditional deployments
  // with node_modules or Docker containers that include all dependencies.
  
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
});