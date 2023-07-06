import { OverridedMixpanel } from "mixpanel-browser";
import { atom } from "nanostores";

export const $fullAppVersion = atom<string>("");
export const $mixpanel = atom<OverridedMixpanel | undefined>();

export type ReducedMotionConfig = "always" | "never" | "user";
export const $reducedMotion = atom<ReducedMotionConfig>("user");

export interface AppVerProps {
  appVer: string;
  gitHash: string;
}
