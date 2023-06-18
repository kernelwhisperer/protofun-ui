import React from "react";

import { getBuiltGraphSDK } from "../.graphclient";
import { GasPage } from "./components/HomePage/GasPage";
import { PageWrapper } from "./components/RootLayout/PageWrapper";

export default async function HomePage() {
  const sdk = getBuiltGraphSDK();
  const { blocks } = await sdk.FetchLastBlocks();

  return (
    <PageWrapper>
      <GasPage initialData={blocks.reverse()} />
    </PageWrapper>
  );
}
