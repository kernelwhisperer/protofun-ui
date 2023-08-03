"use client";
import React, { useEffect } from "react";

import { AppVerProps } from "../../stores/app";

interface SentryProviderProps extends AppVerProps {
  children: React.ReactNode;
}

export function SentryProvider({ children, gitHash }: SentryProviderProps) {
  useEffect(() => {
    // TODO load a subset?
    import("@sentry/nextjs").then((Sentry) => {
      Sentry.init({
        // Setting this option to true will print useful information to the console while you're setting up Sentry.
        debug: false,

        dsn:
          process.env.NODE_ENV === "development"
            ? ""
            : "https://672b2daf06ae4f9d8ca9956097e75502@o4505410061795328.ingest.sentry.io/4505410080931840",

        // You can remove this option if you're not planning to use the Sentry Session Replay feature:
        integrations:
          process.env.NODE_ENV === "development"
            ? []
            : [
                new Sentry.Replay({
                  blockAllMedia: false,
                  maskAllText: false,
                }),
              ],
        release: gitHash,

        replaysOnErrorSampleRate: 1.0,

        // This sets the sample rate to be 10%. You may want this to be 100% while
        // in development and sample at a lower rate in production
        replaysSessionSampleRate: 1.0,

        // Adjust this value in production, or use tracesSampler for greater control
        tracesSampleRate: 1,

        tunnel: "/monitoring?o=4505410061795328&p=4505410080931840",
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
