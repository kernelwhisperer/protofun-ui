// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

Sentry.init({
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  dsn:
    process.env.NODE_ENV === "development"
      ? ""
      : "https://672b2daf06ae4f9d8ca9956097e75502@o4505410061795328.ingest.sentry.io/4505410080931840",

  release: process.env.NEXT_PUBLIC_GIT_HASH,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
})
