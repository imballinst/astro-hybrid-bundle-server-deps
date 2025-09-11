import * as Sentry from "@sentry/astro";

// Conditionally import and initialize profiling
const initializeSentry = async () => {
  let nodeProfilingIntegration = null;
  
  try {
    const profilingModule = await import("@sentry/profiling-node");
    nodeProfilingIntegration = profilingModule.nodeProfilingIntegration;
  } catch (error) {
    console.warn("@sentry/profiling-node not available in standalone deployment:", error.message);
  }

  const integrations = [];
  let profilesSampleRate = 0;

  // Add profiling integration if available
  if (nodeProfilingIntegration) {
    integrations.push(nodeProfilingIntegration());
    profilesSampleRate = 1.0; // Set profilesSampleRate to 1.0 to profile 100% of sampled transactions.
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    
    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    
    // Profiling integration (when available)
    integrations,
    
    // Profiling sample rate (only when profiling is available)
    profilesSampleRate,
  });
};

// Initialize Sentry
initializeSentry().catch(console.error);