"use client";
import { captureException, setUser } from "@sentry/nextjs";
import mixpanel from "mixpanel-browser";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";

import { $fullAppVersion, $mixpanel } from "../../stores/app";

interface AnalyticsProviderProps {
  appVer: string;
  children: React.ReactNode;
  gitHash: string;
}

export function AnalyticsProvider({
  children,
  appVer,
  gitHash,
}: AnalyticsProviderProps) {
  useEffect(() => {
    let userId = localStorage.getItem("fun-user-uuid");
    if (!userId) {
      userId = uuid();
      localStorage.setItem("fun-user-uuid", userId);
    }

    setUser({ id: userId });

    if (!process.env.NEXT_PUBLIC_MIXPANEL) {
      captureException(new Error("Mixpanel token missing"));
      return;
    }

    // Replace YOUR_TOKEN with your Project Token
    // Note: This is configured to track an event for every page view automatically.
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL, {
      api_host: "/mp",
      debug: process.env.NODE_ENV === "development",
      ignore_dnt: process.env.NODE_ENV !== "development",
      // ignore_dnt: true,
      track_pageview: false,
    });

    // Set this to a unique identifier for the user performing the event.
    // eg: their ID in your database or their email address.
    mixpanel.identify(userId);

    $fullAppVersion.set(`${appVer}@${gitHash}`);
    $mixpanel.set(mixpanel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
