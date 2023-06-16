import React from "react";

import { getBuiltGraphSDK } from "../.graphclient";
import { GasChart } from "./components/HomePage/GasChart";
import { PageWrapper } from "./components/RootLayout/PageWrapper";

export default async function HomePage() {
  const sdk = getBuiltGraphSDK();
  const result = await sdk.FetchBlocks();

  return (
    <PageWrapper>
      <GasChart data={result.blockMetas.reverse()} />
    </PageWrapper>
  );
}
