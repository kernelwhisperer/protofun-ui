import { OverridedMixpanel } from "mixpanel-browser";
import { atom } from "nanostores";

export const $fullAppVersion = atom<string>("");
export const $mixpanel = atom<OverridedMixpanel | undefined>();
