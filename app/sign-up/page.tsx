import React from "react"

import { PageWrapper } from "../components/RootLayout/PageWrapper"
import { SignUp } from "../components/SignUpPage"

export const metadata = {
  title: "Sign up · Protocol Fundamentals",
}

export default function SignUpServer() {
  return (
    <PageWrapper>
      <SignUp />
    </PageWrapper>
  )
}
