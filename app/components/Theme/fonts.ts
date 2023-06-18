// Fonts Example
// eslint-disable-next-line camelcase
import { Roboto_Flex, Roboto_Mono } from "next/font/google";

// https://v-fonts.com/fonts/roboto-flex
const RobotoFlex = Roboto_Flex({
  axes: ["slnt", "YTUC", "wdth", "XTRA"],
  display: "fallback", // TODO: not sure
  subsets: ["latin"],
});

export const RobotoFlexFF = [
  RobotoFlex.style.fontFamily,
  "Helvetica",
  "Arial",
  "sans-serif",
  "system-ui",
].join(",");

// const RobotoSerif = Roboto_Serif({
//   display: "fallback", // TODO: not sure
//   subsets: ["latin"],
// });

// export const RobotoSerifFF = [
//   RobotoSerif.style.fontFamily,
//   "Roboto Mono",
//   "Helvetica",
//   "Arial",
//   "sans-serif",
//   "system-ui",
// ].join(",");

const RobotoMono = Roboto_Mono({
  display: "fallback", // TODO: not sure
  subsets: ["latin"],
});

export const RobotoMonoFF = [
  RobotoMono.style.fontFamily,
  "Roboto Mono",
  "Helvetica",
  "Arial",
  "sans-serif",
  "system-ui",
].join(",");
