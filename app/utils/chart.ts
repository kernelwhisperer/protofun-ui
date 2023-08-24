import { formatNumber, isMobile } from "./client-utils";

export function createPriceFormatter(
  significantDigits: number,
  unitLabel: string,
  compact?: boolean
) {
  if (isMobile) return;

  return (x: number) =>
    `${formatNumber(
      x,
      significantDigits,
      compact ? "compact" : undefined
    )} ${unitLabel}`;
}
