import { atom, computed } from "nanostores"
import { MetricId } from "protofun"
import { Alert, AlertData } from "protofun-service"

import { app, socket } from "./feathers-app"

export type { Alert }
export const $alerts = atom<Alert[]>([])

export const $activeAlerts = computed($alerts, (all) => {
  return all.filter((x) => !x.paused).length
})

export async function createAlert(alert: AlertData) {
  await app.service("alerts").create(alert)
}

export async function removeAlert(alert: Alert) {
  await app.service("alerts").patch(alert.id, {
    paused: true,
  })
}

export function findAlertsForMetric(metricId: MetricId) {
  return $alerts.get().filter((x) => x.metricId === metricId)
}

/**
 * Setup & teardown
 */

function handleCreated(alert: Alert) {
  // console.log("📜 LOG > app.service > alert created:", alert)
  $alerts.set([alert, ...$alerts.get()])
}

function handlePatched(alert: Alert) {
  // console.log("📜 LOG > app.service > alert patched:", alert)
  $alerts.set(
    $alerts.get().map((x) => {
      if (x.id === alert.id) return alert
      return x
    })
  )
}

async function setup() {
  // console.log("📜 LOG > app.service alerts > setup")
  const { data } = await app.service("alerts").find({
    query: {
      $sort: {
        createdAt: -1,
      },
    },
  })

  $alerts.set(data as Alert[])

  app.service("alerts").on("created", handleCreated)
  app.service("alerts").on("patched", handlePatched)
}

function teardown() {
  // console.log("📜 LOG > app.service alerts > teardown")
  app.service("alerts").removeListener("created", handleCreated)
  app.service("alerts").removeListener("patched", handlePatched)
  $alerts.set([])
}

app.on("login", setup)
app.on("logout", teardown)
socket.on("disconnect", teardown)
