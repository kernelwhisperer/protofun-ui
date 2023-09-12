import React from "react"

import { Login } from "../components/LoginPage"
import { PageWrapper } from "../components/RootLayout/PageWrapper"

export const metadata = {
  title: "Login · Protocol Fundamentals",
}

export default function LoginServer() {
  return (
    <PageWrapper>
      <Login />
    </PageWrapper>
  )
}
