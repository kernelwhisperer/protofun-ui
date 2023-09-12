"use client"
import React, { useEffect } from "react"
import { v4 as uuid } from "uuid"

import { $fullAppVersion, $mixpanel, AppVerProps } from "../../stores/app"

interface AnalyticsProviderProps extends AppVerProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children, appVer, gitHash }: AnalyticsProviderProps) {
  useEffect(() => {
    if (window.location.toString().includes("localhost")) {
      return
    }

    import("mixpanel-browser")
      .then((x) => x.default)
      .then((mixpanel) => {
        import("@sentry/nextjs").then(({ captureException, setUser }) => {
          let userId = localStorage.getItem("fun-user-uuid")
          if (!userId) {
            userId = uuid()
            localStorage.setItem("fun-user-uuid", userId)
          }

          setUser({ id: userId })

          if (!process.env.NEXT_PUBLIC_MIXPANEL) {
            captureException(new Error("Mixpanel token missing"))
            return
          }

          // Replace YOUR_TOKEN with your Project Token
          // Note: This is configured to track an event for every page view automatically.
          mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL, {
            api_host: "/mp",
            // debug: true,
            ignore_dnt: true,
            track_pageview: false,
          })

          // Set this to a unique identifier for the user performing the event.
          // eg: their ID in your database or their email address.
          mixpanel.identify(userId)

          $fullAppVersion.set(`${appVer}@${gitHash}`)
          $mixpanel.set(mixpanel)
        })
      })

    import("posthog-js")
      .then((x) => x.default)
      .then((posthog) => {
        import("@sentry/nextjs").then(({ captureException, setUser }) => {
          let userId = localStorage.getItem("fun-user-uuid")
          if (!userId) {
            userId = uuid()
            localStorage.setItem("fun-user-uuid", userId)
          }

          setUser({ id: userId })

          if (!process.env.NEXT_PUBLIC_POSTHOG) {
            captureException(new Error("Posthog token missing"))
            return
          }

          if (window.location.toString().includes("localhost")) {
            posthog.debug()
          }

          posthog.init(process.env.NEXT_PUBLIC_POSTHOG, {
            api_host: "/ph",
            ui_host: "https://eu.posthog.com",
          })

          posthog.identify(userId)

          // $fullAppVersion.set(`${appVer}@${gitHash}`);
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}
