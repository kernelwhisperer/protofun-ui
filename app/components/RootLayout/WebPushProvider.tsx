"use client"

import { useEffect } from "react"

import { patchPushSubscription } from "../../api/users-api"
import { urlBase64ToUint8Array } from "../../utils/client-utils"

interface WebPushProviderProps {
  children: React.ReactNode
  pushPubKey: string
}

export function WebPushProvider({ children, pushPubKey }: WebPushProviderProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log("SW start")
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
          const convertedVapidKey = urlBase64ToUint8Array(pushPubKey)
          registration.pushManager
            .subscribe({
              applicationServerKey: convertedVapidKey,
              userVisibleOnly: true,
            })
            .then(patchPushSubscription)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    } else {
      console.log("SW skipped")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}
