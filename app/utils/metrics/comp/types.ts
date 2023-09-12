export type Market = {
  id: string
  name: string
}

export type MarketDailySnapshot = {
  market: Market
  openPositionCount: number
  timestamp: string
  totalValueLockedUSD: string
}
