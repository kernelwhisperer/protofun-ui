import { atom } from "nanostores"
import { Alert as BaseAlert, AlertData } from "protofun-service"

import { MetricId, ProtocolId } from "../stores/metric-declarations"
import { app } from "./feathers-app"

export interface Alert extends BaseAlert {
  metricId: MetricId
  protocolId: ProtocolId
}
export const $alerts = atom<Alert[]>([])

export async function createAlert(alert: AlertData) {
  await app.service("alerts").create(alert)
}

export async function removeAlert(alert: Alert) {
  await app.service("alerts").remove(alert.id)
}

export function findAlertsForMetric(metricId: MetricId) {
  return $alerts.get().filter((x) => x.metricId === metricId)
}

app.on("login", async () => {
  // console.log("📜 LOG > app.service > fetching");
  const { data } = await app.service("alerts").find({
    query: {
      $limit: 100,
    },
  })
  $alerts.set(data as Alert[])

  app.service("alerts").on("created", (alert: Alert) => {
    // console.log("📜 LOG > app.service > alert created:", alert);
    $alerts.set([...$alerts.get(), alert])
  })

  app.service("alerts").on("removed", (alert: Alert) => {
    // console.log("📜 LOG > app.service > alert removed:", alert);
    $alerts.set($alerts.get().filter((x) => x.id !== alert.id))
  })
})

app.on("logout", async () => {
  // console.log("📜 LOG > app.service > removing listeners");
  app.service("alerts").removeAllListeners()
  $alerts.set([])
})
