// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  dsn: "https://672b2daf06ae4f9d8ca9956097e75502@o4505410061795328.ingest.sentry.io/4505410080931840",

  release: `${(process.env.APP_VER as string).replaceAll('"', "")}@${
    process.env.GIT_HASH
  }`,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
});
