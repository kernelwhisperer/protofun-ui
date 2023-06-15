import React from "react";

import { execute, FetchBlocksDocument } from "../.graphclient";
import { PageWrapper } from "./components/RootLayout/PageWrapper";

export default async function HomePage() {
  const result = await execute(FetchBlocksDocument, {});
  console.log("📜 LOG > result:", result);

  return <PageWrapper>hello world</PageWrapper>;
}
