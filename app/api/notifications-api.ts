import { atom, computed } from "nanostores"
import { Notification, NotificationData } from "protofun-service"

import { app, socket } from "./feathers-app"

export const $notifications = atom<Notification[]>([])

export const $unreadNotifications = computed($notifications, (all) => {
  return all.filter((x) => !x.archived).length
})

export async function createNotification(notification: NotificationData) {
  await app.service("notifications").create(notification)
}

export async function archiveNotification(notification: Notification) {
  await app.service("notifications").patch(notification.id, {
    archived: true,
  })
}

/**
 * Setup & teardown
 */

function handleCreated(notification: Notification) {
  // console.log("📜 LOG > app.service > notification created:", notification)
  $notifications.set([...$notifications.get(), notification])
}

function handlePatched(notification: Notification) {
  // console.log("📜 LOG > app.service > notification patched:", notification)
  $notifications.set(
    $notifications.get().map((x) => {
      if (x.id === notification.id) return notification
      return x
    })
  )
}

async function setup() {
  // console.log("📜 LOG > app.service notifications > setup")
  const { data } = await app.service("notifications").find({
    query: {
      $sort: {
        createdAt: -1,
      },
    },
  })
  $notifications.set(data as Notification[])

  app.service("notifications").on("created", handleCreated)
  app.service("notifications").on("patched", handlePatched)
}

function teardown() {
  // console.log("📜 LOG > app.service notifications > teardown")
  app.service("notifications").removeListener("created", handleCreated)
  app.service("notifications").removeListener("patched", handlePatched)
  $notifications.set([])
}

app.on("login", setup)
app.on("logout", teardown)
socket.on("disconnect", teardown)
