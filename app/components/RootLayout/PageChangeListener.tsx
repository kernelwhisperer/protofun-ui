"use client"
import { useStore } from "@nanostores/react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { $fullAppVersion, $mixpanel } from "../../stores/app"

export function PageChangeListener() {
  const pathname = usePathname()
  const mixpanel = useStore($mixpanel)

  useEffect(() => {
    if (!mixpanel) return
    mixpanel?.track_pageview({
      version: $fullAppVersion.get(),
    })
  }, [pathname, mixpanel])

  return null
}
