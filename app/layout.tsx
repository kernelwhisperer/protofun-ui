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
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
