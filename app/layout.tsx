import React from "react";

import { App } from "./components/RootLayout/App";

export const metadata = {
  description: "Protocol fundamentals visualized",
  title: "Protocol fundamentals",
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
      <body>
        <App appVer={appVer} gitHash={gitHash}>
          {children}
        </App>
      </body>
    </html>
  );
}
