"use client";
import React, { useEffect } from "react";

import { AppVerProps } from "../../stores/app";

interface SentryProviderProps extends AppVerProps {
  children: React.ReactNode;
}

export function SentryProvider({ children, gitHash }: SentryProviderProps) {
  useEffect(() => {
    if (window.location.toString().includes("localhost")) {
      return;
    }
    // TODO load a subset?
    import("@sentry/nextjs").then((Sentry) => {
      Sentry.init({
        // Setting this option to true will print useful information to the console while you're setting up Sentry.
        // debug: true,
        dsn: "https://672b2daf06ae4f9d8ca9956097e75502@o4505410061795328.ingest.sentry.io/4505410080931840",
        release: gitHash,
        // Adjust this value in production, or use tracesSampler for greater control
        tracesSampleRate: 1,
        tunnel: "/monitoring?o=4505410061795328&p=4505410080931840",
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
