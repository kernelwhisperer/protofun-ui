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

export const lineChartOptions = {
  // LightweightCharts.LineStyle.Dotted,
  axisLabelVisible: true,
  lineStyle: 3,
  lineWidth: 1,
  title: "🕒",
} as const
