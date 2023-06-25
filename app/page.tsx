import React from "react";

import { HomePage } from "./components/HomePage/HomePage";
import { PageWrapper } from "./components/RootLayout/PageWrapper";

export default async function HomePageServer() {
  return (
    <PageWrapper>
      <HomePage />
    </PageWrapper>
  );
}
