import { User } from "protofun-service"

import { $user } from "../stores/user"
import { getDeviceId, isProduction } from "../utils/client-utils"
import { app } from "./feathers-app"

export async function checkLogin() {
  try {
    const { user } = await app.reAuthenticate()
    $user.set(user)
  } catch (error) {}
}

export async function login(email: string, password: string) {
  const { user } = await app.authenticate({
    email,
    password,
    strategy: "local",
  })

  $user.set(user)
}

export async function logout() {
  await app.logout()
  $user.set(null)
}

export async function signUp(email: string, password: string) {
  await app.service("users").create({
    email,
    password,
  })

  await login(email, password)
}

export async function patchPushSubscription(
  deviceLabel: string,
  subscription: PushSubscription | null
) {
  const user = $user.get()
  if (!user?.id) {
    throw new Error("Login to use notifications.")
  }

  let nextDevices = Array.isArray(user.pushDevices) ? [...user.pushDevices] : []

  if (subscription === null) {
    nextDevices = nextDevices.filter((x) => x.label !== deviceLabel)
  } else {
    nextDevices.push({
      label: deviceLabel,
      sub: subscription.toJSON() as any, // TODO
    })
  }

  await app.service("users").patch(user.id, {
    pushDevices: nextDevices,
  })
}

function handlePatched(user: User) {
  // console.log("📜 LOG > app.service > user patched:", user)
  $user.set(user)
}

async function setup({ user }: any) {
  // console.log("📜 LOG > app.service user > setup")
  app.service("users").on("patched", handlePatched)

  if (!isProduction) {
    return
  }

  import("posthog-js")
    .then((x) => x.default)
    .then((posthog) => {
      const deviceId = getDeviceId()

      if (window.location.toString().includes("localhost")) {
        posthog.debug()
      }

      posthog.identify(deviceId, { email: user.email })
    })
}

function teardown() {
  // console.log("📜 LOG > app.service user > teardown")
  app.service("users").removeListener("patched", handlePatched)
}

app.on("login", setup)
app.on("logout", teardown)
