import React from "react"

import { ProPage } from "../components/ProPage/ProPage"
import { PageWrapper } from "../components/RootLayout/PageWrapper"

export const metadata = {
  title: "Pro Chart · Protocol Fundamentals",
}

export default async function ProPageServer() {
  return (
    <PageWrapper>
      <ProPage />
    </PageWrapper>
  )
}
