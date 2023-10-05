import { atom } from "nanostores"

import { patchPushSubscription } from "../api/users-api"
import { $user } from "../stores/app"
import { getDeviceId } from "../utils/client-utils"

export const $serviceWorker = atom<ServiceWorkerRegistration | undefined>()
export const $pushPubKey = atom<string>("")
export const $pushSubscription = atom<PushSubscription | null>(null)

export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function enableWebPush() {
  try {
    const serviceWorker = $serviceWorker.get()
    const user = $user.get()
    const pushPubKey = $pushPubKey.get()

    if (!serviceWorker || !user) return

    const convertedVapidKey = urlBase64ToUint8Array(pushPubKey)

    const subscription = await serviceWorker.pushManager.subscribe({
      applicationServerKey: convertedVapidKey,
      userVisibleOnly: true,
    })
    console.log("ServiceWorker subscription: ", !!subscription)
    $pushSubscription.set(subscription)

    await patchPushSubscription(getDeviceId(), subscription)
  } catch (error) {
    if (error instanceof Error && error.message.includes("permission denied")) {
      throw new Error("Push notifications denied by user.")
    }

    throw error
  }
}

export async function disableWebPushOnDevice() {
  await $pushSubscription.get()?.unsubscribe()
  $pushSubscription.set(null)
}
