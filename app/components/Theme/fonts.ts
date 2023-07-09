// Fonts Example
// eslint-disable-next-line camelcase
import { Roboto_Flex, Roboto_Mono, Roboto_Serif } from "next/font/google";

// https://v-fonts.com/fonts/roboto-flex
const RobotoFlex = Roboto_Flex({
  // axes: ["slnt", "YTUC", "wdth", "XTRA"],
  // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
  display: "swap", // TODO: needs more testing
  subsets: ["latin"],
});

export const RobotoFlexFF = [
  "Roboto Flex", // TODO: needs more testing
  RobotoFlex.style.fontFamily,
  "Helvetica",
  "Arial",
  "sans-serif",
  "system-ui",
].join(",");

const RobotoSerif = Roboto_Serif({
  // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
  display: "swap", // TODO: needs more testing
  subsets: ["latin"],
});

export const RobotoSerifFF = [
  "Roboto Serif", // TODO: needs more testing
  RobotoSerif.style.fontFamily,
  "Helvetica",
  "Arial",
  "sans-serif",
  "system-ui",
].join(",");

const RobotoMono = Roboto_Mono({
  // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
  display: "swap", // TODO: needs more testing
  subsets: ["latin"],
});

export const RobotoMonoFF = [
  "Roboto Mono", // TODO: needs more testing
  RobotoMono.style.fontFamily,
  "Helvetica",
  "Arial",
  "sans-serif",
  "system-ui",
].join(",");
