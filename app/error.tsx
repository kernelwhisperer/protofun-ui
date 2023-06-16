"use client";

import { Typography } from "@mui/material";
import React from "react";

import { PageWrapper } from "./components/RootLayout/PageWrapper";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <PageWrapper>
      <Typography>Something went wrong!</Typography>
      {String(error)}
    </PageWrapper>
  );
}
