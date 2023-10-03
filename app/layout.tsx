import React from "react"

import { AnalyticsProvider } from "./components/RootLayout/AnalyticsProvider"
import { App } from "./components/RootLayout/App"
import { SentryProvider } from "./components/RootLayout/SentryProvider"
import { ServiceWorkerProvider } from "./components/RootLayout/ServiceWorkerProvider"
import ThemeProvider from "./components/Theme/ThemeProvider"

export const metadata = {
  description: "On-chain data aggregation",
  title: "Protocol Fundamentals",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const appVer = (process.env.NEXT_PUBLIC_APP_VER as string).replaceAll('"', "")
  const gitHash = process.env.NEXT_PUBLIC_GIT_HASH as string
  const pushPubKey = process.env.NEXT_PUBLIC_PUSH_PUB_KEY as string

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="sitemap" href="/sitemap.xml" />
        {/* TODO */}
        {/* <link
          href="favicon-light.png"
          rel="icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          href="favicon-dark.png"
          rel="icon"
          media="(prefers-color-scheme: dark)"
        /> */}
      </head>
      <body>
        <AnalyticsProvider appVer={appVer} gitHash={gitHash}>
          <SentryProvider appVer={appVer} gitHash={gitHash}>
            <ServiceWorkerProvider pushPubKey={pushPubKey}>
              <ThemeProvider>
                <App appVer={appVer} gitHash={gitHash}>
                  {children}
                </App>
              </ThemeProvider>
            </ServiceWorkerProvider>
          </SentryProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
