"use client"
import React, { useEffect } from "react"

import { AppVerProps } from "../../stores/app"
import { getDeviceId, isProduction } from "../../utils/client-utils"

interface AnalyticsProviderProps extends AppVerProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children, appVer, gitHash }: AnalyticsProviderProps) {
  useEffect(() => {
    if (!isProduction) {
      return
    }

    import("posthog-js")
      .then((x) => x.default)
      .then((posthog) => {
        import("@sentry/nextjs").then(({ captureException, setUser }) => {
          const userId = getDeviceId()

          setUser({ id: userId })

          if (!process.env.NEXT_PUBLIC_POSTHOG) {
            captureException(new Error("Posthog token missing"))
            return
          }

          if (window.location.toString().includes("localhost")) {
            posthog.debug(true)
          } else {
            posthog.debug(false)
          }

          posthog.init(process.env.NEXT_PUBLIC_POSTHOG, {
            api_host: "/ph",
            ui_host: "https://eu.posthog.com",
          })

          posthog.identify(userId, {
            appVer,
            gitHash,
          })
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}
