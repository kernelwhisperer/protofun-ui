"use client"

import { useEffect } from "react"

import { $pushPubKey, $pushSubscription, $serviceWorker } from "../../utils/client-utils"

interface ServiceWorkerProviderProps {
  children: React.ReactNode
  pushPubKey: string
}

export function ServiceWorkerProvider({ children, pushPubKey }: ServiceWorkerProviderProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log("ServiceWorker start")
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("ServiceWorker registered: ", registration)
          $serviceWorker.set(registration)

          return registration.pushManager.getSubscription()
        })
        .then((subscription) => {
          console.log("📜 LOG > ServiceWorkerProvider > push subscription:", subscription)
          $pushSubscription.set(subscription)
        })
        .catch((registrationError) => {
          console.log("ServiceWorker registration failed: ", registrationError)
        })
    } else {
      console.log("ServiceWorker skipped")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    $pushPubKey.set(pushPubKey)
  }, [pushPubKey])

  return children
}
