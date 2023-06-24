import React from "react";

import { App } from "./components/RootLayout/App";

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
        <App appVer={appVer} gitHash={gitHash}>
          {children}
        </App>
      </body>
    </html>
  );
}
