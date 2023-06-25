import React from "react";

import { App } from "./components/RootLayout/App";
import { SentryProvider } from "./components/RootLayout/SentryProvider";
export const metadata = {
  description: "On-chain data visualized",
  title: "Protocol Fundamentals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appVer = (process.env.APP_VER as string).replaceAll('"', "");
  const gitHash = process.env.GIT_HASH as string;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
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
        <SentryProvider appVer={appVer} gitHash={gitHash}>
          <App appVer={appVer} gitHash={gitHash}>
            {children}
          </App>
        </SentryProvider>
      </body>
    </html>
  );
}
