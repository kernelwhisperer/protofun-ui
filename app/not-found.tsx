"use client";

import { Typography } from "@mui/material";
import React from "react";

import { PageWrapper } from "./components/RootLayout/PageWrapper";
import { RobotoSerifFF } from "./components/Theme/fonts";

// TODO: https://github.com/vercel/next.js/issues/45620
export const metadata = {
  title: "Page not found · Protocol Fundamentals",
};

export default function NotFound() {
  return (
    <PageWrapper>
      <Typography
        variant="h4"
        fontWeight={500}
        fontFamily={RobotoSerifFF}
        sx={{ marginBottom: 3 }}
      >
        404 - Page not found.
      </Typography>
      <Typography variant="body1">
        We&apos;ve looked everywhere. We can&apos;t find the page you are
        looking for.
      </Typography>
    </PageWrapper>
  );
}
