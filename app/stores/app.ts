import { Mixpanel } from "mixpanel-browser"
import { atom } from "nanostores"

export const $fullAppVersion = atom<string>("")
export const $mixpanel = atom<Mixpanel | undefined>()

export type ReducedMotionSetting = "always" | "never" | "user"
export const $reducedMotion = atom<ReducedMotionSetting>("user")
export const $loopsAllowed = atom<boolean>(false)

export interface AppVerProps {
  appVer: string
  gitHash: string
}
