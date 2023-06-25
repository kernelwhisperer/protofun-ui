import React from "react";

import { MetricPage } from "../../components/MetricPage/MetricPage";
import { PageWrapper } from "../../components/RootLayout/PageWrapper";

export default async function MetricPageServer() {
  // const [candles, blocks] = await Promise.all([
  //   queryCandles("Minute").catch((error) => {
  //     console.error(error);
  //     captureException(error);
  //     return [];
  //   }),
  //   queryBlocks().catch((error) => {
  //     console.error(error);
  //     captureException(error);
  //     return [];
  //   }),
  // ]);

  return (
    <PageWrapper>
      <MetricPage blocks={[]} candles={[]} />
    </PageWrapper>
  );
}
