import React from "react";

import { GasPage } from "./components/HomePage/GasPage";
import { PageWrapper } from "./components/RootLayout/PageWrapper";
import { getLatestBlocks } from "./utils/block-utils";
import { getLatestCandles } from "./utils/candle-utils";

export default async function HomePage() {
  const [candles, blocks] = await Promise.all([
    getLatestCandles("Minute"),
    getLatestBlocks(),
  ]);

  return (
    <PageWrapper>
      <GasPage blocks={blocks} candles={candles} />
    </PageWrapper>
  );
}
