"use client"

import { useStore } from "@nanostores/react"
import { useEffect } from "react"

import { patchPushSubscription } from "../../api/users-api"
import { $user } from "../../stores/user"
import { $serviceWorker, urlBase64ToUint8Array } from "../../utils/client-utils"

interface WebPushProviderProps {
  children: React.ReactNode
  pushPubKey: string
}

export function WebPushProvider({ children, pushPubKey }: WebPushProviderProps) {
  const serviceWorker = useStore($serviceWorker)
  const user = useStore($user)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log("SW start")
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
          $serviceWorker.set(registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    } else {
      console.log("SW skipped")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!serviceWorker || !user) return

    const convertedVapidKey = urlBase64ToUint8Array(pushPubKey)
    serviceWorker.pushManager
      .subscribe({
        applicationServerKey: convertedVapidKey,
        userVisibleOnly: true,
      })
      .then(patchPushSubscription)
  }, [pushPubKey, serviceWorker, user])

  return children
}
