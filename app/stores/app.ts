import { atom } from "nanostores"
import { User } from "protofun-service"

export type ReducedMotionSetting = "always" | "never" | "user"
export const $reducedMotion = atom<ReducedMotionSetting>("user")
export const $loopsAllowed = atom<boolean>(false)

export interface AppVerProps {
  appVer: string
  gitHash: string
}

export const $user = atom<User | null>(null)
