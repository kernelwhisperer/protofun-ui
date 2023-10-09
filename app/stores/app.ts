import { logger } from "@nanostores/logger"
import { atom } from "nanostores"
import type { PostHog } from "posthog-js"
import type { User } from "protofun-service"

import { isProduction } from "../utils/client-utils"

export type ReducedMotionSetting = "always" | "never" | "user"
export const $reducedMotion = atom<ReducedMotionSetting>("user")
export const $loopsAllowed = atom<boolean>(false)

export interface AppVerProps {
  appVer: string
  gitHash: string
}

export const $user = atom<User | null>(null)

export const $isFirstPaint = atom<boolean>(true)

export const $posthog = atom<PostHog | null>(null)

if (!isProduction) {
  logger(
    {
      $isFirstPaint,
      $loopsAllowed,
      $reducedMotion,
      $user,
    },
    {
      messages: {
        mount: false,
        unmount: false,
      },
    }
  )
}
