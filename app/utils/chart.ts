import { formatNumber } from "protofun"

import { isMobile } from "./client-utils"

export function createPriceFormatter(
  significantDigits: number,
  unitLabel: string,
  compact?: boolean
) {
  return (x: number) =>
    `${formatNumber(x, significantDigits, compact ? "compact" : undefined)} ${
      isMobile ? "" : unitLabel
    }`
}
